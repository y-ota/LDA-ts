import { Model } from "./model";

/**
 * Topic modeling (LDA:Latent Dirichlet Allocation)
 * Estimation method: Gibbs sampling
 */
export class LDA {
  /**
   * constructor
   * @param K Number of topics
   * @param alpha Hyper parameteter Alpha
   * @param beta Hyper parameteter Beta
   * @param nIter Number of sampling iterations
   */
  constructor(
    protected K = 10,
    protected alpha = 0.5,
    protected beta = 0.1,
    protected nIter = 10
  ) {}

  /**
   * Create initial model
   * @param X All documents
   */
  protected createInitialModel(X: number[][]): Model {
    // Initialize Model
    const D = X.length;
    const V = X[0].length;
    const nkw: number[][] = this.createMatrix(V, this.K);
    const ndk: number[][] = this.createMatrix(D, this.K);
    const nk = this.createVector(this.K);
    const nd = this.createVector(D);
    const theta: number[][] = this.createMatrix(D, this.K);
    const phi: number[][] = this.createMatrix(this.K, V);
    const z = this.createMatrix(D, V);

    // Set default values
    for (let d = 0; d < D; d++) {
      const N = X[d].length;
      for (let n = 0; n < N; n++) {
        const topic = Math.floor(Math.random() * this.K);
        const word = X[d][n];
        nkw[word][topic] = nkw[word][topic] + 1;
        ndk[d][topic] = ndk[d][topic] + 1;
        nk[topic] = nk[topic] + 1;
      }
      nd[d] = N;
    }

    const model = {
      D: D,
      V: V,
      K: this.K,
      alpha: this.alpha,
      beta: this.beta,
      X: X,
      nIter: this.nIter,
      ndk: ndk,
      nd: nd,
      nkw: nkw,
      nk: nk,
      phi: phi,
      theta: theta,
      z: z
    };
    return model;
  }

  /**
   * Create matrix
   * @param firstLength
   * @param secoundLenght
   */
  protected createMatrix(
    firstLength: number,
    secoundLenght: number
  ): number[][] {
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
   * Create vector
   * @param length
   */
  protected createVector(length: number): number[] {
    const result = [];
    for (let i = 0; i < length; i++) {
      result.push(0);
    }
    return result;
  }

  /**
   * Fit
   * @param X All documents
   */
  public fit(X: number[][]): Model {
    const model = this.createInitialModel(X);
    for (let i = 0; i < model.nIter; i++) {
      for (let d = 0; d < model.D; d++) {
        for (let n = 0; n < model.X[d].length; n++) {
          const topic = model.z[d][n];
          const w = model.X[d][n];
          if (topic > 0) {
            model.ndk[d][topic] = model.ndk[d][topic] - 1;
            model.nkw[w][topic] = model.nkw[w][topic] - 1;
            model.nk[topic] = model.nk[topic] - 1;
            model.nd[d] = model.nd[d] - 1;
          }

          const newTopic = this.sampling(model, d, n);
          model.z[d][n] = newTopic;

          model.ndk[d][newTopic] = model.ndk[d][newTopic] + 1;
          model.nkw[w][newTopic] = model.nkw[w][newTopic] + 1;
          model.nk[newTopic] = model.nk[newTopic] + 1;
          model.nd[d] = model.nd[d] + 1;
        }
      }
    }
    this.calcTopicDistribution(model);
    this.calcWordDistribution(model);

    return model;
  }

  /**
   * Execute Sampling
   * @param model model
   * @param d document number
   * @param n word number
   */
  protected sampling(model: Model, d: number, n: number): number {
    const w = model.X[d][n];

    // Calculate sampling probability
    const p = this.createVector(model.K);
    for (let k = 0; k < model.K; k++) {
      p[k] =
        (model.ndk[d][k] + model.alpha) *
        ((model.nkw[w][k] + model.beta) / (model.nk[k] + model.beta * model.V));
    }

    for (let k = 1; k < model.K; k++) {
      p[k] = p[k] + p[k - 1];
    }

    // Sampling topic
    const random = Math.random() * p[model.K - 1];
    let sampledTopic = 0;
    for (let i = 0; i < model.K; i++) {
      if (p[i] > random) {
        sampledTopic = i;
        break;
      }
    }
    return sampledTopic;
  }

  /**
   * Calculate Topic distribution (Theta)
   * @param model model
   */
  protected calcTopicDistribution(model: Model): void {
    for (let d = 0; d < model.D; d++) {
      for (let k = 0; k < model.K; k++) {
        model.theta[d][k] =
          (model.ndk[d][k] + model.alpha) /
          (model.nd[d] + model.alpha * model.K);
      }
    }
  }

  /**
   * Calculate Word distribution (Phi)
   * @param model model
   */
  protected calcWordDistribution(model: Model): void {
    for (let k = 0; k < model.K; k++) {
      for (let w = 0; w < model.V; w++) {
        model.phi[k][w] =
          (model.nkw[w][k] + model.beta) / (model.nk[k] + model.beta * model.V);
      }
    }
  }
}
