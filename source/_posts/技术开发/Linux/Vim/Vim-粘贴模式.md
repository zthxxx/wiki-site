---
title: Vim 粘贴模式
date: 2017-01-27 00:54:39
tags: [Linux, Vim]
---



在开启自动缩进的 Vim 中使用 `Shift + Insert` 键粘贴带有缩进的代码时，Vim 会把粘贴的内容当作键盘输入来处理，使得每遇到一个换行符就会添加一次自动缩进，导致原本的代码每行被依次连续往后缩，导致代码变乱。

![错误添加缩进的代码](./错误添加缩进的代码.jpg)

![原本正确的代码](./原本正确的代码.jpg)

既然是缩进问题，首先尝试的是取消自动缩进功能：

```Vim
" 关闭自动缩进和智能缩进
" set noai
" set nosi
:set nosmartindent 
:set noautoindent 
```

关闭自动缩进后，有时能解决错行了，有时还是不行。

更推荐的做法是使用 Vim 的 Paste 模式，这个是 Vim 自带的，为了避免粘贴时出现一些格式错误而使用的。

```Vim
" 开启粘贴模式
:set paste
" 取消粘贴模式
:set nopaste
```

在粘贴模式下（Paste Mode），粘贴内容不会出现代码变形，通过部分了解，发现粘贴模式修改了好几项设置：

- textwidth 设置为 0
- wrapmargin 设置为 0
- softtabstop 设置为 0
- 关闭自动缩进（noautoindent  nosmartindent）
- 重置 revins
- 重置 ruler
- 重置 showmatch
- 清空 formatoptions
- 禁用 lisp
- 禁用 indentexpr
- 禁用 cindent

所以之前说的关闭自动缩进只是 Paste 模式下的一项，考虑不够全面，所以有时还是会格式错位。

并且 Paste 模式本身有一个切换选项 `pastetoggle` 可以直接绑定快捷键来方便切换开启和取消粘贴模式。

```Vim
:set pastetoggle=<F11>
```

这样只需要按 `F11` 就能开启和取消粘贴模式了。