/**
 * 几何点位
 */
import { Shape } from "@/classes/shape";
import { Errors } from "@/utils/errors";
import { isValidNumber } from "@/utils/utils";

/**
 * point类 - 表示二维平面上的一个点
 * @type {Point}
 */
export class Point extends Shape {
  /**
   * x-coordinate (float number)
   * @type {number}
   */
  private mX: number = 0;
  /**
   * y-coordinate (float number)
   * @type {number}
   */
  private mY: number = 0;
  /**
   * 创建Point实例
   * 支持以下构造方式：
   * - new Point() - 创建原点（0, 0）
   * - new Poinr(x, y) - 通过坐标创建
   * - new Point([x, y]) - 通过数组创建
   * - new Point({x, y}) - 通过对象创建
   * - new Point(point) - 通过另一个Point实例创建
   * @param iArgs 构造函数
   * @throws {ReferenceError} 非法参数 
   */
  constructor(...iArgs: any[]) {
    super();
    
    if (iArgs.length === 0) return; // 默认创建原点

    // 处理单个参数情况
    if (iArgs.length === 1) {
      if (iArgs[0] instanceof Array) {
        let arr = iArgs[0];

        // ( [Number, Number] )
        if (
          arr.length === 2 &&
          typeof arr[0] === "number" &&
          typeof arr[1] === "number"
        ) {
          this.x = arr[0];
          this.y = arr[1];
          return;
        }
      }

      // ( Point )
      if (iArgs[0] instanceof Point) {
        this.x = iArgs[0].x;
        this.y = iArgs[0].y;
        return;
      }

      // ( {x: number, y: number} )
      if (
        iArgs[0] instanceof Object &&
        iArgs[0].hasOwnProperty("x") &&
        iArgs[0].hasOwnProperty("y")
      ) {
        let point = iArgs[0] as { x: number; y: number };
        this.x = point.x;
        this.y = point.y;
        return;
      }
    }

    // (number, number)
    if (iArgs.length === 2) {
      if (typeof iArgs[0] === "number" && typeof iArgs[1] === "number") {
        this.x = iArgs[0];
        this.y = iArgs[1];
        return;
      }
    }

    throw Errors.ILLEGAL_PARAMETERS;
  }

  get x() {
    return this.mX;
  }

  set x(iValue: number) {
    if(!isValidNumber(iValue)){
        throw Errors.ILLEGAL_PARAMETERS;
    }
    this.mX = iValue;
  }

  get y() {
    return this.mY;
  }

  set y(iValue: number) {
    if(!isValidNumber(iValue)){
        throw Errors.ILLEGAL_PARAMETERS;
    }
    this.mY = iValue;
  }

  /**
   * 克隆点
   * @returns {Point} 新的Point实例 
   */
  clone(): Point {
    return new Point(this.x, this.y)
  }

  
}
