import { Model } from "./model";

/**
 * LDA Estimater
 */
export class Estimater {
  /**
   * Model
   */
  private model: Model;

  constructor(W: number[][], K = 2, alpha = 0.5, beta = 0.1) {
    // Initialize
    const D = W.length;
    const V = W[0].length;
    const nkw: number[][] = this.createTwoDementionArray(V, K);
    const ndk: number[][] = this.createTwoDementionArray(D, K);
    const nk = this.createOneDementionArray(K);
    const nd = this.createOneDementionArray(D);
    const theta: number[][] = this.createTwoDementionArray(D, K);
    const phi: number[][] = this.createTwoDementionArray(K, V);
    const z = this.createTwoDementionArray(D, V);

    for (let d = 0; d < D; d++) {
      const N = W[d].length;
      for (let n = 0; n < N; n++) {
        const topic = Math.floor(Math.random() * K);
        nkw[W[d][n]][topic] = nkw[W[d][n]][topic] + 1;
        ndk[d][topic] = ndk[d][topic] + 1;
        nk[topic] = nk[topic] + 1;
      }
      nd[d] = N;
    }

    this.model = {
      D: D,
      V: V,
      K: K,
      alpha: alpha,
      beta: beta,
      W: W,
      iters: 100,
      ndk: ndk,
      nd: nd,
      nkw: nkw,
      nk: nk,
      phi: phi,
      theta: theta,
      perplexity: 0,
      z: z
    };
    console.log(this.model.nk);
  }

  /**
   * Create two demention array
   * @param firstLength
   * @param secoundLenght
   */
  private createTwoDementionArray(firstLength: number, secoundLenght: number) {
    const result = [];
    for (let i = 0; i < firstLength; i++) {
      const tmp = [];
      for (let k = 0; k < secoundLenght; k++) {
        tmp.push(0);
      }
      result.push(tmp);
    }
    return result;
  }

  /**
   * Create one demention array
   * @param length
   */
  private createOneDementionArray(length: number) {
    const result = [];
    for (let i = 0; i < length; i++) {
      result.push(0);
    }
    return result;
  }

  /**
   * Calcurate Perplexity
   */
  public calcPerplexity(): number {
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

  public fit(): Model {
    for (let i = 0; i < this.model.iters; i++) {
      for (let d = 0; d < this.model.D; d++) {
        for (let n = 0; n < this.model.W[d].length; n++) {
          const topic = this.model.z[d][n];
          const w = this.model.W[d][n];
          if (topic > 0) {
            this.model.ndk[d][topic] = this.model.ndk[d][topic] - 1;
            this.model.nkw[w][topic] = this.model.nkw[w][topic] - 1;
            this.model.nk[topic] = this.model.nk[topic] - 1;
            this.model.nd[d] = this.model.nd[d] - 1;
          }

          const newTopic = this.sampling(d, n);
          this.model.z[d][n] = newTopic;

          this.model.ndk[d][newTopic] = this.model.ndk[d][newTopic] + 1;
          this.model.nkw[w][newTopic] = this.model.nkw[w][newTopic] + 1;
          this.model.nk[newTopic] = this.model.nk[newTopic] + 1;
          this.model.nd[d] = this.model.nd[d] + 1;
        }
      }

      this.calcTopicDistribution();
      this.calcWordDistribution();
    }

    this.model.perplexity = this.calcPerplexity();
    console.log(this.model);
    return this.model;
  }

  /**
   * Execute Sampling
   * @param d document number
   * @param n word number
   * @returns sampled topic
   */
  protected sampling(d: number, n: number): number {
    const w = this.model.W[d][n];

    // Calculate sampling probability
    const p = new Array(this.model.K).fill(0);
    for (let k = 0; k < this.model.K; k++) {
      p[k] =
        (this.model.ndk[d][k] + this.model.alpha) *
        ((this.model.nkw[w][k] + this.model.beta) /
          (this.model.nk[k] + this.model.beta * this.model.V));
    }

    for (let k = 1; k < this.model.K; k++) {
      p[k] = p[k] + p[k - 1];
    }

    // Sampling topic
    const random = Math.random() * p[this.model.K - 1];
    let sampledTopic = 0;
    for (let i = 0; i < this.model.K; i++) {
      if (p[i] > random) {
        sampledTopic = i;
        break;
      }
    }
    return sampledTopic;
  }

  /**
   * Calculate Topic distribution (Theta)
   */
  protected calcTopicDistribution(): void {
    for (let d = 0; d < this.model.D; d++) {
      for (let k = 0; k < this.model.K; k++) {
        this.model.theta[d][k] =
          (this.model.ndk[d][k] + this.model.alpha) /
          (this.model.nd[d] + this.model.alpha * this.model.K);
      }
    }
  }

  /**
   * Calculate Word distribution (Phi)
   */
  protected calcWordDistribution(): void {
    for (let k = 0; k < this.model.K; k++) {
      for (let w = 0; w < this.model.V; w++) {
        this.model.phi[k][w] =
          (this.model.nkw[w][k] + this.model.beta) /
          (this.model.nk[k] + this.model.beta * this.model.V);
      }
    }
  }
}
