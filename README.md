# LDA-ts
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

A TypeScript implementation of Topic modeing(LDA:Latent Dirichlet Allocation).

You can run on your browser with serverless.

# Install

```
npm install LDA-ts
```

# Usage
``` typescript
const X = [[1,0,0,1,0,1],[,1,1,1,0,1],[1,1,1,1,0,1],...] // ex: Bag of words
const lda = new LDA();
const model = lda.fit(X);
console.log(model);
```

# API
## LDA class

### constructor

|  Property  |  Explain  | Default value |
| ---- | ---- | ---- |
|  `K`  |  Number of topics  | `10` |
|  `alpha`  |  Hyper parameteter Alpha  | `0.5` |
|  `beta`  |  Hyper parameteter Beta  | `0.1` |
|  `nIter`  |  Number of sampling iterations  | `10` |

### fit

#### Input
|  Property  |  Explain  |
| ---- | ---- | 
|  `X`  |  All documentations (ex: Bang of Words)  |

#### Output
|  Property  |  Explain  |
| ---- | ---- |
|  `W`  |  All documentations  |
|  `D`  |  Number of documentations  |
|  `V`  |  Number of vocabulary  |
|  `K`  |  Number of topics  |
|  `alpha`  |  Hyper parameter Alpha  |
|  `beta`  |  Hyper parameter Beta  |
|  `iters`  |  Number of the Gibbs Sampling iteration  |
|  `theta`  |  Estimated topic distributions  |
|  `phi`  |  Estimated word distributions |
|  `z`  | Assigned topics for word (D * V)  |
|  `nkw`  | Number of words assinged to topic (V * K)  |
|  `ndk`  | Number of words assigned to topic in document (D * K)  |
|  `nk`  | Number of topics in all documents (1 * K)  |
|  `nd`  | Number of worts in document (1 * D)  |

  
# License
© 2020 Yusuke Ota [MIT Lincense]()
