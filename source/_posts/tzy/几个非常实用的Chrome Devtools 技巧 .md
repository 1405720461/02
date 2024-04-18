---
title: 几个非常实用的Chrome Devtools 技巧
description: 几个非常实用的Chrome Devtools 技巧
mathjax: true
tags:
  - 调试
categories:
  - 前端
abbrlink: 5b49117f
date: 2024-01-02 18:30:12
updated: 2024-01-02 18:30:12
cover:
---

## 前言

关于 Chrome 浏览器，如果你是一名前端开发者，相信对此并不陌生，我们可以用它来查看 `网络请求`、`分析网页性能`、`调试 JavaScript 功能` 等。

除了这些，它还提供了很多强大但不常见的功能，可以大大提高我们的开发效率，这里分享几个实用的技巧

## 正文

### 控制台导入器

有时候想用某些库的 API，但又懒得去官网查，可以直接在控制台尝试。

要先安装 `Console Importer`，否则会报如下错误：

![ ](https://bu.dusays.com/2023/10/17/652df925e7f18.jpg)

安装插件后，重启浏览器即可体验效果。

<div class='blog-img'>
 <img src='https://bu.dusays.com/2023/10/17/652df3bce365c.jpg' />
</div>

<div class='blog-img'>
 <img src='https://bu.dusays.com/2023/10/17/652df9e3b8cd6.jpg' />
</div>

### 添加条件断点

通过下面的代码，希望当名字是 `鸡太美` 时 触发断点，该如何实现呢？

```js
const persons = [
  {
    name: "蔡徐坤",
    age: 25,
  },
  {
    name: "菜虚鲲",
    age: 23,
  },
  {
    name: "鸡太美",
    age: 24,
  },
];
persons.forEach((v) => {
  //   debugger
  console.log(v.name, v.age);
});
```

在数据量很大的情况下，使用 `条件断点` 对开发工作很有帮助，大大提高效率。

<div class='blog-img'>
 <img src='https://fastly.jsdelivr.net/gh/1405720461/blog_img@main/clutter/1.gif' />
</div>

### 使用 “`$`” 引用上次执行的结果

类似下面的场景，如果你对字符串进行了各种操作后，又想知道每一步的结果，该怎么做呢？

```js
"ikun1997".split("").reverse().join(""); // 7991nuki
```

你可能会这样做:

```js
// step 1
"ikun1997"
  .split("") // ['i', 'k', 'u', 'n', '1', '9', '9', '7']
  [
    // step 2
    ("i", "k", "u", "n", "1", "9", "9", "7")
  ].reverse() //  ['7', '9', '9', '1', 'n', 'u', 'k', 'i']
  [
    // step 3
    ("7", "9", "9", "1", "n", "u", "k", "i")
  ].join(""); // 7991nuki
```

<div class='blog-img'>
 <img src='https://bu.dusays.com/2023/10/17/652dfc7db96d1.jpg' />
</div>

使用 “$” 获取上一次操作的结果，无需每次都复制。

```js
// step 1
"ikun1997".split(""); // ['i', 'k', 'u', 'n', '1', '9', '9', '7']
// step 2
$_.reverse(); // ['7', '9', '9', '1', 'n', 'u', 'k', 'i']
// step 3
$_.join(""); // 7991nuki
```

<div class='blog-img'>
 <img src='https://bu.dusays.com/2023/10/17/652dfe986c34b.jpg' />
</div>

### 展开所有子节点

如何一次展开 DOM 元素的所有子节点，聪明的你会一个个的展开吗？

当然使用 `Alt + 单击` 一次展开所有子节点啦

<div class='blog-img'>
 <img src='https://bu.dusays.com/2023/10/17/652e02df46bf1.gif' />
</div>

在 gif 中 显而易见，点击一次只展开了一个子节点，`Alt + 单击` 则展开所有子节点。

### 使用 "`$`" 和 "`$$`" 快速选择 DOM 元素

使用 `document.querySelector` 和 `document.querySelectorAll` 在控制台中选择当前页面的元素是最常见的需求，单词太长，我们可以使用 `$` 和 `$$` 来代替。

<div class='blog-img'>
 <img src='https://bu.dusays.com/2023/10/17/652e02cc053e3.jpg' />
</div>

### 在控制台重新发送请求

对于同一个请求，有时需要重新发送，这时可以这样做:

1.选择 Network 面板 中的 `Fetch/XHR` 2.选中要重新发送的请求，`Replay XHR`

<div class='blog-img'>
 <img src='https://bu.dusays.com/2023/10/17/652e3407a53f9.gif' />
</div>

### 在控制台发送修改参数后的请求

对于同一个请求，有时需要 `修改某些参数` 并重新发送，这时可以这样做:

1.选择 Network 面板 中的 `Fetch/XHR`

2.选中要重新发送的请求，**Copy as fetch**

3.修改参数并发送

<div class='blog-img'>
 <img src='https://bu.dusays.com/2023/10/17/652e311619cf7.gif' />
</div>

> 原文链接 [几个非常实用的 Chrome Devtools 技巧](https://fe32.top/articles/skill001/)
