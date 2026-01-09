import { expect } from 'chai'

import {Matrix} from '../../dist/index.mjs'

describe('#CGMath.Matrix', function(){
    it('May create new instance of Matrix', function(){
        let matrix = new Matrix()
        expect(matrix).to.be.an.instanceof(Matrix)
    })
})