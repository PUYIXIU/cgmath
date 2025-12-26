/**
 * 3*3的仿射变换矩阵
 * Class representing an affine transformation 3x3 matrix:
 * <pre>
 *      [ a  c  tx
 * A =    b  d  ty
 *        0  0  1  ]
 * </pre
 * @type {Matrix}
 */
export class Matrix {
    /**
     * 
     * @param {number} a 
     * @param {number} b 
     * @param {number} c 
     * @param {number} d 
     * @param {number} tx 
     * @param {number} ty 
     */
    constructor(a = 1, b = 0, c = 0, d = 1, tx = 0, ty = 0) {
        this.a = a
        this.b = b
        this.c = c
        this.d = d
        this.tx = tx
        this.ty = ty
    }
    
    transform(vector) {
        return [
            vector[0] * this.a + vector[1] * this.c + this.tx,
            vector[0] * this.b + vector[1] * this.d + this.ty
        ]
    }
}