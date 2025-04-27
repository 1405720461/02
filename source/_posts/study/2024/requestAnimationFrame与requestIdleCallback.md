---
title: requestAnimationFrame与requestIdleCallback
description: requestAnimationFrame与requestIdleCallback详解
mathjax: true
tags:
  - js
  - 前端
categories:
  - 前端
abbrlink: 16a57e6f
date: 2024-06-10 00:00:00
updated: 2024-06-10 00:00:00
---

## requestAnimationFrame

### 0 浏览器渲染帧

如图代表一个时间轴，浏览器会每隔一小段时间把页面重新画一遍，把这个过程称之为渲染，间隔的时间点，称之为渲染帧，通常情况下，1 秒钟 60 帧（1 秒钟浏览器把页面画 60 遍）

<div class='blog-img'>
    <img src="https://fastly.jsdelivr.net/gh/1405720461/blog_img@main/study/75.webp" />
</div>

如果用`js`计时器去做动画，可以精确的设置间隔时间，保证两个渲染帧之间，刚好夹一个动画操作（改变尺寸，位置等），好处在于，每一次改变之后就马上可以得到渲染，但是这一切都是理想的情况。

<div class='blog-img'>
    <img src="https://fastly.jsdelivr.net/gh/1405720461/blog_img@main/study/65.webp" />
</div>

实际情况：渲染帧分布的没有那么平均，如下图所示。受影响的因素有很多，如机械配置等原因。

<div class='blog-img'>
    <img src="https://fastly.jsdelivr.net/gh/1405720461/blog_img@main/study/66.webp" />
</div>

就会导致，有些地方，两个渲染帧之间没有做任何动画，即 `空帧`（现在画了，但是跟之前画的一模一样，但是还是白画了一遍，没有在两个渲染帧之间做出任何动画操作，就造成了`渲染帧的浪费`）

<div class='blog-img'>
    <img src="https://fastly.jsdelivr.net/gh/1405720461/blog_img@main/study/67.webp" />
</div>

同时，也会存在`跳帧`，两个渲染帧之间出现了多次动画（两个渲染帧之间，改变了两次位置，代码运行了，但是最后只渲染了一次，只是第二次的改变），页面上会感觉跳了一下，会导致`动画不连续`

<div class='blog-img'>
    <img src="https://fastly.jsdelivr.net/gh/1405720461/blog_img@main/study/68.webp" />
</div>

但是以上还是比较理想的情况，实际的情况更为复杂，比如你写的计时器 16 毫秒间隔，但是真的是 16 毫秒吗？

<div class='blog-img'>
    <img src="https://fastly.jsdelivr.net/gh/1405720461/blog_img@main/study/69.webp" />
</div>

这样一来，`跳帧`、`空帧`就会非常严重。

<div class='blog-img'>
    <img src="https://fastly.jsdelivr.net/gh/1405720461/blog_img@main/study/70.webp" />
</div>

此时，便引出了本文的重点：`requestAnimationFrame`

### 1.1 官方定义

<div class='blog-img'>
    <img src="https://fastly.jsdelivr.net/gh/1405720461/blog_img@main/study/71.webp" />
</div>

### 1.2 关于前端动画

#### 1.2.1 前端动画方案目前有哪些？

- `css`动画

  - `transition`：过渡动画
  - `animation`：直接动画（搭配`@keyframes`）

- `js`动画

  - `setInterval`或`setTimeout`定时器（比如不停地更改`dom元素`的位置，使其运动起来）
  - `canvas`动画，搭配`js`中的定时器去运动起来（`canvas`只是一个画笔，然后我们通过定时器会使用这个画笔去画画-动画）
  - `requestAnimationFrame动画（js动画中的较好方案）`

#### 1.2.2 为何要使用这个 api 来做动画？

在工作中，做动画最优的方案无疑是`css动画`，但是某些特定场景下，`css动画`无法实现我们所需要的需求。这时，我们就要考虑使用`js`去做动画了，`canvas动画`的`本质`也是`定时器动画`。使用定时器动画干活，实际上是可以的，但是存在一个最大的问题，就是如上文所讲到`动画会抖动`，体验效果不是非常好。

而使用`requestAnimationFrame`去做动画，就不会出现抖动的现象。

这里写了一个 demo 实现的效果图（gif 看着效果不太好，建议复制代码自己试一试）

<div class='blog-img'>
    <img src="https://fastly.jsdelivr.net/gh/1405720461/blog_img@main/study/72.gif" />
</div>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        /* 滚动条平滑滚动 */
        scroll-behavior: smooth;
      }

      div {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        position: absolute;
        left: 0;
      }

      .a {
        margin-top: 10px;
        background-color: skyblue;
      }

      .b {
        margin-top: 70px;
        background-color: pink;
      }
    </style>
  </head>

  <body>
    <button class="btn">走起</button>
    <div class="a"></div>
    <div class="b"></div>
  </body>

  <script>
    let a = document.querySelector(".a");
    let b = document.querySelector(".b");
    let x = 0;
    let y = 0;
    function setIntervalFn() {
      setInterval(() => {
        x++;
        a.style.left = x + "px";
      }, 16);
    }

    function raf() {
      requestAnimationFrame(function () {
        y++;
        b.style.left = y + "px";
        raf();
      });
    }

    // 动画绑定
    let btn = document.querySelector(".btn");
    btn.addEventListener("click", () => {
      setIntervalFn();
      raf();
    });
  </script>
</html>
```

### 1.3 语法规则

`requestAnimationFrame`和`js`中的`setTimeout`定时器函数`基本一致`，不过`setTimeout`可以自由设置间隔时间，而`requestAnimationFrame`的间隔时间是由浏览器自身决定的，大约是`17毫秒`左右

1. `requestAnimationFrame`我们可以在控制台输入`window`，然后展开查看其身上的属性，就能找到了
2. `requestAnimationFrame`本质上是一个全局`window`对象上的一个属性函数，所以我们使用时，直接：`window.requestAnimationFrame(callBack)`即可。
3. 和定时器一样其接收的参数`callback`也是一个函数，即下一次重绘之前更新动画帧所调用的函数，即在这个函数体中，我们可以写对应的逻辑代码（和定时器类似）。
4. requestAnimationFrame 也有返回值，返回值是一个整数，主要是定时器的身份证标识，可以使用` window.cancelAnimationFrame()来取消回调函数执行`，相当于定时器中的`clearTimeout()`。
5. 二者也都是只执行一次，想要继续执行，做到类似`setInterval`的效果，需要写成递归的形式（上述案例中也提到了）

### 1.4 关于卡顿的问题

#### 1.4.1 为什么定时器会卡

- 我们在手机或者电脑显示屏上看东西时，显示屏会默默的不停地干活（刷新画面）
- 这个刷新值得是每秒钟刷新次数，普通显示器的刷新率约为 60Hz（每秒刷新 60 次），另外也有 75Hz、90Hz、120Hz、144Hz 等等
- 刷新率次数越高，显示器显示的图像越清晰、越流畅、越丝滑
- 不刷新就是静态的画面，刷新比较低就是`卡了`，`PPT`的感觉
- 动画想要丝滑流畅，需要卡住时间点进行代码操作（代码语句赋值、浏览器重绘）
- 所以只需要每隔 1000 毫秒的 60 分之一（60HZ）即约为 17 毫秒，进行一次动画操作即可
- 只要卡住这个 17 毫秒，每隔 17 毫秒进行操作，就能确保动画丝滑
- 但是定时器的回调函数，会受到`js`的事件队列宏任务、微任务影响，可能设定的是 17 毫秒执行一次，但是实际上这次是 17 毫秒、下次 21 毫秒、再下次 13 毫秒执行，所以并不是严格的卡住了这个 60HZ 的时间
- 没有在合适的时间点操作，就会出现：类似这样的情况：`变`、`不变`、`不变`、`变`、`不变`...
- 于是就出现了，绘制不及时的情况，就会有抖动的出现（以上述案例，位置和时间没有线性对应更新变化导致看起来抖动）

#### 1.4.2 为何`requestAnimationFrame`不会卡

`setTimeout`和`setInterval`的问题是，它们都不精确。它们的内在运行机制决定了时间间隔，参数实际上只是指定了把动画代码添加到浏览器`UI`线程队列中以等待执行的时间。如果队列前面已经加入了其他任务，那动画代码就要等前面的任务完成后再执行。

而`requestAnimationFrame`是永远跟着渲染帧走的，无论渲染帧如何改变，始终保证在渲染帧之前始终有一个动画操作，既没有`空帧`也没有`跳帧`，从而保证了动画的流畅

<div class='blog-img'>
    <img src="https://fastly.jsdelivr.net/gh/1405720461/blog_img@main/study/73.webp" />
    <img src="https://fastly.jsdelivr.net/gh/1405720461/blog_img@main/study/74.webp" />
</div>

### 1.5 应用场景

例如：回到顶部 组件，就可以使用`requestAnimationFrame`API 去做，理论讲解完毕，该自行实践了（doge）

## requestIdleCallback

### 2.1 为什么需要 requestIdleCallback ？

在网页中，有许多耗时但是却又不能那么紧要的任务。它们和紧要的任务，比如对用户的输入作出及时响应的之类的任务，它们共享事件队列。如果两者发生冲突，用户体验会很糟糕。我们可以使用`setTimout`，对这些任务进行延迟处理。但是我们并不知道，`setTimeout`在执行回调时，是否是浏览器空闲的时候。

而`requestIdleCallback`就解决了这个痛点，`requestIdleCallback`会在帧结束时并且有空闲时间。或者用户不与网页交互时，执行回调。

### 2.2 API 简介

- `requestIdleCallback`的第一个参数时`callback`
  - 当`callback`被调用时，回接受一个参数 `deadline`，`deadline`是一个对象，对象上有两个属性
    - `timeRemaining`，`timeRemaining`属性是一个函数，函数的返回值表示当前空闲时间还剩下多少时间
    - `didTimeout`，`didTimeout`属性是一个布尔值，如果`didTimeout`是 true，那么表示本次 callback 的执行是因为超时的原因
- r`equestIdleCallback`的第二个参数是 options
  - `options`是一个对象，可以用来配置超时时间

```js
requestIdleCallback(
  (deadline) => {
    // deadline.timeRemaining() 返回当前空闲时间的剩余时间
    if (deadline.timeRemaining() > 0) {
      task();
    }
  },
  {
    timeout: 500,
  }
);
```

### 2.3 空闲时间

`requestIdleCallback` 的 callback 会在浏览器的空闲时间运行，那么什么是空闲时间呢？

<div class='blog-img'>
    <img src="https://fastly.jsdelivr.net/gh/1405720461/blog_img@main/study/76.webp" />
</div>

如上图。当我们在执行一段连续的动画的时候，第一帧已经渲染到屏幕上了，到第二帧开始渲染，这段时间内属于空闲时间。这种空闲时间会非常的短暂，如果我们的屏幕是 60hz（1s 内屏幕刷新 60 次）的。那么空闲时间会小于 16ms（1000ms / 16）。

<div class='blog-img'>
    <img src="https://fastly.jsdelivr.net/gh/1405720461/blog_img@main/study/77.webp" />
</div>

另外一种空闲时间，当用户属于空闲状态（没有与网页进行任何交互），并且没有屏幕中也没有动画执行。此时空闲时间是无限长的。但是为了避免不可预测的事（用户突然和网页进行交互），空闲时间最大应该被限制在 50ms 以内。

> 为什么最大是 50ms？人类对 100ms 内的响应会认为是瞬时的。将空闲时间限制在 50ms 以内，是为了避免，空闲时间内执行任务，从而导致了对用户操作响应的阻塞，使用户感到明显的响应滞后。

在空闲期间，callback 的执行顺序是以 FIFO（先进先出）的顺序。但是如果在空闲时间内依次执行 callback 时，有一个 callback 的执行时间，已经将空闲时间用完了，剩下的 callback 将会在下一次的空闲时间执行。

```js
const task1 = () => console.log("执行任务1");
const task2 = () => console.log("执行任务2");
const task3 = () => console.log("执行任务3");

// console
// 执行任务1
// 执行任务2
// 执行任务3
requestIdleCallback(task1);
requestIdleCallback(task2);
requestIdleCallback(task3);
```

如果当前的任务所需要的执行时间，超过了当前空闲时间周期内的剩余时间，我们也可以将任务带到下一个空闲时间周期内执行。在下一个空闲周期开始后，新添加的 callback 会被添加到 callback 列表的末尾。

```js
const startTask = (deadline) {
    // 如果 `task` 花费的时间是20ms
    // 超过了当前空闲时间的剩余毫秒数，我们等到下一次空闲时间执行task
    if (deadline.timeRemaining() <= 20) {
        // 将任务带到下一个空闲时间周期内
        // 添加到下一个空闲时间周期callback列表的末尾
        requestIdleCallback(startTask)
    } else {
        // 执行任务
        task()
    }
}
```

当我们网页处于不可见的状态时（比如切换到其他的 tag），我们空闲时间将会每 10s, 触发一次空闲期。

#### timeout

如果指定了 timeout，但是浏览器没有在 timeout 指定的时间内，执行 callback。在下次空闲时间时，callback 会强制执行。并且 callback 的参数，`deadline.didTimeout`等于 true, `deadline.timeRemaining()`返回 0。

```
requestIdleCallback((deadline) => {
    // true
    console.log(deadline.didTimeout)
}, {
    timeout: 1000
})

// 这个操作大概花费5000ms
for (let i = 0; i < 3000; i++) {
    document.body.innerHTML = document.body.innerHTML + `<p>${i}</p>`
}
```

### 2.4 常见 Q&A

Q1: `requestIdleCallback` 会在每一次帧结束时执行吗？

A1: 只会在帧末尾有空闲时间时会执行，不应该期望每一次帧结束都会执行`requestIdleCallback`。

Q2: 什么操作不适合放到 `requestIdleCallback` 的 callback 中。

A2: 更新 DOM，以及 Promise 的回调（会使帧超时），什么意思？请看下面的代码。`requestIdleCallback`中代码，应该是一些可以预测执行时间的小段代码。

```js
// console
// 空闲时间1
// 等待了1000ms
// 空闲时间2
// Promise 会在空闲时间1结束后立即执行，即使没有空闲时间了也是如此。拖延了进入下一帧的时间

requestIdleCallback(() => {
  console.log("空闲时间1");
  Promise.resolve().then(() => {
    sleep(1000);
    console.log("等待了1000ms");
  });
});

requestIdleCallback(() => {
  console.log("空闲时间2");
});
```
