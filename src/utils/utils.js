

/**
 * 浮点数比较精度
 * Floating point comparison tolerance
 * @type {number}
 */
let DP_TOL = 0.000001

/**
 * 设置浮点数精度
 * @param {number} tolerance 
 */
export function setTolerance(tolerance) {
    DP_TOL = tolerance
}

/**
 * 获取浮点数比较精度
 * @returns {number}
 */
export function getTolerance(){
    return DP_TOL
}

/**
 * 判断一个数是否为0
 * @param {number} x 
 * @returns {boolean}
 */
export function EQ_0(x) {
    return Math.abs(x) < DP_TOL
}

/**
 * 判断两个数是否相等
 * @param {number} x 
 * @param {number} y 
 * @returns {boolean}
 */
export function EQ(x, y) {
    return Math.abs(x - y) < DP_TOL
}

/**
 * 判断x是否大于y
 * @param {number} x 
 * @param {number} y 
 * @returns {boolean}
 */
export function GT(x, y){
    return (x - y > DP_TOL)
}

/**
 * 判断x是否大于等于y
 * @param {number} x 
 * @param {number} y 
 * @returns {boolean}
 */
export function GE(x, y){
    return (x - y > -DP_TOL)
}

/**
 * 判断x是否小于y
 * @param {number} x 
 * @param {number} y 
 * @returns {boolean}
 */
export function LT(x, y){
    return (x - y < -DP_TOL)
}

/**
 * 判断x是否小于等于y
 * @param {number} x 
 * @param {number} y 
 * @returns {boolean}
 */
export function LE(x, y){
    return (x - y < DP_TOL)
}