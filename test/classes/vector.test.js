import { expect } from 'chai'
// import { Vector, Point } from '../../dist/index.mjs'
import { Vector, Point } from '../../dist/index.mjs'

describe('#CGMath.Vector', function(){
    it('May create new instance of Vector', ()=>{
        let vector = new Vector(1, 1)
        expect(vector).to.be.instanceof(Vector)
    })
    it('Default constructor creates new Vector(0, 0)', ()=>{
        let vector = new Vector()
        expect(vector).to.deep.equal({x:0, y:0})
    })
    it('Constructor Vector(x, y) creates vector [x, y]', ()=>{
        let vector = new Vector(1, 1)
        expect(vector).to.deep.equal({x:1, y:1})
    })
    it('Constructor Vector(ps, pe) creates vector [ps, pe]', ()=>{
        let ps = new Point(1, 1)
        let pe = new Point(3, 2)
        let vector = new Vector(ps, pe)
        expect(vector).to.deep.equal({x:2, y:1})
    })
})