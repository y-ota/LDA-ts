# LDA-ts
A TypeScriot implimentation of Topic modeing(LDA:Latent Dirichlet Allocation).

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
## LDA#constructor

|  Parameter  |  Explain  | Default value |
| ---- | ---- | ---- |
|  `K`  |  Number of topics  | `10` |
|  `alpha`  |  Hyper parameteter Alpha  | `0.5` |
|  `beta`  |  Hyper parameteter Beta  | `0.1` |
|  `nIter`  |  Number of sampling iterations  | `10` |

## LDA#fit

|  Parameter  |  Explain  |
| ---- | ---- | ---- | 
|  `X`  |  All documentations (ex: Bang of Words)  |

# License
© 2020 Yusuke Ota [MIT Lincense]()
