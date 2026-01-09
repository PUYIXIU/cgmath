'use strict'

import {expect} from 'chai'
import {
    Utils,
    Errors,
    Shape,
    Point,
    Vector,
    Matrix
} from '../dist/index.mjs'

describe('#CGMath', () => {
    it('Namespace Utils defined', function () {
        expect(Utils).to.exist;
    })
    it('Namespace Errors defined', function () {
        expect(Errors).to.exist;
    })
    it('Namespace Shape defined', function () {
        expect(Shape).to.exist;
    })
    it('Namespace Point defined', function () {
        expect(Point).to.exist;
    })
    it('Namespace Vector defined', function () {
        expect(Vector).to.exist;
    })
    it('Namespace Matrix defined', function () {
        expect(Matrix).to.exist;
    })
})