# klg-koa-starter-kit
考拉后端项目模板

## QuickStart

<!-- add docs here for user -->

## 系统模块

#### 模块约定
为了封装各类业务，规范业务边界，我们做了模块化的设计。src 目录下的每个子目录均代表一个模块，为了控制模块的引用关系，有如下约定：
- 模块通过 index.ts 暴露接口和函数；
- 模块通过 modules.ts 引入其他模块的接口和函数；


#### 模块层级
模块之间有严格的上下层关系，上层模块可以引用下层模块。这样设计是为了避免[循环引用](http://www.ruanyifeng.com/blog/2015/11/circular-dependency.html).
模块间的关系图见 document/系统模块图.puml

#### 循环引用
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

## Test
我们根据业务情况设置了两种测试类型，运行所有测试：

```bash
$ npm run test
```

### 单元测试
优势是可以测试丰富的case，覆盖率高，但是撰写成本高，可以只针对核心接口多详细的单元测试

```bash
$ npm run test-unit
```

### 流程测试
又称端到端（e2e）测试，模拟用户操作进行的测试，优势成本低，一个测试可以覆盖到一个接口的却大部分分支，缺点也是这个，无法覆盖所有分支。

```bash
$ npm run test-e2e
```

