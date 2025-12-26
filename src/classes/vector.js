import { Shape } from "../classes/shape.js";
import CGMath from "../cgmath.js";

export class Vector extends Shape {
  constructor(...args) {
    super();

    /**
     * x-coordinate of a vactor
     * @type {number}
     */
    this.x = 0;

    /**
     * y-coordinate of a vector
     * @type {number}
     */
    this.y = 0;

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
      (args.length === 1) & (args[0] instanceof Object) &&
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
    }

    throw Errors.ILLEGAL_PARAMETERS;
  }

  /**
   * 克隆向量
   * @returns {Vector}
   */
  clone() {
    return new CGMath.Vector(this.x, this.y);
  }

  /**
   * 返回向量斜率（即与x轴的夹角）（0~2π）
   * @returns {number} 弧度制
   */
  get slope() {
    let angle = Math.atan2(this.y, this.x);
    if (angle < 0) angle += Math.PI * 2;
    return angle;
  }
  /**
   * 向量长度
   * @returns {number}
   */
  get length() {
    return Math.sqrt(this.dot(this));
  }

  /**
   * 判断向量是否为零向量
   * @returns {boolean}
   */
  isZeroLength() {
    return CGMath.Utils.EQ_0(this.length);
  }

  /**
   * 判断向量是否相等
   * @param {Vector} v
   * @returns {boolean}
   */
  equalTo(v) {
    return CGMath.Utils.EQ(this.x, v.x) && CGMath.Utils.EQ(this.y, v.y);
  }

  /**
   * 向量乘以标量
   * @param {number} scalar
   * @returns {Vector}
   */
  multiply(scalar) {
    return new CGMath.Vector(this.x * scalar, this.y * scalar);
  }

  /**
   * 向量归一化，返回单位向量
   * 如果向量长度为0，则抛出错误
   * @returns {Vector}
   */
  normalize() {
    if (this.isZeroLength()) throw Errors.ZERO_DIVISION;
    return new CGMath.Vector(this.x / this.length, this.y / this.length);
  }

  /**
   * 向量仿射变换
   * @param {Matrix} m
   * @returns {Vector}
   */
  transform(m) {
    return new CGMath.Vector(m.transform([this.x, this.y]));
  }

  /**
   * 向量点乘
   * @param {Vector} v
   * @returns {number}
   */
  dot(v) {
    return this.x * v.x + this.y * v.y;
  }

  /**
   * 向量叉乘
   * @param {Vector} v
   * @returns {number}
   */
  cross(v) {
    return this.x * v.y - this.y * v.x;
  }

  /**
   * 向量与向量之间的夹角
   * @param {Vector} v
   * @returns {number} 弧度制
   */
  angleTo(v) {
    let norm1 = this.normalize();
    let norm2 = v.normalize();
    let angle = Math.atan2(norm1.cross(norm2), norm1.dot(norm2))
    if(angle < 0) angle += 2 * Math.PI;
    return angle;
  }
}
