---
title: Vue中后台管理系统使用echarts，侧边栏变化导致图表不能自适应问题
description: 侧边栏伸缩导致echarts无法自适应问题
mathjax: true
tags:
  - 数据可视化
  - 适配
  - js
  - vue
categories:
  - 前端
abbrlink: a9195f79
date: 2023-12-05 00:00:00
updated: 2023-12-05 00:00:00
---

## 问题描述

&emsp;&emsp;在做一个后台管理系统时遇到了这个问题，当左侧列表展开时就会使 echarts 图表溢出或空缺，echarts 配置的响应式只响应窗口变化，并不能支持内部变化导致的内容溢出或空缺，如图两种情况

<div class='blog-img'>
    <img src="https://fastly.jsdelivr.net/gh/1405720461/blog_img@main/study/17.webp" />
    <img src="https://fastly.jsdelivr.net/gh/1405720461/blog_img@main/study/18.webp" />
    <img src="https://fastly.jsdelivr.net/gh/1405720461/blog_img@main/study/19.webp" />
    <img src="https://fastly.jsdelivr.net/gh/1405720461/blog_img@main/study/20.webp" />
</div>

## 解决办法

1. 首先需要引入`element-resize-detector`依赖

2. 新建 `chart.resize.js` 文件，添加下面代码，配置自定义指令

   ```js
   import echarts from "echarts";
   import Vue from "vue";
   import elementResizeDetectorMaker from "element-resize-detector";

   export var version = "0.0.1";
   var compatible = /^2\./.test(Vue.version);
   if (!compatible) {
     Vue.util.warn(
       "vue echarts resize directive " +
         version +
         " only supports Vue 2.x, and does not support Vue " +
         Vue.version
     );
   }
   let HANDLER = "_vue_echarts_resize_handler";

   function bind(el) {
     unbind(el);
     el[HANDLER] = function () {
       let chart = echarts.getInstanceByDom(el);
       if (!chart) {
         return;
       }
       chart.resize();
     };
     //监听window窗体变化，更新echarts大小
     //window.addEventListener("resize", el[HANDLER])
     //监听绑定的div大小变化，更新echarts大小
     elementResizeDetectorMaker().listenTo(el, el[HANDLER]);
   }
   function unbind(el) {
     //window.removeEventListener("resize", el[HANDLER]);
     elementResizeDetectorMaker().removeListener(el, el[HANDLER]);
     delete el[HANDLER];
   }
   var directive = {
     bind: bind,
     unbind: unbind,
   };
   Vue.directive("on-echart-resize", directive);
   ```

3. 在页面中引入依赖以及 js 文件

   ```js
   import elementResizeDetectorMaker from "element-resize-detector";
   import "./chart.resize";
   ```

4. 在需要监听的 echarts 的 dom 容器中绑定指令`v-on-echart-resize`

   ```html
   <div
     ref="tendencyChart"
     id="tendencyChart"
     style="width: 100%; height: 160px"
     v-on-echart-resize
   ></div>
   ```

5. 在`mounted`中进行监听，从而解决菜单栏问题导致的 echarts 图表不能自适应问题

   ```js
   mounted() {
       // 左侧导航菜单打开与关闭，echarts实现响应式
       let erd = elementResizeDetectorMaker();
       let that = this;
       // 监听折线图大小变化，使echarts发生响应式变化
       erd.listenTo(document.getElementById("tendencyChart"), (element) => {
         that.$nextTick(() => {
           //使echarts尺寸重置
           that.echarts.init(document.getElementById("tendencyChart")).resize();
           ...	//如果多个都需要改变，可以在这里添加多个echarts（id为tendencyChart的图表尺寸发生改变时，写入的echartst图表都跟着改变）
         });
       });
     },
   ```

<div class='blog-img'>
    <img src="https://fastly.jsdelivr.net/gh/1405720461/blog_img@main/study/21.webp" />
    <img src="https://fastly.jsdelivr.net/gh/1405720461/blog_img@main/study/22.webp" />
</div>
