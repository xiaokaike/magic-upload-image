# magic-upload-image

> 基于Vue.js 模拟Github issues 的图片上传组件

## 支持图片上传方式
- 截图黏贴上传
- 拖拽上传
- 选择图片

## Demo地址: [demo](http://upload.leanapp.cn/) 

![demo](./demo1.gif)


## 实现方式

### 浏览器
- 截图黏贴上传使用 `paste` 事件, 浏览器的支持度：[caniuse paste](http://caniuse.com/#search=paste)
- 拖拽上传 `drop` `drag` 事件
- 选择图片 from 表单 `change` 事件

### 服务端 node

- `dev-upload.js` 基于 `express` 写的开发用的图片上传服务，图片保存在本地，启动方式 `npm run dev`
- `koa-es6-server.js` 基于 [koa](http://koajs.com) `es6` 写的图片上传服务，图片保存在本地， 启动方式 `npm run koa`
- `lean-server.js` 基于 `express` 写的 [leancloud](https://leancloud.cn/) node服务器，图片上传后保存在leancloud
  [leancloud-code 文档](https://leancloud.cn/docs/leanengine_cli.html)



## 开发

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:3002
npm run dev

# build for production with minification
npm run build

# run koa server
npm run koa
```

### 发布到leancloud

``` bash

# 安装lean工具
npm install -g leancloud-code

npm run build

lean add <app> <app-id>

# 发布测试
lean deploy

# 发布正式
lean publish

```