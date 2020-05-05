# LDA-ts

LDA-ts is a TypeScript implementation of Topic modeling (LDA: Latent Dirichlet Allocation) using collapsed gibbs sampling.

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

# Install
### From [GitHub Packages](https://help.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages)

```
npm install @y-ota/lda-ts
```
or

### From this repository
```
npm install git+https://github.com/y-ota/LDA-ts.git
```


# Usage
``` typescript
import ldats from "@y-ota/lda-ts";

const X = [[1,0,0,1,0,1],[0,1,1,1,0,1],[1,1,1,1,0,1],...] // ex: Bag of words
const lda = new ldats.LDA();
const model = lda.fit(X);
console.log(model);
```

Output of `console.log(model);`

```
 {
     D: 4,
     V: 3,
     K: 10,
     alpha: 0.5,
     beta: 0.1,
     X: [ [ 1, 0, 1 ], [ 1, 0, 1 ], [ 1, 0, 1 ], [ 1, 0, 1 ] ],
     iters: 10,
    ...
     phi: [
      [ 0.04347826086956522, 0.9130434782608696, 0.04347826086956522 ],
      [ 0.9130434782608696, 0.04347826086956522, 0.04347826086956522 ],
      [ 0.33333333333333337, 0.6363636363636365, 0.030303030303030307 ],
      …
     ],
     theta: [
       [
         0.25,
         0.17857142857142858,
         0.10714285714285714,
         0.10714285714285714,
         0.03571428571428571,
         0.03571428571428571,
         0.10714285714285714,
         0.03571428571428571,
         0.10714285714285714,
         0.03571428571428571
       ],
       [
         0.4473684210526316,
         0.02631578947368421,
         0.02631578947368421,
...
         
```


# API
## `LDA`

### `constructor`

#### Arguments

|  Property  |  Explanation  | Default value |
| ---- | ---- | ---- |
|  `K`  |  Number of topics  | `10` |
|  `alpha`  |  Hyper parameteter Alpha  | `0.5` |
|  `beta`  |  Hyper parameteter Beta  | `0.1` |
|  `nIter`  |  Number of the Gibbs Sampling iterations  | `10` |

### `fit`

#### Arguments
|  Property  |  Explanation  |
| ---- | ---- | 
|  `X`  |  All documents (ex: Bang of Words)  |

#### Returns
|  Property  |  Explanation  |
| ---- | ---- | 
|  `Model`  |  Estimated model  |

## `Model`
|  Property  |  Explanation  |
| ---- | ---- |
|  `X`  |  All documents  |
|  `D`  |  Number of documents  |
|  `V`  |  Number of vocabulary  |
|  `K`  |  Number of topics  |
|  `alpha`  |  Hyper parameter Alpha  |
|  `beta`  |  Hyper parameter Beta  |
|  `nIter`  |  Number of the Gibbs Sampling iterations  |
|  `theta`  |  Estimated topic distributions  |
|  `phi`  |  Estimated word distributions |
|  `z`  | Assigned topics for word (D * V)  |
|  `nkw`  | Number of words assinged to topic (V * K)  |
|  `ndk`  | Number of words assigned to topic in document (D * K)  |
|  `nk`  | Number of topics in all documents (1 * K)  |
|  `nd`  | Number of worts in document (1 * D)  |

  
# License
© 2020 Yusuke Ota, LDA-ts released under the [MIT Lincense](https://github.com/y-ota/LDA-ts/blob/master/LICENSE)
