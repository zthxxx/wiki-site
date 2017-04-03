---
title: Ubuntu 16.04 开机默认命令行界面
date: 2017-01-23 03:43:10
tags: [Ubuntu]
---

### 关闭图形界面，默认命令行

1. 不推介，不可恢复

   ```bash
   sudo systemctl disable lightdm.service
   ```

    将会直接卸载删除 lightdm，目前没找到直接恢复办法。


2. **推介**，安全，可恢复

   ```bash
   sudo systemctl set-default multi-user.target
   ```

   只是修改默认交互目标，开机不会后台启动桌面。



### 开启图形界面，默认图新界面

1. 针对上述第一条，只能重装 lightdm

   ```bash
   sudo apt-get install --reinstall lightdm
   ```

2. 对应上述第二条，再切换回默认图形交互

   ```bash
   sudo systemctl set-default graphical.target
   ```

3. 临时开启

   刚刚两条都是需要要配置后重启的，不过就算不切换默认，或者在重启之前，任何时候都可以临时开启图形界面：

   ```bash
   sudo systemctl start lightdm
   ```

   只限当次开机中，如果没有切换默认图形界面，下次开机任然会是命令行界面。