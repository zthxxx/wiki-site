---
title: Selenium 中使用 Chrome 路径问题
toc: false
date: 2017-05-06 00:37:50
tags: [前端]
---

## 起因

这个问题的起因是折腾了好久，vue2 官方模板 `vue init webpack` 初始化后，`npm install` 完，直接 `npm run e2e` 都报错。。。

```bash
Error retrieving a new session from the selenium server

Connection refused! Is selenium server started?
```



## 排查

`nightwatch.conf.js` 中，对服务器和浏览器的地址描述，用的分别是

```javascript
server_path: require('selenium-server').path
'webdriver.chrome.driver': require('chromedriver').path
```

在 `node` 中检查地址没问题，包也没问题。

查找官网资料未果，后在各网友经验中发现两句关键描述：

**在 selenium 中使用 chromedriver 驱动，除了需要下载 chromedriver.exe 然后放置在 chrome 浏览器的安装目录之外，还要将 chrome 安装目录添加到环境变量 path 中。**



## 解决

1. 从 `node_modules` 的 `chormedriver` 包中复制出 `chromedriver.exe` 到 Chrome 安装目录下（`Google/Chrome/Application/`），和 `chromed.exe` 放在同一目录中。
2. 将 Chrome 安装目录（`Google/Chrome/Application/`）添加到环境变量 `path` 下。
3. 把 `nightwatch.conf.js` 中的 `webdriver.chrome.driver` 对应的路径手动指定到 Chrome 安装目录下的 `chromedriver.exe`，Win 下记得字符转义。

此时 `npm run e2e` 能成功启动 Chrome 并测试。



## 参考资料
> - [selenium chromedriver配置](http://blog.csdn.net/carsonzhang_/article/details/46318531)
> - [使用webdriver打开本地浏览器](http://www.cnblogs.com/Jeff-cui/p/4940410.html)
