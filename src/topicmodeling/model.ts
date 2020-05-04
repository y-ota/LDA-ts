/**
 * Model
 */
export interface Model {
  /**
   * All documentations (ex: Bang of Words)
   */
  W: number[][];

  /**
   * Number of documentations
   */
  D: number;

  /**
   * Number of vocabulary
   */
  V: number;

  /**
   * Number of topics
   */
  K: number;

  /**
   * Hyper parameter Alpha
   */
  alpha: number;

  /**
   * Hyper parameter Beta
   */
  beta: number;

  /**
   * Number of the Gibbs Sampling iteration
   */
  nIter: number;

  /**
   * Estimated topic distributions, Theta
   */
  theta: number[][];

  /**
   * Estimated word distributions, Phi
   */
  phi: number[][];

  /**
   * Assigned topics for word (D * V)
   */
  z: number[][];

  /**
   * Number of words assinged to topic (V * K)
   */
  nkw: number[][];

  /**
   * Number of words assigned to topic in document (D * K)
   */
  ndk: number[][];

  /**
   * Number of topics in all documents (1 * K)
   */
  nk: number[];

  /**
   * Number of worts in document (1 * D)
   */
  nd: number[];
}
