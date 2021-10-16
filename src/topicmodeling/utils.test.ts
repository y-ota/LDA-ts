import * as utils from "@/topicmodeling/utils"
// @ponicode
describe("utils.Utils.calcPerplexity", () => {
    test("0", () => {
        let object6: any = [[1, 1], [-5.48], [100]]
        let object5: any = [[100, -5.48], [-100], [100, -100, 1]]
        let object4: any = [[50, 30, 400, 400, 520]]
        let object3: any = [[520], [1, 50], [4, 30, 550, 400]]
        let object2: any = [[1, 550, 4, 1]]
        let object: any = [[550, 1, 90]]
        let callFunction: any = () => {
            utils.Utils.calcPerplexity({ X: object, D: 0, V: 320, K: 4, alpha: 0.5, beta: 2.0, nIter: -5.48, theta: object2, phi: object3, z: object4, nkw: object5, ndk: object6, nk: [1, -5.48, -5.48, -5.48, 1], nd: [0, 1, -5.48] })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let object6: any = [[0, 100], [-100], [-5.48]]
        let object5: any = [[100, -100], [1], [1, -100, -100]]
        let object4: any = [[520, 380, 70, 30, 400]]
        let object3: any = [[320], [90, 70], [90, 30, 50, 4]]
        let object2: any = [[4, 550, 30, 410]]
        let object: any = [[520, 350, 1]]
        let callFunction: any = () => {
            utils.Utils.calcPerplexity({ X: object, D: -5.48, V: 400, K: 410, alpha: 1.0, beta: 1.0, nIter: -100, theta: object2, phi: object3, z: object4, nkw: object5, ndk: object6, nk: [100, 0, 0, -100, -100], nd: [-100, -5.48, 100] })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let object6: any = [[-100, 100, 0], [0, -5.48, -5.48, 0, 1]]
        let object5: any = [[-100, 1], [100, -100, -100, 100, 0]]
        let object4: any = [[320]]
        let object3: any = [[70], [410, 520], [50, 1, 320, 30, 380]]
        let object2: any = [[1, 100], [100, 1], [550, 550, 350]]
        let object: any = [[4, 4, 410, 400, 50], [1, 350, 380], [1]]
        let callFunction: any = () => {
            utils.Utils.calcPerplexity({ X: object, D: -100, V: 90, K: 380, alpha: 10.0, beta: 10.0, nIter: 0, theta: object2, phi: object3, z: object4, nkw: object5, ndk: object6, nk: [100, -100, -100], nd: [0, 0, 100] })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let object6: any = [[1, 0, 100, 1], [1, -100, -5.48, 1, -100], [0, 0], [-100, 1, 1, -5.48, 0]]
        let object5: any = [[-100, -100, 0, 0, 1], [100]]
        let object4: any = [[520, 550, 70], [350, 50, 520, 520, 70], [4, 410, 100, 320, 100], [350, 400, 550, 410, 1], [70, 410, 100, 1, 50]]
        let object3: any = [[90, 380], [1]]
        let object2: any = [[520, 550, 30, 4, 320], [30, 320, 50, 380, 410], [1], [320, 550, 70, 400, 90], [350, 100, 550]]
        let object: any = [[400, 70, 30, 520], [380]]
        let callFunction: any = () => {
            utils.Utils.calcPerplexity({ X: object, D: 1, V: 380, K: 70, alpha: 1.0, beta: 2.0, nIter: 1, theta: object2, phi: object3, z: object4, nkw: object5, ndk: object6, nk: [-5.48, -100], nd: [1, -100, -5.48] })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let object6: any = [[0, -5.48, -5.48, -100], [1, 100, -5.48, 100]]
        let object5: any = [[-5.48, 100], [100, 0]]
        let object4: any = [[50, 320, 90, 520]]
        let object3: any = [[380, 70]]
        let object2: any = [[520, 400, 4, 520, 410], [90, 4, 4, 520], [90, 320], [550, 70, 320], [1]]
        let object: any = [[550], [90, 380, 90, 400, 410], [30], [100, 50, 100], [550, 520, 90, 520]]
        let callFunction: any = () => {
            utils.Utils.calcPerplexity({ X: object, D: 100, V: 550, K: 1, alpha: 2.0, beta: 1.0, nIter: -5.48, theta: object2, phi: object3, z: object4, nkw: object5, ndk: object6, nk: [-100, -100, 100], nd: [-5.48, 0, -100, 1] })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            utils.Utils.calcPerplexity({ X: [], D: NaN, V: NaN, K: NaN, alpha: NaN, beta: NaN, nIter: NaN, theta: [], phi: [], z: [], nkw: [], ndk: [], nk: [], nd: [] })
        }
    
        expect(callFunction).not.toThrow()
    })
})
