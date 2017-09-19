---
title: GitHub 团队任务管理流程
toc: false
date: 2017-09-17 19:41:28
tags: [Git, GitHub, 团队协作]
---

**注：本篇是针对团队的任务管理，非开发规范。**

## 前言

GitHub 本身是非常推崇和支持团队合作，也有一些帮助项目管理的插件如 [ZenHub](https://www.zenhub.com/)，但这里我主要记录使用原生 GitHub 功能的团队任务管理模型构想。

在开始之前，我搜索过大量中文资料，但关于基于 GitHub 的团队管理方面资料很少，尝试英文搜索后，发现我所有的问题都能在官方的 [GitHub Help](https://help.github.com/categories/managing-your-work-on-github/) 文档中找到答案；

**# 再次强调官方文档的重要性 #**

所以本篇也不会讲如何操作 GitHub，更不会讲如何使用 Git。

## 起因

实验室内部需要一套规范化的团队管理方案，总体采用用任务驱动制，因此产生了一套

**制定任务 --> 安排任务 --> 分配人员 --> 追踪进度 --> 审核成果 --> 解决任务**

的管理需求。

细分来说，制定任务包括建立项目，规划项目的几个进行阶段，每个阶段具体有哪些任务，每个任务有哪些要点。

对整个团队来说，有不同方向的人员分组，制定的各项任务应该安排给适合的分组去完成，并且按照拟定的计划，阶段内的任务应该有时限，有明确的截止期限。

在分组内部，再通过分解步骤拟定各项任务和要点，分配给相应的成员。

审核人员根据各项任务完成进度，及时调整，对完成的任务做审核评估，最终标记任务为已解决。

## 方案

GitHub 提供的诸多特性都是应对管理模式的，各项概念中，Issues 提出问题与讨论；Milestone 里程碑，用于将 Issues 划分阶段进行追踪管理；Project 规划和管理项目；Organization 组织，下属成员可分为多个 Team，Team 可多层细分，并有不同的权限；对项目开发来说，能建立 Repositories 放置文件代码，人员相互之间形成 collaborator 合作者；以上这些特性完全能胜任我们需求的管理模式。

对应以上需求，实验室所有人员组成一个 [Organization](https://help.github.com/articles/about-organizations/);

按不同研究方向将 Organization 划分为多个 [Team](https://help.github.com/articles/about-teams/)，每个 Team 中按照小组关系进一步[建立二级、三级 Team](https://help.github.com/articles/requesting-to-add-a-child-team/)。

实验室需要做的项目按照敏捷管理的方式建立 Organization 的 [Project](https://help.github.com/articles/tracking-the-progress-of-your-work-with-project-boards/)，具体划分的不同模块建立多个 Repositories，Organization 的 Project 能跨不同的 Repositories [管理 Issues](https://help.github.com/articles/adding-issues-and-pull-requests-to-a-project-board/)。

Repositories 没有层级，一个 Repository 能被分配给多个 Team 并[赋予不同的权限](https://help.github.com/articles/managing-team-access-to-an-organization-repository/)，但我们可以将一个 Repository 只分配给一个 Team，这样看作是 Team 拥有自己的 Repository。

在 Team 的 Repository 中，通过建立 [Milestone](https://help.github.com/articles/about-milestones/) 来安排任务目标和截止时间，在 Milestone 中[添加 Issues](https://help.github.com/articles/associating-milestones-with-issues-and-pull-requests/) 用作安排具体的任务，Issue 中能建立 [Task List](https://help.github.com/articles/about-task-lists/)，用来表示一个任务的完成步骤和要点；每个 Issue 能[指派不同的人员或 Team](https://help.github.com/articles/assigning-issues-and-pull-requests-to-other-github-users/)；Milestone 中会显示所属 [Issues 的完成进度](https://help.github.com/articles/viewing-your-milestone-s-progress/)，用作任务管理再合适不过了。

Issues 之间能互相[提及(关联)](https://help.github.com/articles/autolinked-references-and-urls/)这在相互沟通上很有帮助；整个 Issues 面板功能都可以被[关闭](https://help.github.com/articles/disabling-issues/)，但我们更常用的是针对一条 Issue 使用 [Locking conversations](https://help.github.com/articles/locking-conversations/) 功能锁住权限，这样就只有拥有仓库权限的人能在这条 Issue 下评论，通常用于防止 spam，在合作管理中也就防止了不相关的人来捣乱。

一般来说，如果 Team 需要合作完成一项具体的项目，那么可以建一个管理敏捷开发的 Project；如果只是一般的日常任务需求，那么在任务仓库建立几个 Milestone 就够了。两者核心都是 [Issues track](https://help.github.com/articles/about-issues/)。

审核任务包括 [Code Review][1] 和审核 Issues 完成情况；Code Review 可以在完成一个 Issue 或 完成一项 Milestone 时进行；Issues 进度跟踪需要在日常进行，如果 Issue 是考核任务，那么在超时未 [Close](https://help.github.com/articles/closing-issues-using-keywords/) 后应认为考核失败。

解决任务的表现形式就是 Close，Close Issues、Close Milestone、Close Project。

## 总结

以上方案就是目前构想的基于 GitHub 的团队任务管理模型，之所以说构想，是因为这套方案未被实施验证，实际进行中肯定会有各种修改和补充的细节。



## 参考资料
> - [**GitHub** Help](https://help.github.com/)
> - [ZenHub | Agile project management within GitHub](https://www.zenhub.com/)

[1]: https://help.github.com/articles/about-pull-request-reviews/
