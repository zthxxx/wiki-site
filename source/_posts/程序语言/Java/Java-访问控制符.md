---
title: Java 访问控制符
toc: false
date: 2017-04-18 00:28:59
tags: [Java]
---

## 访问控制符与访问控制级别

Java 提供了 3 个访问控制符：private、protected 和 public，分别代表了 3 个访问控制级别，另外还有一个不加任何访问控制符的默认访问控制级别（friendly，也称 default），也就是共 4 个访问控制级别。

Java的访问控制级别由大到小为：

**public** --> **protected** --> **friendly** --> **private**



## 访问控制表

小结一下其控制可访问作用域

| 控制级别与作用域  | 同一类中 | 同一包中 | 子类中  | 外部包任意类 |
| :-------: | :--: | :--: | :--: | :----: |
|  public   |  √   |  √   |  √   |   √    |
| protected |  √   |  √   |  √   |        |
| friendly  |  √   |  √   |      |        |
|  private  |  √   |      |      |        |

