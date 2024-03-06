---
title: 使用vue-Treeselect更改值无法触发表单校验以及文本框校验问题
description: vue中表单校验的两个刁钻问题
mathjax: true
tags:
  - 表单校验
  - js
  - vue
categories:
  - 前端
abbrlink: 6924b15f
date: 2023-11-03 18:00:00
updated: 2023-11-03 18:00:00
---

_在实现表单功能时碰到的两个问题_

## vue-Treeselect 更改值无法触发表单校验

<div class='blog-img'>
    <img src="https://cdn.jsdelivr.net/gh/1405720461/blog_img@main/study/23.webp" />
    <img src="https://cdn.jsdelivr.net/gh/1405720461/blog_img@main/study/24.webp" />
    <img src="https://cdn.jsdelivr.net/gh/1405720461/blog_img@main/study/25.webp" />
    <img src="https://cdn.jsdelivr.net/gh/1405720461/blog_img@main/study/26.webp" />

</div>

在使用`vue-Treeselect`组件时，表单校验为必填项，但是更改值后，无法立即消除校验规则，只有提交时才能清掉校验规则，`trigger`属性也设置的为`change`

<div class='blog-img'>
    <img src="https://cdn.jsdelivr.net/gh/1405720461/blog_img@main/study/27.webp" />
</div>

### 解决方法

在`TreeSeelect`组件上`@input`绑定一个方法`validateProcessUser`用于在表单中该项值更改时进行校验，`formName`为表单的`ref`属性，`processUser`为该表单字段的 prop 值，这样就能在值更改时消除校验了

<div class='blog-img'>
    <img src="https://cdn.jsdelivr.net/gh/1405720461/blog_img@main/study/28.webp" />
    <img src="https://cdn.jsdelivr.net/gh/1405720461/blog_img@main/study/29.webp" />
</div>

## 文本框校验特殊需求

> 现在有一个文本框，要求输入不能为空，但是可以回车以及开头空两字符之类的操作，并且在校验报红状态下输入内容取消报红，类似下图内容

<div class='blog-img'>
    <img src="https://cdn.jsdelivr.net/gh/1405720461/blog_img@main/study/30.webp" />
</div>

### 解决方法

进行自定义校验规则，`change`为输入框输入内容取消报红，`validateMessageWithSpaces`方法在提交时触发，清空输入内容两侧空格校验是否为空，在输入时使用`trim`方法导致无法输入空格和回车

<div class='blog-img'>
    <img src="https://cdn.jsdelivr.net/gh/1405720461/blog_img@main/study/31.webp" />
    <img src="https://cdn.jsdelivr.net/gh/1405720461/blog_img@main/study/32.webp" />
</div>
