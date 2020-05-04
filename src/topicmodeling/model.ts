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
  iters: number;

  /**
   * Estimated topic distributions, Theta
   */
  theta: number[][];

  /**
   * Estimated word distributions, Phi
   */
  phi: number[][];

  /**
   * Assigned topics for word
   */
  z: number[][];

  /**
   * Number of words assinged to topic (K * W)
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


  ndsum: number[]; //ndsum[i]: total number of words in document i, size M

  // temp variables for sampling
  p: number[];

  //
  perplexity: number;
}
