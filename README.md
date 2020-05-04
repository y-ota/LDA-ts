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
#{
      D: 4,
      V: 3,
      K: 10,
      alpha: 0.5,
      beta: 0.1,
      W: [ [ 1, 0, 1 ], [ 1, 0, 1 ], [ 1, 0, 1 ], [ 1, 0, 1 ] ],
      iters: 10,
      ndk: [
        [
          3, 2, 1, 1, 0,
          0, 1, 0, 1, 0
        ],
        [
          8, 0, 0, 2, 0,
          1, 1, 0, 1, 1
        ],
        [
          12, 0, 1, 0, 1,
           0, 0, 0, 0, 1
        ],
        [
          5, 0, 0, 0, 1,
          0, 1, 0, 1, 1
        ]
      ],
      nd: [ 9, 14, 15, 9 ],
      nkw: [
        [
          0, 0, 2, 1, 2,
          0, 3, 0, 0, 0
        ],
        [
          28, 2, 0, 2, 0,
           1, 0, 0, 3, 3
        ],
        [
          0, 0, 0, 0, 0,
          0, 0, 0, 0, 0
        ]
      ],
      nk: [
        28, 2, 2, 3, 2,
         1, 3, 0, 3, 3
      ],
      phi: [
        [
          0.0035335689045936395,
          0.9929328621908128,
          0.0035335689045936395
        ],
        [ 0.04347826086956522, 0.9130434782608696, 0.04347826086956522 ],
        [ 0.9130434782608696, 0.04347826086956522, 0.04347826086956522 ],
        [ 0.33333333333333337, 0.6363636363636365, 0.030303030303030307 ],
        [ 0.9130434782608696, 0.04347826086956522, 0.04347826086956522 ],
        [ 0.07692307692307693, 0.8461538461538461, 0.07692307692307693 ],
        [ 0.9393939393939394, 0.030303030303030307, 0.030303030303030307 ],
        [ 0.3333333333333333, 0.3333333333333333, 0.3333333333333333 ],
        [ 0.030303030303030307, 0.9393939393939394, 0.030303030303030307 ],
        [ 0.030303030303030307, 0.9393939393939394, 0.030303030303030307 ]
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
#
#

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
