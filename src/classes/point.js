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
        
        // ( [Number, Number] )
        if(args.length === 1 && args[0] instanceof Array && args[0].length === 2){
            let arr = args[0]
            if( typeof (arr[0]) === 'number' && typeof (arr[1]) === 'number' ) {
                this.x = arr[0]
                this.y = arr[1]
                return
            }
        }

        // ( {x: number, y: number, name: 'point'} )
        if(args.length === 1 && args[0] instanceof Object && args[0].name === 'point'){
            let {x, y} = args[0]
            this.x = x
            this.y = y
            return
        }

        // (number, number)
        if(args.length === 2){
            if(typeof args[0] === 'number' && typeof args[1] === 'number') {
                this.x = args[0]
                this.y = args[1]
                return
            }
        }

        throw Errors.ILLEGAL_PARAMETERS;
    }
}
