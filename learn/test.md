### 如何书写测试用例

- [参考文章](https://juejin.cn/post/7298628841966075904)
- [单元测试-chai断言库](https://zhuanlan.zhihu.com/p/72575435)
- [Chai.js断言库API中文文档](https://www.jianshu.com/p/f200a75a15d2/)
- [测试框架 Mocha 实例教程](https://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html)
- [代码覆盖率工具 Istanbul 入门教程](https://www.ruanyifeng.com/blog/2015/06/istanbul.html)

测试用到3个插件：
- nyc(istanbul)
  - 负责代码覆盖率指标（code coverage）：是否所有代码都测试到了
    - 行覆盖率（line coverage）：是否每一行都执行了
    - 函数覆盖率（function coverage）：是否每个函数都调用了
    - 分支覆盖率（branch coverage）：是否每个if代码块都执行了
    - 语句覆盖率（statement coverage）：是否每个语句都执行了
- mocha
  - 测试框架
- chai
  - 断言：判断源码的实际执行结果与预期结果是否一致
  - 断言库

测试结果的输出形式：
- console打印报告
- html格式
  - 运行目录下会生成coverage文件夹
- case覆盖情况


#### chai断言库

- expect（推荐适合用）
- should

chai的语言链：用于提高断言的可读性，不提供测试功能
- to/be/been/is/that/which/and/has/have/with/at/of/same


#### mocha

[中文官网](https://mocha.nodejs.cn/)

运行周期分为
- 串行模式
- 并行模式

