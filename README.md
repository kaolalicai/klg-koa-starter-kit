# klg-koa-starter-kit
考拉后端项目模板

## 软件版本
- Node 8+
- npm 5+
- typescript 2.8+

## QuickStart

### clone 本项目

```bash
git clone https://github.com/kaolalicai/klg-koa-starter-kit.git
```

### 使用 klg-init

先安装 klg-init
```bash
npm i klg-init -g
```

初始化项目

```bash
klg-init --type=project-ts foo

cd foo

npm i

npm run dev
```




## 系统模块
要提高代码的可维护性和可拓展性，主要手段就是解耦代码，根据业务划分代码模块是非常有必要的。

### 模块约定
为了封装各类业务，规范业务边界，我们做了模块化的设计。src 目录下的每个子目录均代表一个模块，为了控制模块的引用关系，有如下约定：
- 模块通过 index.ts 暴露接口和函数；
- 模块通过 modules.ts 引入其他模块的接口和函数；


### 模块层级
模块之间有严格的上下层关系，上层模块可以引用下层模块。这样设计是为了避免[循环引用](http://www.ruanyifeng.com/blog/2015/11/circular-dependency.html).
模块间的关系图见 document/系统模块图.puml

### 循环引用
出现这个问题，首先考虑你的设计是否正确，大部分原因是你没有把代码放在合适的模块中，例如在底层模块 Lib 里调用上层模块 Order。

如果的确需要循环依赖的话，可以使用事件来解开这个环，底层模块 Lib 抛出事件，再由事件模块调用上层模块 Order 执行。

## API 接口文档

### 生成文档

```bash
$ npm run doc
```

### 查看文档
启动服务：

```bash
$ npm run dev
```

访问 http://localhost:3008/docs/index.html

## UML 图
请安装 [plantuml](http://plantuml.com/) 插件

## Test
我们根据业务情况设置了两种测试类型，运行所有测试：

```bash
$ npm run test
```

### 单元测试
优势是可以测试丰富的case，覆盖率高，但是编写成本高，可以只针对核心接口做多 case 的单元测试

```bash
$ npm run test-unit
```

### 流程测试
又称端到端（e2e）测试，模拟用户操作进行的测试，优势成本低，一个测试可以覆盖到大部分分支，缺点是比较重，要覆盖所有分支成本高。

```bash
$ npm run test-e2e
```

### 测试覆盖率

```bash
$ npm run cov
```

## Docker 镜像打包
```bash
$ make build
```
默认推送到公司仓库，可以在 Makefile 中修改仓库地址和镜像信息

## 本项目使用的外部开源库

- config 配置，根据不同的环境切换配置
- ioredis redis 连接
- joi 参数校验
- klg-logger 日志
- klg-number 数字处理
- klg-redlock 分布式锁
- klg-request http请求
- klg-tracer http请求log
- koa + 中间件 mvc框架
- mongoose mongodb orm
- apidoc api 从注释生成接口文档
- jest 测试框架
- nock http mock
- supertest koa test 工具
- tslint typescript lint
- tslint-config-klg typescript code style
