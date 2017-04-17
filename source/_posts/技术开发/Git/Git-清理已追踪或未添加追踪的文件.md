---
title: Git 清理已追踪或未添加追踪的文件
toc: false
date: 2017-04-17 22:51:30
tags: [Git]
---



`git add` 将文件及其修改添加到 Git 索引和追踪当中，也就是将文件快照放入暂存区当中，但我们有时候想要**丢弃本次修改过并添加到暂存区的内容**，或者需要**删除未被追踪的文件**。

## git checkout

`git checkout` 是把文件**从暂存区中恢复到工作区**，也就是说源文件如果被修改，再使用 `git add` 添加到暂存区了，`git checkout` 无法把他再恢复到源文件，只能恢复到暂存时的状态。



## git reset

`git reset` 可以用来重置工作区和暂存区还能更改 `HEAD` 指向，可以达到我们的丢弃本次修改到暂存区的目的。

```bash
# Usage: git reset [<mode>] [<commit>]
# eg: git reset --mixed HEAD
$ git reset HEAD
$ git checkout .
```

首先使用 `git reset HEAD` 把暂存区重置到本次提交，再用 `checkout` 恢复文件到暂存区的状态，但我们暂存区已经重置了，所以实际 `checkout` 恢复到的是本次提交时的初始状态了。

`git reset` 有五种模式，不写明模式参数时，默认为 `--mixed`，几种模式间主要的差异在于重置的区域不同，这里总结下其异同：（表中不写的位置代表无操作）

|         | 重置工作区 |    重置暂存区    | 将 HEAD 指向指定 commit |
| :-----: | :---: | :---------: | :----------------: |
| --hard  |   √   |      √      |         √          |
| --soft  |       |             |         √          |
| --mixed |       |      √      |         √          |
| --merge |       | 暂存区有文件则重置失败 |         √          |
| --keep  |       | 暂存区有文件则重置失败 |         √          |

所以刚才上面两行命令， `reset` 后再 `checkou` ，可以用 `--hard` 代替：

```bash
git reset --hard HEAD
```



## git clean

顺便一提，`git reset --hard` 是直接重置整个工作区，所以也会把未被添加追踪的新文件也删除了；但 `git checkout` 是恢复，所以不会影响未添加追踪的新文件。

`git clean` 就是用来删除未被添加追踪的文件和文件夹的。

```bash
git clean -n  # 将显示哪些未被追踪的文件和文件夹可以清理
git clean -d  # 清理未被追踪的文件夹
git clean -f  # 清理未被追踪的文件
git clean -df  # 清理未被追踪的文件和文件夹
```





## 参考资料
> - [git reset简介](http://blog.csdn.net/hudashi/article/details/7664464/)
> - [Git 工作区、暂存区和版本库](http://blog.csdn.net/felix_f/article/details/8777463)
> - [git 删除已经 add 的文件](http://blog.csdn.net/yang3wei/article/details/9399723)
