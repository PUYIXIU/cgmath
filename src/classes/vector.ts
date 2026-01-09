import { Shape, Errors, Matrix, Utils, Point } from "@/index";

export class Vector extends Shape {
  /**
   * x-coordinate of a vactor
   * @type {number}
   */
  private x: number = 0;
  /**
   * y-coordinate of a vector
   * @type {number}
   */
  private y: number = 0;
  constructor(...args: any[]) {
    super();

    if (args.length === 0) return;

    // ( [Number, Number] )
    if (args.length === 1 && args[0] instanceof Array && args[0].length === 2) {
      let arr = args[0];
      if (typeof arr[0] === "number" && typeof arr[1] === "number") {
        this.x = arr[0];
        this.y = arr[1];
        return;
      }
    }

    // (vector:{ x: number, y: number })
    if (
      args.length === 1 &&
      args[0] instanceof Object &&
      args[0].name === "vector"
    ) {
      let { x, y } = args[0];
      this.x = x;
      this.y = y;
      return;
    }

    // (segment:{ start: Point, end: Point })
    if (
      args.length === 1 &&
      args[0] instanceof Object &&
      args[0].name === "segment"
    ) {
      let { start, end } = args[0];
      this.x = end.x - start.x;
      this.y = end.y - start.y;
      return;
    }

    if (args.length === 2) {
      let a1 = args[0];
      let a2 = args[1];

      if (typeof a1 === "number" && typeof a2 === "number") {
        this.x = a1;
        this.y = a2;
        return;
      }

      if(a1 instanceof Point && a2 instanceof Point) {
        let ps = a1 as Point
        let pe = a2 as Point
        this.x = pe.x - ps.x
        this.y = pe.y - ps.y
      }
    }

    throw Errors.ILLEGAL_PARAMETERS;
  }

  /**
   * 克隆向量
   * @returns {Vector}
   */
  clone(): Vector {
    return new Vector(this.x, this.y);
  }

  /**
   * 返回向量斜率（即与x轴的夹角）（0~2π）
   * @returns {number} 弧度制
   */
  get slope(): number {
    let angle = Math.atan2(this.y, this.x);
    if (angle < 0) angle += Math.PI * 2;
    return angle;
  }
  /**
   * 向量长度
   * @returns {number}
   */
  get length(): number {
    return Math.sqrt(this.dot(this));
  }

  /**
   * 判断向量是否为零向量
   * @returns {boolean}
   */
  isZeroLength(): boolean {
    return Utils.EQ_0(this.length);
  }

  /**
   * 判断向量是否相等
   * @param {Vector} v
   * @returns {boolean}
   */
  equalTo(v: Vector): boolean {
    return Utils.EQ(this.x, v.x) && Utils.EQ(this.y, v.y);
  }

  /**
   * 向量乘以标量
   * @param {number} scalar
   * @returns {Vector}
   */
  multiply(scalar: number): Vector {
    return new Vector(this.x * scalar, this.y * scalar);
  }

  /**
   * 向量归一化，返回单位向量
   * 如果向量长度为0，则抛出错误
   * @returns {Vector}
   */
  normalize(): Vector {
    if (this.isZeroLength()) throw Errors.ZERO_DIVISION;
    return new Vector(this.x / this.length, this.y / this.length);
  }

  /**
   * 向量仿射变换
   * @param {Matrix} m
   * @returns {Vector}
   */
  transform(m: Matrix): Vector {
    return new Vector(m.transform([this.x, this.y]));
  }

  /**
   * 向量点乘
   * @param {Vector} v
   * @returns {number}
   */
  dot(v: Vector): number {
    return this.x * v.x + this.y * v.y;
  }

  /**
   * 向量叉乘
   * @param {Vector} v
   * @returns {number}
   */
  cross(v: Vector): number {
    return this.x * v.y - this.y * v.x;
  }

  /**
   * 向量与向量之间的夹角
   * @param {Vector} v
   * @returns {number} 弧度制
   */
  angleTo(v: Vector): number {
    let norm1 = this.normalize();
    let norm2 = v.normalize();
    let angle = Math.atan2(norm1.cross(norm2), norm1.dot(norm2));
    if (angle < 0) angle += 2 * Math.PI;
    return angle;
  }

  /**
   * 获取v在当前向量上的投影长度
   * 利用向量点乘
   * @param v 
   */
  getProjectionLength(v: Vector): number {
    let curLen = this.length
    if(Utils.EQ_0(curLen)) return 0
    const dotProduct = this.dot(v)
    return dotProduct / curLen
  }
}
