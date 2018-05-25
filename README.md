# klg-koa-starter-kit
考拉后端项目模板

## QuickStart

<!-- add docs here for user -->

## 系统模块
为了封装各类业务，规范业务边界，我们做了模块化的设计。src 目录下的每个子目录均代表一个模块，为了控制模块的引用关系，有如下约定：
模块通过 index.ts 暴露接口和函数；
模块通过 modules.ts 引入其他模块的接口和函数；

模块间的关系图见 document/系统模块图.puml


### 模块层级和循环引用

模块之间有严格的上下层关系，上层模块可以引用下层模块。
如果出现了下层模块需要引用上层模块的情况，会导致[循环引用](http://www.ruanyifeng.com/blog/2015/11/circular-dependency.html).


要解决这个问题的话，首先考虑你的设计，出现这个问题主要是因为你没有把代码放在合适的模块中。例如不要尝试在底层模块 Lib 里调用上层模块 Order。

如果的确需要循环依赖的话，可以使用事件来解开这个环，底层模块 Lib 抛出事件，再由事件模块调用上层模块 Order 执行。

## API 接口文档

### 生成文档
`npm run doc`

### 查看文档
启动服务 `npm run dev`

访问 http://localhost:3008/docs/index.html

### Test

```bash
$ npm i
$ npm test
```

