import { Model } from "./model";

export class Utils {
  /**
   * Calcurate Perplexity
   * @param model model
   */
  public static calcPerplexity(model: Model): number {
    let wordcount = 0;
    let loglik = 0;

    for (let m = 0; m < model.D; m++) {
      for (let n = 0; n < model.X[m].length; n++) {
        let sum = 0;
        for (let k = 0; k < model.K; k++) {
          sum += model.theta[m][k] * model.phi[k][model.X[m][n]];
        }
        loglik += Math.log(sum);
      }
      wordcount += model.X[m].length;
    }
    return Math.exp(-loglik / wordcount);
  }
}
