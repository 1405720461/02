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



## 前言

&emsp;&emsp;前段时间写了一个数据可视化大屏的项目，从纯 h5c3+js 的一个页面改成一个 vue3 的小项目，因为是数据可视化大屏这种需要适配更大的屏幕，所以单位应该设置适配从而在大屏上进行显示.

## flexible.js 移动端自适应方案

### 一、官方文档：

flexible.js是手淘开发出的一个用来适配移动端的js框架。手淘框架的核心原理就是根据制不同的width给网页中html根节点设置不同的font-size，然后所有的px都用rem来代替，这样就实现了不同大小的屏幕都适应相同的样式了。其实它就是一个终端设备适配的解决方案，也就是说它可以让你在不同的终端设备中实现页面适配。

github地址：[https://github.com/amfe/lib-flexible](https://link.jianshu.com/?t=https://github.com/amfe/lib-flexible)
官方文档地址：[https://github.com/amfe/article/issues/17](https://link.jianshu.com/?t=https://github.com/amfe/article/issues/17)



### 二、使用方式

- **引入方式**

```js
<script src="http://g.tbcdn.cn/mtb/lib-flexible/0.3.2/??flexible_css.js,flexible.js"></script>
```

- **单页面应用使用（`webpack` 构建工具使用）**

```
npm i -S amfe-flexible
```

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
<script src="./node_modules/amfe-flexible/index.js"></script>
```

### 三、源码分析

```js
(function(win, lib) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var metaEl = doc.querySelector('meta[name="viewport"]');
    var flexibleEl = doc.querySelector('meta[name="flexible"]');
    var dpr = 0;
    var scale = 0;
    var tid;
    var flexible = lib.flexible || (lib.flexible = {});
    
    if (metaEl) {
        console.warn('将根据已有的meta标签来设置缩放比例');
        var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
        if (match) {
            scale = parseFloat(match[1]);
            dpr = parseInt(1 / scale);
        }
    } else if (flexibleEl) {
        var content = flexibleEl.getAttribute('content');
        if (content) {
            var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
            var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
            if (initialDpr) {
                dpr = parseFloat(initialDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));    
            }
            if (maximumDpr) {
                dpr = parseFloat(maximumDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));    
            }
        }
    }

    if (!dpr && !scale) {
        var isAndroid = win.navigator.appVersion.match(/android/gi);
        var isIPhone = win.navigator.appVersion.match(/iphone/gi);
        var devicePixelRatio = win.devicePixelRatio;
        if (isIPhone) {
            // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {                
                dpr = 3;
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
                dpr = 2;
            } else {
                dpr = 1;
            }
        } else {
            // 其他设备下，仍旧使用1倍的方案
            dpr = 1;
        }
        scale = 1 / dpr;
    }

    docEl.setAttribute('data-dpr', dpr);
    if (!metaEl) {
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl);
        } else {
            var wrap = doc.createElement('div');
            wrap.appendChild(metaEl);
            doc.write(wrap.innerHTML);
        }
    }

    function refreshRem(){
        var width = docEl.getBoundingClientRect().width;
        if (width / dpr > 540) {
            width = 540 * dpr;
        }
        var rem = width / 10;
        docEl.style.fontSize = rem + 'px';
        flexible.rem = win.rem = rem;
    }

    win.addEventListener('resize', function() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    if (doc.readyState === 'complete') {
        doc.body.style.fontSize = 12 * dpr + 'px';
    } else {
        doc.addEventListener('DOMContentLoaded', function(e) {
            doc.body.style.fontSize = 12 * dpr + 'px';
        }, false);
    }
    

    refreshRem();

    flexible.dpr = win.dpr = dpr;
    flexible.refreshRem = refreshRem;
    flexible.rem2px = function(d) {
        var val = parseFloat(d) * this.rem;
        if (typeof d === 'string' && d.match(/rem$/)) {
            val += 'px';
        }
        return val;
    }
    flexible.px2rem = function(d) {
        var val = parseFloat(d) / this.rem;
        if (typeof d === 'string' && d.match(/px$/)) {
            val += 'rem';
        }
        return val;
    }

})(window, window['lib'] || (window['lib'] = {}));
```





## 简化方案

为了简化移动端自适应的实现，我提供了一种更简单的方案。以下是该方案的具体实现：

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
      docEl.classList.add("hairline");
    }
    docEl.removeChild(fakeBody);
  }
})(window, document);
```

### 使用

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

### 注意事项

在使用此简化方案时，请注意以下几点：

1. **设置页面宽度：** 我们默认将页面宽度设置为 `1920px` 作为基准进行适配，你可以根据实际情况调整该值。
2. **兼容性考虑：** 该方案在大多数现代浏览器和设备上都能良好运行，但仍需进行充分测试以确保在不同环境下的兼容性。
3. **适用场景：** 此方案适用于大多数移动端项目，特别是对于需要快速实现自适应的小型项目来说，是一个不错的选择。



### 推荐工具

另外，推荐一个 VSCode 插件可以帮助你更方便地进行 px 到 rem 的单位转换，提高开发效率。尤其在移动端适配过程中，能够帮助你快速计算合适的 rem 值。
![](https://fastly.jsdelivr.net/gh/1405720461/blog_img@main/study/14.webp)

需要进行扩展设置，设置好相应的宽度，就可以进行快速转换了

![](https://fastly.jsdelivr.net/gh/1405720461/blog_img@main/study/15.webp)
![](https://fastly.jsdelivr.net/gh/1405720461/blog_img@main/study/16.webp)

