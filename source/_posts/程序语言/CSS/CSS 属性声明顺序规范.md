---
title: CSS 属性声明顺序规范
toc: false
date: 2017-10-24 21:28:59
tags: [CSS]
---

# CSS 属性声明顺序规范

很多 CSS 规范的属性顺序都各不一样，这东西也不像 [Vue 组件属性顺序](https://vuejs.org/v2/style-guide/index.html#Component-instance-options-order-recommended) 一样有官方规范，这里记录下我目前认为合适的一种顺序。

## 属性分类顺序

- 显示方法 & 布局
- 定位
- 盒模型框
  - 外边距
  - 边框
  - 内边距
- 尺寸
- 文本样式
  - 字体
  - 文本
  - 文字颜色
- 背景
- 轮廓
- 透明度 & 阴影
- 动效
  - 过渡
  - 转换变形
  - 动画
- 其他
  - 伪类 & 伪元素
  - 引用
  - 媒体查询



## 属性顺序列表

> 源自 AlloyTeam [CSS Code Guide](http://alloyteam.github.io/CodeGuide/#css-declaration-order)

```js
[
  [
    "display",
    "visibility",
    "float",
    "clear",
    "overflow",
    "overflow-x",
    "overflow-y",
    "clip",
    "zoom"
  ],
  [
    "table-layout",
    "empty-cells",
    "caption-side",
    "border-spacing",
    "border-collapse",
    "list-style",
    "list-style-position",
    "list-style-type",
    "list-style-image"
  ],
  [
    "position",
    "top",
    "right",
    "bottom",
    "left",
    "z-index"
  ],
  [
    "margin",
    "margin-top",
    "margin-right",
    "margin-bottom",
    "margin-left",
    "box-sizing",
    "border",
    "border-width",
    "border-style",
    "border-color",
    "border-top",
    "border-top-width",
    "border-top-style",
    "border-top-color",
    "border-right",
    "border-right-width",
    "border-right-style",
    "border-right-color",
    "border-bottom",
    "border-bottom-width",
    "border-bottom-style",
    "border-bottom-color",
    "border-left",
    "border-left-width",
    "border-left-style",
    "border-left-color",
    "border-radius",
    "border-top-left-radius",
    "border-top-right-radius",
    "border-bottom-right-radius",
    "border-bottom-left-radius",
    "border-image",
    "border-image-source",
    "border-image-slice",
    "border-image-width",
    "border-image-outset",
    "border-image-repeat",
    "padding",
    "padding-top",
    "padding-right",
    "padding-bottom",
    "padding-left",
    "width",
    "min-width",
    "max-width",
    "height",
    "min-height",
    "max-height"
  ],
  [
    "font",
    "font-family",
    "font-size",
    "font-weight",
    "font-style",
    "font-variant",
    "font-size-adjust",
    "font-stretch",
    "font-effect",
    "font-emphasize",
    "font-emphasize-position",
    "font-emphasize-style",
    "font-smooth",
    "line-height",
    "text-align",
    "text-align-last",
    "vertical-align",
    "white-space",
    "text-decoration",
    "text-emphasis",
    "text-emphasis-color",
    "text-emphasis-style",
    "text-emphasis-position",
    "text-indent",
    "text-justify",
    "letter-spacing",
    "word-spacing",
    "text-outline",
    "text-transform",
    "text-wrap",
    "text-overflow",
    "text-overflow-ellipsis",
    "text-overflow-mode",
    "word-wrap",
    "word-break"
  ],
  [
    "color",
    "background",
    "background-color",
    "background-image",
    "background-repeat",
    "background-attachment",
    "background-position",
    "background-position-x",
    "background-position-y",
    "background-clip",
    "background-origin",
    "background-size"
  ],
  [
    "outline",
    "outline-width",
    "outline-style",
    "outline-color",
    "outline-offset",
    "opacity",
    "box-shadow",
    "text-shadow"
  ],
  [
    "transition",
    "transition-delay",
    "transition-timing-function",
    "transition-duration",
    "transition-property",
    "transform",
    "transform-origin",
    "animation",
    "animation-name",
    "animation-duration",
    "animation-play-state",
    "animation-timing-function",
    "animation-delay",
    "animation-iteration-count",
    "animation-direction"
  ],
  [
    "content",
    "quotes",
    "counter-reset",
    "counter-increment",
    "resize",
    "cursor",
    "user-select",
    "nav-index",
    "nav-up",
    "nav-right",
    "nav-down",
    "nav-left",
    "tab-size",
    "hyphens",
    "pointer-events"
  ]
]
```

## 参考链接

> - [Code Guide by @mdo](http://codeguide.co/#css-declaration-order)
> - [RECESS | property order](https://github.com/twitter/recess/blob/master/lib/lint/strict-property-order.js#L36)
> - [Code Guide by @AlloyTeam](http://alloyteam.github.io/CodeGuide/#css-declaration-order)


