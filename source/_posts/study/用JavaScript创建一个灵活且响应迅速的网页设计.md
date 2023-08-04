---
title: 用JavaScript创建一个灵活且响应迅速的网页设计
description: 在不同设备上以统一的视觉效果展示数据可视化大屏
mathjax: true
tags:
  - 数据可视化
  - 适配
  - js
categories:
  - 前端
abbrlink: 38e1ff4a
date: 2023-08-04 00:00:00
updated: 2023-08-04 00:00:00
---

# 用 JavaScript 创建一个灵活且响应迅速的网页设计

&emsp;&emsp;前段时间写了一个数据可视化大屏的项目，从纯 h5c3+js 的一个页面改成一个 vue3 的小项目，因为是数据可视化大屏这种需要适配更大的屏幕，所以单位应该设置适配从而在大屏上进行显示，基本的代码如下：

```js
(function flexible(window, document) {
  // 获取整个html文档根元素
  var docEl = document.documentElement;
  // 用于获取设备的像素密度(dpr)，如果设备支持获取DPR，则获取实际DPR值，否则默认设置为1
  var dpr = window.devicePixelRatio || 1;

  // 用于根据设备的DPR动态调整<body>元素的字体大小。它将<body>元素的字体大小设置为 12乘以 DPR后的值，以并像素（px）为单位
  function setBodyFontSize() {
    if (document.body) {
      document.body.style.fontSize = 12 * dpr + "px";
    } else {
      document.addEventListener("DOMContentLoaded", setBodyFontSize);
    }
  }
  setBodyFontSize();

  // 用于根据页面的宽度动态调整<html>元素的字体大小（rem单位）。它将页面的宽度除以24后作为rem的值，并以像素（px）为单位设置给<html>元素的字体大小。
  function setRemUnit() {
    var rem = docEl.clientWidth / 24;
    docEl.style.fontSize = rem + "px";
  }

  setRemUnit();

  // 监听窗口的resize事件，当页面尺寸改变时，重新调用setRemUnit函数来更新<html>元素的字体大小
  window.addEventListener("resize", setRemUnit);
  // 监听窗口的pageshow事件，这个事件在页面被加载时触发，
  // 包括从缓存中加载。如果在缓存中加载，即e.persisted为true，则重新调用setRemUnit函数来更新<html>元素的字体大小
  window.addEventListener("pageshow", function (e) {
    if (e.persisted) {
      setRemUnit();
    }
  });

  // 用于检测是否支持0.5像素的边框。
  // 在设备的DPR大于等于2的情况下，创建一个临时的测试元素（<div>），设置其边框样式为0.5像素的透明边框，并添加到文档中。
  // 然后检查这个元素的高度是否为1像素，如果是，则说明设备支持0.5像素的边框，
  // 此时会在<html>元素上添加一个名为"hairlines"的类，以便在CSS中可以应用特定样式来修复一些在高DPR设备上边框显示不清晰的问题
  if (dpr >= 2) {
    var fakeBody = document.createElement("body");
    var testElement = document.createElement("div");
    testElement.style.border = ".5px solid transparent";
    fakeBody.appendChild(testElement);
    docEl.appendChild(fakeBody);
    if (testElement.offsetHeight === 1) {
      docEl.classList.add("hairlines");
    }
    docEl.removeChild(fakeBody);
  }
})(window, document);
```

&emsp;&emsp;该段代码能够创建一个灵活和响应迅速的网页设计。通过动态调整字体大小并检测对 0.5 像素边框的支持，可以确保我们的网页在不同像素密度的各种设备上看起来清晰明了。在项目中使用这段代码，并配合 CSS 中的 rem 单位，可以让你在不同设备上以统一的视觉效果展示数据可视化大屏。

项目中使用的话，可以放在`src/utils/flexible.js`文件中，在`main.js`文件中直接引入即可使用

```js
import "./utils/flexible";
```

此时在 css 样式中，可以用 rem 单位代替 px，其中项目页面是以 1920px 为宽度，适配之后 1rem = 80px，示例如下：

```css
header h1 {
  font-size: 0.475rem;
  color: #fff;
  text-align: center;
  line-height: 1rem;
}
```

&emsp;&emsp;另外，推荐这个 VSCode 插件可以帮助你更方便地进行 px 到 rem 的单位转换，提高开发效率。尤其在移动端适配过程中，能够帮助你快速计算合适的 rem 值。
![](https://cdn.staticaly.com/gh/1405720461/blog_img@main/study/14.webp)

需要进行扩展设置，设置好相应的宽度，就可以进行快速转换了

![](https://cdn.staticaly.com/gh/1405720461/blog_img@main/study/15.webp)
![](https://cdn.staticaly.com/gh/1405720461/blog_img@main/study/16.webp)
