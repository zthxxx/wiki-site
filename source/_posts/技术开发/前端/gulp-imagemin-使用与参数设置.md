---
title: gulp-imagemin 使用与参数设置
date: 2017-02-03 13:50:52
tags: [Nodejs, gulp]
---



### 使用版本

- **gulp** : v3.9.1
- **gulp-imagemin** : v3.1.1



### 简介

gulp-imagemin 是配合 gulp 用作压缩图片文件的工具（包括PNG、JPEG、GIF和SVG图片）。

**gulp-imagemin 更新 v3.0.0 版本后，用法与之前版本有所区别。**

最近我一开始使用的时候就在网上搜索，看到很多博客都讲得一样，于是随便复制了一段代码拿来用。但是实际测试发现，这段代码里设置的参数并没有起作用，比如不管怎样设置压缩质量，出来的结果都一样。于是开始调试，通过阅读源码和官方文档后，我发现目前**国内网上关于 gulp-imagemin 的代码大部分都是错的**，并且明显看得出是相互抄袭复制的。或者也不能说是错了——没有注明版本，原来的代码用在目前的版本（v3.1.1）上就是错的。

我摘抄了一则 gulp-imagemin 网上常见的**错误代码** 如下：（**注意是对 v3.0.0 及以上版本的错误代码，对 v2.4.0 版本可能正确。**）

```javascript
// 只适用于gulp-imagemin 2.4.0 或以下版本
var gulp = require('gulp'),
    imagemin = require('gulp-imagemin');
 
gulp.task('testImagemin', function () {
    gulp.src('src/img/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('dist/img'));
});
```

上段代码出处：[gulp教程之gulp-imagemin | 一点](http://www.ydcss.com/archives/26)

且不说 `progressive: true` 的意思应该是“转为[渐进式](/wiki/计算机基础知识/图形图像/渐进式-JPEG-格式/)图片”，这段代码在 gulp-imagemin v3.0.0 之后就不正确了，主要体现在 `imagemin(option)` 的参数设置。

目前网上没有找到几个 3.0.0 之后版本的示例代码，于是我自己去查看[官方 API 说明](https://github.com/sindresorhus/gulp-imagemin/blob/master/readme.md)，这里摘抄一段如下：

> [sindresorhus](https://github.com/sindresorhus) committed on 12 Aug 2016
>
> ## API
>
> Comes bundled with the following **lossless** optimizers:
>
> - [gifsicle](https://github.com/imagemin/imagemin-gifsicle) — *Compress GIF images*
> - [jpegtran](https://github.com/imagemin/imagemin-jpegtran) — *Compress JPEG images*
> - [optipng](https://github.com/imagemin/imagemin-optipng) — *Compress PNG images*
> - [svgo](https://github.com/imagemin/imagemin-svgo) — *Compress SVG images*
>
> These are bundled for convenience and most will not need anything else.
>
> ### imagemin([plugins], [options])
>
> Unsupported files are ignored.
>
> #### plugins
>
> Type: `Array`
> Default: `[imagemin.gifsicle(), imagemin.jpegtran(), imagemin.optipng(), imagemin.svgo()]`
>
> [Plugins](https://www.npmjs.com/browse/keyword/imageminplugin) to use. This will overwrite the default plugins. Note that the default plugins comes with good defaults and should be sufficient in most cases. See the individual plugins for supported options.
>
> #### options
>
> Type: `Object`
>
> ##### verbose
>
> Type: `boolean`
> Default: `false`
>
> Output more detailed information.

可以看到 `options` 项只有一个项 `verbose`，用于输出详细信息，而不是像上面那段代码的 `optimizationLevel` `interlaced` 等项。

在四个默认插件的 API 文档中又能进一步找到参数说明。

根据官方 API 文档，我这里给出我的示例代码如下：

```javascript
// gulp-imagemin v3.0.0 及以上版本
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
gulp.task('minify-imgs', function () {
    return gulp.src('./public/images/**/*.{png,jpg,gif,svg}')
        .pipe(imagemin([
                imagemin.gifsicle({interlaced: true}), 
                imagemin.jpegtran({progressive: true}), 
                imagemin.optipng(), 
                imagemin.svgo()
            ], {verbose: false}
        ))
        .pipe(gulp.dest('./public/images'))
});
```

以上代码仍使用四个默认 imagemin 插件，设置将 gif 转为交错式，将 jpeg 转为渐进式，png 与 svg 使用默认设置，不输出详细信息。

**所以用某一个工具或者模块之前，应该先自己阅读一遍官方文档。** 我所了解的现在人们一般学习过程是，先看博客里的入门教程，然后直接写代码，学过了入门级往深一点走，才知道遇到问题会去查官方文档。我想说，官方文档有时候确实难啃，但是如果一开始我们就看了官方文档，后面会不会少走点弯路呢？



## 参考资料

> - [gulp教程之gulp-imagemin](http://www.ydcss.com/archives/26)
> - [gulp-imagemin图片压缩----gulp系列](http://www.tuicool.com/articles/MVNfUbF)
> - [gulp-imagemin | npmjs](https://www.npmjs.com/package/gulp-imagemin/)
> - [sindresorhus/gulp-imagemin | GitHub](https://github.com/sindresorhus/gulp-imagemin)
> - [imagemin/imagemin-jpegtran | GitHub](https://github.com/imagemin/imagemin-jpegtran)