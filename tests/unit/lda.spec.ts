import { LDA } from "@/topicmodeling/lda";

describe("LDA", () => {
  it("fit", () => {
    const X = [
      [1, 0, 1],
      [1, 0, 1],
      [1, 0, 1],
      [1, 0, 1]
    ];
    const lda = new LDA();
    const model = lda.fit(X);
    // Theta
    expect(model.theta[0].reduce((p, c) => p + c)).toBe(1);
    // Phi
    expect(model.phi[0].reduce((p, c) => p + c)).toBe(1);
  });
});
