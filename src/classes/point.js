/**
 * 几何点位
 */
import { Shape } from "./shape.js";

/**
 * point类
 * @type {Point}
 */
export class Point extends Shape {
    constructor(...args) {
        super()
        /**
         * x-coodinate (float number)
         * @type {number}
         */
        this.x = 0;
        /**
         * y-coodinate (float number)
         * @type {number}
         */
        this.y = 0;

        if(args.length === 0) return;
        
    }
}