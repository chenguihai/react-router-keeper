# React-Router-Keeper

## 起因

由于react-router在url发生改变时会按`<route/>`对应的组件重新渲染，导致之前页面的内容被清除，不符合项目需要，所以就参考react-router结合redux搞了这么个小东西出来，由于初学react，写的不好，还请大佬们多多指教

## 更新

20170822：
* Fix;
20170821：
* 添加'RouteTab'组件;
* 添加'关闭'功能;
* 修改示例;


## 目录

```
|--build        ：webpack
|--example      ：示例
|--src          ：源码
```

## 示例的NPM命令

```
npm run hot     ：热替换模式
npm run watch   ：监听模式
npm run build   ：生产模式
npm run dev     ：开发模式
```