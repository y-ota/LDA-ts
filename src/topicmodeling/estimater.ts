import { Model } from "./model";

/**
 * LDA Estimater
 */
export class Estimater {

  /**
   * Model
   */
  private model: Model;

  constructor(X: number[][], K = 4, alpha = 0.5, beta = 0.1) {
    let m, n;
    const p = new Array(K).fill(0);
    const M = X.length;
    const V = X.flat().filter(function (x, i, self) {
      return self.indexOf(x) === i;
    }).length;

    // K: from command line or default value
    // alpha, beta: from command line or default values
    // niters, savestep: from command line or default values
    const nw: number[][] = new Array(V).fill(new Array(K).fill(0));
    const nd: number[][] = new Array(M).fill(new Array(K).fill(0));
    const nwsum = new Array(K).fill(0);
    const ndsum = new Array(M).fill(0);
    const theta: number[][] = new Array(M).fill(new Array(K).fill(0));
    const phi: number[][] = new Array(K).fill(new Array(V).fill(0));

    const z = new Array(M).fill(0);
    for (m = 0; m < M; m++) {
      const N = X[m].length;
      z[m] = [];

      //initilize for z
      for (n = 0; n < N; n++) {
        const topic = Math.floor(Math.random() * K);
        z[m].push(topic);
        // number of instances of word assigned to topic j
        nw[X[m][n]][topic] += 1;
        // number of words in document i assigned to topic j
        nd[m][topic] += 1;
        // total number of words assigned to topic j
        nwsum[topic] += 1;
      }
      // total number of words in document i
      ndsum[m] = N;
    }

    this.model = {
      D: M,
      V: V,
      K: K,
      alpha: alpha,
      beta: beta,
      W: X,
      iters: 100,
      ndk: nd,
      ndsum: ndsum,
      nkw: nw,
      nk: nwsum,
      phi: phi,
      theta: theta,
      p: p,
      perplexity: 0,
      z: z
    };
  }

  public perplexity(): number {
    let wordcount = 0;
    let loglik = 0;

    for (let m = 0; m < this.model.D; m++) {
      //文書分繰り返す
      for (let n = 0; n < this.model.W[m].length; n++) {
        //文書の単語数分繰り返す
        let sum = 0;
        for (let k = 0; k < this.model.K; k++) {
          //トピック数K
          sum += this.model.theta[m][k] * this.model.phi[k][this.model.W[m][n]];
        }
        loglik += Math.log(sum);
      }
      wordcount += this.model.W[m].length;
    }
    return Math.exp(-loglik / wordcount);
  }

  public estimate(): void {
    for (let i = 0; i < this.model.iters; i++) {
      // for all z_i
      for (let m = 0; m < this.model.D; m++) {
        for (let n = 0; n < this.model.W[m].length; n++) {
          // z_i = z[m][n]
          // sample from p(z_i|z_-i, w)
          const topic = this.sampling(m, n);
          this.model.z[m][n] = topic;
        }
      }
      console.log("Saving the model at iteration " + i + " ...");
      this.computeTopicDistribution();
      this.computeWordDistribution();
      console.log("perplexity:" + this.perplexity());
    }

    this.model.perplexity = this.perplexity();
    console.log(this.model);
  }

  /**
   * Execute Sampling
   * @param m document number
   * @param n word number
   */
  protected sampling(m: number, n: number): number {
    // remove z_i from the count variable
    let topic = this.model.z[m][n];
    const w = this.model.W[m][n];

    this.model.nkw[w][topic] -= 1;
    this.model.ndk[m][topic] -= 1;
    this.model.nk[topic] -= 1;
    this.model.ndsum[m] -= 1;

    //do multinominal sampling via cumulative method
    for (let k = 0; k < this.model.K; k++) {
      this.model.p[k] =
        (((this.model.nkw[w][k] + this.model.beta) /
          (this.model.nk[k] + this.model.V * this.model.beta)) *
          (this.model.ndk[m][k] + this.model.alpha)) /
        (this.model.ndsum[m] + this.model.K * this.model.alpha);
    }

    // cumulate multinomial parameters
    for (let k = 1; k < this.model.K; k++) {
      this.model.p[k] += this.model.p[k - 1];
    }

    // scaled sample because of unnormalized p[]
    const u = Math.random() * this.model.p[this.model.K - 1];

    for (topic = 0; topic < this.model.K; topic++) {
      if (this.model.p[topic] > u)
        //sample topic w.r.t distribution p
        break;
    }

    // add newly estimated z_i to count variables
    this.model.nkw[w][topic] += 1;
    this.model.ndk[m][topic] += 1;
    this.model.nk[topic] += 1;
    this.model.ndsum[m] += 1;

    return topic;
  }

  /**
   * Execute Sampling
   * @param m document number
   * @param n word number
   * @returns sampled topic
   */
  protected sampling2(m: number, n: number): number {
    const w = this.model.W[m][n];

    // Calculate sampling probability
    const p = new Array(this.model.K).fill(0);
    for (let k = 0; k < this.model.K; k++) {
      p[k] = (this.model.ndk[m][k] + this.model.alpha) *
        ((this.model.nkw[w][k] + this.model.beta) /
          (this.model.nk[k] + this.model.beta * this.model.V));
    }

    // Nomalize sampling probability
    const pSum: number = p.reduce((previous, current) => previous + current);
    for (let k = 1; k < this.model.K; k++) {
      p[k] = p[k] / pSum;
    }

    // Sampling topic
    const random = Math.random();
    let sampledTopic = 0;
    for (let i = 0; i < this.model.K; i++) {
      if (p[i] > random) {
        sampledTopic = p[i];
      }
      break;
    }

    return sampledTopic;
  }



  /**
   * Comupte Topic distribution (Theta)
   */
  protected computeTopicDistribution(): void {
    for (let m = 0; m < this.model.D; m++) {
      for (let k = 0; k < this.model.K; k++) {
        this.model.theta[m][k] =
          (this.model.ndk[m][k] + this.model.alpha) /
          (this.model.ndsum[m] + this.model.K * this.model.alpha);
      }
    }
  }

  /**
   * Compute Word distribution (Phi)
   */
  protected computeWordDistribution(): void {
    for (let k = 0; k < this.model.K; k++) {
      for (let w = 0; w < this.model.V; w++) {
        this.model.phi[k][w] =
          (this.model.nkw[w][k] + this.model.beta) /
          (this.model.nk[k] + this.model.V * this.model.beta);
      }
    }
  }
}
