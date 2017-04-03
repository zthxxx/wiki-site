---
title: Git commit message 基本规范
date: 2017-01-23 04:14:54
tags: [Git]
---

使用 git 提交版本时，commit message 很重要，在回顾 commit log 时需要清晰的知道每次改动是什么。

在我们写这个提交信息（commit message）时，应该遵守一定书写结构，帮助我们统一规范和理清思路。

一般遵守 [**thoughtbot 规范**](https://github.com/thoughtbot/dotfiles/blob/master/gitmessage)，这里有他们的详细说明 [5 Useful Tips For A Better Commit Message](https://robots.thoughtbot.com/5-useful-tips-for-a-better-commit-message)。

```bash
50-character subject line

72-character wrapped longer description. This should answer:

* Why was this change necessary?
* How does it address the problem?
* Are there any side effects?

Include a link to the ticket, if any.
```



简单的说就是：

1. 第一行不超过 50 个字符
2. 第二行空一行
3. 第三行开始是描述信息，每行长度不超过 72 个字符，有序号，结尾无句号
4. 第三行开始的描述信息主要说明：
   - 这个提交有什么改动？
   - 如何解决的问题？
   - 会对哪方面产生影响吗？
5. 描述信息完后空一行，close issue 或者给个相应 ticket 的链接



Example:

```bash
fix($compile): couple of unit tests for IE9
 
1. Older IEs serialize html uppercased, but IE9 does not...
2. Would be better to expect case insensitive, unfortunately jasmine does
3. not allow to user regexps for throw expectations
 
Closes #392
Breaks foo.bar api, foo.baz should be used instead
```

