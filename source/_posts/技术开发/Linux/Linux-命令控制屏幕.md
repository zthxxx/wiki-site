---
title: Linux 命令控制屏幕
date: 2017-01-22 03:13:34
tags: [Linux]
---

## 关闭屏幕

适合没有关闭屏幕快捷键的笔记本等设备。

* /sys 文件方式：

```bash
 sudo tee /sys/class/backlight/intel_backlight/brightness <<< 0
```

 亮度值根据情况选择，一般 0 即为关闭。
* xset 命令方式：

```bash
 xset dpms force off
```

 实际使用时可写成脚本，然后设置自定义快捷键来运行。