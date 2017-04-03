---
title: 渐进式 JPEG 格式
date: 2017-02-01 23:02:02
tags: [图像格式]
---



JPEG 图像文件有两种保存方式，分别是 Baseline JPEG（基本式）和Progressive JPEG（渐进式），两种方式保存时有相同的尺寸、后缀名和图像数据，区别是两种格式文件在加载时的显示方式不同。



### **Baseline JPEG**

Baseline（基本式）格式保存的 JPEG 文件是通过一次按从上到下的扫描，顺序式编码（Sequential Encoding）保存数据的，加载这个文件时，数据将按照存储的顺序从上一行一行往下显示出来，正如其名字一样，是线性加载显示，直到加载完所有数据。

![Baseline 缓慢加载效果](./baseline.gif)



### **Progressive JPEG**

Progressive （渐进式）格式保存的 JPEG 文件包含多次扫描，采用递增式编码（Progressive Encoding）来存储数据，每次扫描整个图片并在上次基础上产生一次图像数据。图片在加载时，依次读取数据，先模糊的显示整个图片，随着读到的扫描次数增加，图片不断变得清晰，直到完显示所有数据。

![Progressive 缓慢加载效果](./progressive.gif)



### 对比

上面张效果图都是在网速慢时浏览器上常出现的明显情况，一般来说网站上应该使用 **渐进式 JPEG**， 因为通常我们认为渐进式比起基本式来说，可以让用户在刚开始下载图片时就看到整个图片的大致轮廓和内容，而不必一直干等着加载，并且比起基本型未加载完时的空白，渐进式在未加载完时，依旧有草图的显示，在心理上会直观的感觉这个网站加载更快一点。

![基本型与渐进式效果对比](./基本型与渐进式效果对比.jpg)

两个格式对于同一个图像来说，没有明显的大小和性能差异，图片质量也是一模一样，只是通常来说，同一个图像 **渐进式保存比基本式保存的文件大小更小一点，在保存和显示时，渐进式消耗的 CPU 资源更多一点**。

在 Photoshop 中，“文件”菜单下可选择“Save for Web”（汉化版为：存储为 Web 格式），JPEG 格式下可勾选“Progressive”（汉化版为：连续），然后保存就是**渐进式**的 JPEG。（顺便一提，PNG 格式下汉化叫“交错”）





## 参考资料

> - [使用渐进式JPEG来提升用户体验](https://www.biaodianfu.com/progressive-jpeg.html)
> - [渐进式jpeg(progressive jpeg)图片及其相关](http://www.zhangxinxu.com/wordpress/2013/01/progressive-jpeg-image-and-so-on/)
> - [Progressive jpegs: a new best practice](https://calendar.perfplanet.com/2012/progressive-jpegs-a-new-best-practice/)

