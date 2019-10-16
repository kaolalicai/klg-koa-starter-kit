# klg-koa-starter-kit
考拉后端项目模板

## 软件版本
- Node 8.9+
- npm 5+
- typescript 3.6+

## QuickStart

更新日期 2019/10/16

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
klg-init --type project-ts foo
```

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

## UML 设计图
建议使用 plantuml 来画设计图。
请安装 [plantuml](http://plantuml.com/) 插件。

## Test
默认是集成测试，针对接口

```bash
$ npm run test
```

### 测试覆盖率

```bash
$ npm run cov
```
目前还没有兼容 typescript，需要修复

## Docker 镜像打包
```bash
$ make build
```
默认推送到公司仓库，可以在 Makefile 中修改仓库地址和镜像信息

