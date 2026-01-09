import { Utils, Errors } from "@/index";
/**
 * 3*3的仿射变换矩阵，使用列主序存储
 * Class representing an affine transformation 3x3 matrix:
 * <pre>
 *      [ a  c  tx
 * A =    b  d  ty
 *        0  0  1  ]
 * </pre
 * @type {Matrix}
 */
export class Matrix {
  private a: number;
  private b: number;
  private c: number;
  private d: number;
  private tx: number;
  private ty: number;
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
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.tx = tx;
    this.ty = ty;
  }
  /**
   * 用3x3仿射矩阵创建矩阵
   * @param {AffineMatrix3x3} matrix3x3
   * @returns {Matrix}
   */
  fromMatrix3x3(matrix3x3: number[][]): Matrix {
    const [a, c, tx] = matrix3x3[0];
    const [b, d, ty] = matrix3x3[1];
    return new Matrix(a, b, c, d, tx, ty);
  }
  /**
   * 将当前矩阵转换成3x3仿射矩阵
   * @returns {AffineMatrix3x3}
   */
  toMatrix3x3(): number[][] {
    return [
      [this.a, this.c, this.tx],
      [this.b, this.d, this.ty],
      [0, 0, 1],
    ];
  }
  /**
   * 克隆当前矩阵
   * @returns {Matrix}
   */
  clone(): Matrix {
    return new Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty);
  }
  /**
   * 使用当前矩阵对vector进行变换
   * Matrix * Vector = Vector
   * @param {number[]} vector
   * @returns {number[]}
   */
  transform(vector: number[]): number[] {
    return [
      vector[0] * this.a + vector[1] * this.c + this.tx,
      vector[0] * this.b + vector[1] * this.d + this.ty,
    ];
  }

  /**
   * 返回矩阵乘积结果
   * @param {Matrix} other_matrix
   * @returns {Matrix}
   */
  multiply(other_matrix: Matrix): Matrix {
    return new Matrix(
      this.a * other_matrix.a + this.c * other_matrix.b,
      this.b * other_matrix.a + this.d * other_matrix.b,
      this.a * other_matrix.c + this.c * other_matrix.d,
      this.b * other_matrix.c + this.d * other_matrix.d,
      this.a * other_matrix.tx + this.c * other_matrix.ty + this.tx,
      this.b * other_matrix.tx + this.d * other_matrix.ty + this.ty
    );
  }

  /**
   * 矩阵平移
   * @param  {...any} args 
   * @returns 
   */
  translate(...args: any[]): Matrix {
    let tx, ty;
    if(args.length === 1 && !isNaN(args[0].x) && !isNaN(args[0].y)){ 
        // 参数为Vector
        tx = args[0].x
        ty = args[0].y
    } else if (args.length === 2 && typeof (args[0]) === 'number' && typeof (args[1]) === 'number'){
        // 参数为数字
        tx = args[0]
        ty = args[1]
    } else {
        throw Errors.ILLEGAL_PARAMETERS
    }
    return this.multiply(new Matrix(1, 0, 0, 1, tx, ty))
  }
  /**
   * 绕任意指定锚点旋转（逆时针）
   * @param {number} angle 旋转角度（弧度制）
   * @param {number} centerX 旋转中心点X坐标
   * @param {number} centerY 旋转中心点Y坐标
   * @returns {Matrix}
   */
  rotateByAnchor(angle: number, anchorX = 0.0, anchorY = 0.0): Matrix {
    let cos = Math.cos(angle)
    let sin = Math.sin(angle)
    return this
      .translate(anchorX, anchorY)
      .multiply(new Matrix(cos, sin, -sin, cos, 0, 0))
      .translate(-anchorX, -anchorY)
  }
  /**
   * 绕原点旋转（逆时针）
   * @param {number} angle 旋转角度（弧度制）
   * @returns {Matrix}
   */
  rotate(angle: number): Matrix {
    let cos = Math.cos(angle)
    let sin = Math.sin(angle)
    return this.multiply(new Matrix(cos, sin, -sin, cos, 0, 0))
  }
  /**
   * 矩阵缩放
   * @param {number} sx 
   * @param {number} sy 
   */
  scale(sx: number, sy: number): Matrix {
    return this.multiply(new Matrix(sx, 0, 0, sy, 0, 0))
  }

  equalTo(matrix: Matrix): boolean {
    if(!Utils.EQ(this.tx, matrix.tx)) return false
    if(!Utils.EQ(this.ty, matrix.ty)) return false
    if(!Utils.EQ(this.a, matrix.a)) return false
    if(!Utils.EQ(this.b, matrix.b)) return false
    if(!Utils.EQ(this.c, matrix.c)) return false
    if(!Utils.EQ(this.d, matrix.d)) return false
    return true
  }
}

export default Matrix