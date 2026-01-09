/**
 * 此文件用于记录断言语法
 * 笔记来源：https://zhuanlan.zhihu.com/p/72575435
 */
import {expect} from 'chai'

describe('#Chai', ()=>{
    it('1. equal', ()=>{ // 严格等于（===）
        expect('hello').to.equal('hello')
    })
    it("2. deep", ()=>{ // 深比较
        expect({bar: 'baz'}).to.deep.equal({bar: 'baz'})
    })
    it("3. eql", ()=>{ // deep.equal的简写
        expect({foo:'bar'}).to.eql({foo:'bar'})
        expect([1,2,3]).to.eql([1,2,3])
    }) 
    it("4. property", ()=>{ // 对引用类型的属性进行比较
        let obj = {foo: 'bar'}
        expect(obj).to.have.property('foo') // obj是否拥有名为foo的属性
        let deepObj = {
            name: {first: 'John', last:'Doe'},
            friends:['Sam','Ray','Lily']
        }
        // 使用点符号.深度访问时，使用nested符号
        expect(deepObj).to.have.nested.property('name.first', 'John') 
        expect(deepObj).to.nested.property('friends[0]','Sam')
    })
    it('5. inclue/contains', ()=>{ // 包含
        expect([1,2,3]).to.include(2)
        expect('foobar').to.include('bar')
        expect({
            foo: 'bar',
            hello: 'universe'
        }).to.include.keys('foo')
    })
    it('6. keys', ()=>{ // 配合any/all对属性名进行判断
        
        let obj = {foo:1, bar:2, baz:3}

        // 结合any使用：目标至少存在一个
        expect(obj).to.have.any.keys('foo', 'nowhere')
        expect(obj).to.contains.any.keys('foo', 'bar')
        
        // 结合all使用：对象必须拥有全部目标
        expect(obj).to.have.all.keys('foo','bar', 'baz')
        expect(obj).to.contains.all.keys('foo','bar')

        // 传入string
        expect(obj).to.have.any.keys('foo')
        // 传入array
        expect(obj).to.have.all.keys(['foo','bar','baz'])
        // 传入object（只比对键）
        expect(obj).to.have.any.keys({bar:3,foo: 3})
    })

    it('7. not', ()=>{ // 相反
        let foo = 'foo'
        expect(foo).to.not.equal('bar')
    })

    it('8. a(type)/an(type)', ()=>{ // 类型判断
        expect('test').to.be.a('string')
        expect(123).to.be.a('number')
        class Foo{}
        let foo = new Foo()
        expect(foo).to.be.an.instanceof(Foo)
    })

    it('9. ok', ()=>{ // 是否为真值（非布尔类型会被强制转换）
        expect('everything').to.be.ok
        expect(1).to.be.ok
        expect(false).to.not.be.ok
        expect(null).to.not.be.ok
    })

    it('10. true/false/null/undefined/NaN', ()=>{ // 特殊值严格比较
        expect(true).to.be.true
        expect(false).to.be.false
        expect(null).to.be.null
        expect(undefined).to.be.undefined
        expect(NaN).to.be.NaN
    })

    it('11. exist', ()=>{ // 存在：并非null也非undefined
        let foo = 'hi'
        let bar = null
        let baz
        expect(foo).to.exist
        expect(bar).to.not.exist
        expect(baz).to.not.exist
    })

    it('12. empty', ()=>{ // empty：空字符串、空数组、空对象
        expect('').to.empty
        expect([]).to.empty
        expect({}).to.empty
    })

    it('13. above', ()=>{ // 判断目标大于value
        expect(10).to.above(5)
        expect('foo').to.length.above(2)
        expect([1,2,3]).to.length.above(2)
    })

    it('14. length', ()=>{ // 字符串/数组长度
        expect([1,2,3]).to.length.within(2,4)
    })

    it('15. lengthOf', ()=>{ // length为期待值
        expect([1,2,3]).to.lengthOf(3)
        expect('foobar').to.lengthOf(6)
    })

    it('16. least', ()=>{ // 大于等于（不小于）
        expect(10).to.least(10)
        expect('foo').to.length.least(3)
    })

    it('17. below', ()=>{ // 小于
        expect(5).to.below(10)
        expect('foo').to.length.below(4)
    })

    it('18. most', ()=>{ // 小于等于（不大于）
        expect(5).to.most(5)
        expect('foo').to.length.most(3)
    })

    it('19. within', ()=>{ // 在某个区间内
        expect(7).to.within(5,10)
        expect('foo').to.length.within(2,4)
    })

    it('20. instanceof', ()=>{ // 实例
        expect([1,2,3]).to.instanceof(Array)
    })

    it('21. ownProperty', ()=>{ // 自有属性
        expect('test').to.ownProperty('length')
    })

    it('22. match', ()=>{ // 正则匹配
        expect('foobar').to.match(/^foo/)
    })

    it('23. string', ()=>{ // 字符串的包含关系
        expect('foobar').to.string('bar')
    })

    it('24. throw', ()=>{ // 异常捕获
        const err = new ReferenceError('this is a bad function')
        const fn = function(){throw err}
        expect(fn).to.throw(ReferenceError)
        expect(fn).to.throw(Error)
        expect(fn).to.throw(/bad function/)
        expect(fn).to.not.throw('good function')
        expect(fn).to.throw(ReferenceError, /bad function/)
        expect(fn).to.throw(err)
    })

    it('25. respondTo', ()=>{ // 方法存在性
        class Foo{}
        Foo.prototype.bar = function(){}
        let obj = new Foo()
        expect(Foo).to.respondTo('bar')
        expect(obj).to.respondTo('bar')
    })

    it('26. itself', ()=>{ // 静态方法存在性
        function Foo(){}
        Foo.bar = function(){}
        Foo.prototype.baz = function(){}
        expect(Foo).itself.to.respondTo('bar')
        expect(Foo).itself.not.to.respondTo('baz')
    })
    it('27. satisfy',()=>{ // 自定义断言
        // expect传入的值能够满足satisfy传入的函数返回值为真值
        expect(1).to.satisfy(function(num){
            return num > 0
        })
    })
    it('28. closeTo',()=>{ // 浮点数比较
        // expect：期望值 delta：范围半径
        expect(1.5).to.be.closeTo(1, 0.5)
    })
    it('29. members',()=>{ // 断言目标是set的超集，使用严格相等比较
        expect([1, 2, 3]).to.not.include.members([3,2,8])
        expect([4, 2]).to.have.members([2, 4])
        expect([5, 2]).to.not.have.members([5, 2, 1])
        expect([{id:1}]).to.deep.include.members([{id:1}])
    })
    it('30. oneOf',()=>{ // 断言目标值存在于数组中（严格相等）
        expect('a').to.be.oneOf(['a', 'b', 'c'])
        expect(9).to.not.be.oneOf(['z'])
        let three = [3]
        expect([3]).to.not.be.oneOf([1,2,[3]])
        expect(three).to.not.be.oneOf([1,2,[3]])
        expect(three).to.be.oneOf([1,2,three])
        expect(3).to.be.oneOf([3,1,2])
    })
    it('31. change',()=>{ // 断言函数改变了对象上的指定属性
        let obj = {val:10}
        let fn = function(){obj.val += 3}
        let noChangeFn = function(){return 'bar' + 'baz'}
        expect(fn).to.change(obj, 'val')
        expect(noChangeFn).to.not.change(obj, 'val')
    })
    it('32. increase/decrease',()=>{ // 断言函数会增加/减少指定对象的属性
        let obj = {val: 10}
        let fn = function(){ obj.val = 15 }
        let dfn = function(){ obj.val = 5 }
        expect(fn).to.increase(obj, 'val')
        expect(dfn).to.decrease(obj, 'val')
    })
    /**
     * seel 和 frozen 区别
     * - seel 允许修改现有属性， frozon禁止修改任何属性
     * - 两者都禁止添加新的属性
     */
    it('33. extensible',()=>{
        let notExtensibleObject = Object.preventExtensions({})
        let sealedObject = Object.seal({}) 
        let frozenObject = Object.freeze({}) 
        expect({}).to.be.extensible
        expect(notExtensibleObject).to.not.be.extensible
        expect(sealedObject).to.not.be.extensible
        expect(frozenObject).to.not.be.extensible
    })
    it('34. sealed',()=>{ // 断言对象是封闭的（无法添加新属性）
        let sealedObject = Object.seal({})
        let frozenObject = Object.freeze({})
        expect(sealedObject).to.be.sealed
        expect(frozenObject).to.be.sealed
        expect({}).to.not.be.sealed
    })
    it('35. frozen',()=>{ // 断言对象是冻结的（无法修改任何属性）
        let frozenObject = Object.freeze({})
        expect(frozenObject).to.be.frozen
        expect({}).to.not.be.frozen
    })
})

/**
 * sealed
 * frozen
 */