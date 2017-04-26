---
title: awk 管道操作小结
toc: false
date: 2017-04-25 23:04:48
tags:
---



## 背景

大致是希望使用 awk 读取一个文本文件，通过空行把文本分割成多个文本块，依次把每个文本块输入到一个程序，并把结果依次输出到指定文件。

先看文件结构：

```bash
$ ls
plus.sh  data.txt

```

其中， **`plus.sh`** 文件内容如下：

```bash
#!/bin/sh
IFS=" "
read a b
((c=a+b)) 
echo ${c}
```

代码含义是从标准输入读入两个数， `a` 、`b`，返回 `a+b` 的结果。

```bash
$ ./plus.sh
2 3    # <-- its my input
5      # --> its result
```

**`data.txt`** 中的数据如下：

```
0 30

30 40

40 80

80 100
```

目标是使用 awk 从 `data.txt` 中读入 4 组数据，分别输入到 `plus.sh` 中，返回 4 个结果值，并依次输入到 `output.txt` 中。预期结果 `output.txt` 如下：

```
30
70
120
180
```



## 经过

一开始，简单的思路是，awk 使用**空行分割文本文件**，把每组文本块**通过管道输入**到调用的 `plus.sh` 中，再把每组的结果通过**重定向追加**到 `output.txt` 文件中。

根据思路于是写出如下代码：

```bash
$ awk -v RS="" '{print | "./plus.sh >> output.txt"}' data.txt

```

然而一看结果，只有第一个分段中求出来的值；

```bash
$ ls
plus.sh  data.txt  output.txt

$ cat output.txt
30

```

经过调试和单独输出，发现分段也没问题，单独 `print` 也是分段的没问题，于是大概猜测**问题出在重定向上**，除了第一个值以外的其他结果并没有被重定向到文件（此处只是当时猜测，其实不对，请看下文分析）；

通过查阅 **「awk 使用管道输出到 shell 中」** 的相关资料，找到问题答案：



> 如果在 awk 程序中打开了管道，必须**先关闭该管道才能打开另一个管道**。也就是说一次只能打开一个管道。
>
> **shell 命令必须被双引号引用起来。**
>
> 如果打算**再次**在 awk 程序中使用某个文件或管道进行读写，则可能要先关闭程序，因为其中的管道会保持打开状态直至脚本运行结束。注意，管道一旦被打开，就会保持打开状态直至 awk 退出。
>
> 对于 `awk output | shell input` 来说，shell 接收 awk 的输出，并进行处理。需要注意的是，**awk 的 output 是先缓存在 pipe 中，等输出完毕后再调用 shell 命令 处理**，shell 命令只处理一次，而且**处理的时机是 「awk程序结束时，或者管道关闭时（需要显式的关闭管道）」**



对于刚才的问题，简单的解释就是因为管道缓存，`print` 的所有输出被堆到一起只传了一次给 `plus.sh`，而且这一次相当于传了整个文件，但 `plus.sh` 在读了两个数计算完后就退出了，后面的所有数都没用上，由于 `plus.sh` 只计算了一次，因此结果也只有一个。（并非上面猜测的结果未被重定向）



## 解决尝试

最初的解决尝试是使用 awk 中的 `close` 命令关闭文件管道，于是写出如下命令：

```bash
$ awk -v RS="" '{print | "./plus.sh >> output.txt"; close("output.txt")}' data.txt
```

结果依然只有一个值。。。

继续查阅资料才知道，`close` 关闭时需要输入的是**管道描述符**，而非只是文件名，而管道描述符是包含**对管道调用的整个命令在内的 shell 命令字符串**，也就是说，应该是 `close("./plus.sh >> output.txt")` 。

再次尝试代码修改如下：

```bash
$ awk -v RS="" '{print | "./plus.sh >> output.txt"; close("./plus.sh >> output.txt")}' data.txt

$ cat output.txt
30
70
120
180

```

OK，解决问题，这句代码就是能用的了。



## 总结

总结下刚刚踩的坑，再做些优化；

1. awk 中先关闭该管道才能打开另一个管道；

2. `awk output | shell input` 时，awk 输出缓存到管道中，只有 awk 程序结束时，或者管道关闭时，才把缓存中的所有输出交由 shell 处理；

3. 管道描述符是**调用管道的整个 shell 命令字符串**；（如在 `print | "./plus.sh >> output.txt";` 中就是 `"./plus.sh >> output.txt"`）

4. awk 语句中使用 shell 变量

   1. `"'$var'"` 的形式

      ```bash
      var="test"
      awk 'BEGIN{print "'$var'"}'
      ```


   2. 变量中有空格时使用 `"'"$var"'"`

      ```bash
      var="this is a test" 
      awk 'BEGIN{print "'"$var"'"}' 
      ```

   3. 变量中有空格，并且变量当作 shell 命令执行时，使用 `"\"'"${var}"'\""` 形式

      ```bash
      cmd="./plus a and b.sh"
      awk 'BEGIN{print | "\"'"${cmd}"'\""}'
      ```



再把上面 awk 语句写入到一个脚本中，方便调用：

**input_test.sh**

```bash
#!/bin/sh
cmd="${1:-"./main.sh"}"
data="${2:-"test_data.txt"}"
output="${3:-"stdout.txt"}"

awk -v RS="" '{print $n | "\"'"${cmd}"'\" >> \"'"${output}"'\"";close("\"'"${cmd}"'\" >> \"'"${output}"'\"")}' ${data}
```

然后我们可以调用这个脚本，帮我们分割文本做输入输出。

```bash
# input_test.sh [command] [data-file] [output-file]

$ ./input_test.sh "./plus.exe"
# 接收三个参数，要测试的命令，数据文件，输出文件，都有默认值
# ==> 将自动分割 test_data.txt 中的文本块分别对 plus.exe 做输入，并把结果依次写入 stdout.txt 中
```

[可从这里获取 `input_test.sh` 源文件](./input_test.sh)。







## 参考资料
> - [linux之awk用法 | 东方雨中漫步者](http://www.cnblogs.com/dong008259/archive/2011/12/06/2277287.html)
