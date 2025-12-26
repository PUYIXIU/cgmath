export class Errors {
  /** 非法变量 */
  static get ILLEGAL_PARAMETERS() {
    return new ReferenceError("Illegal Parameters");
  }

  /** 零向量 */
  static get ZERO_DIVISION() {
    return new Error("Zero Division");
  }
  /** 操作不支持 */
  static get OPERATION_IS_NOT_SUPPORTED() {
    return new Error("Operation is not supported");
  }
}
