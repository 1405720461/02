---
title: Axios
description: Axios
mathjax: true
tags:
  - axios
categories:
  - 前端
abbrlink: 6155a9d6
date: 2022-10-01 00:00:00
updated: 2022-10-01 00:00:00
---

# Axios

[【axios】使用 json-server 搭建 REST API - 使用 axios - 自定义 axios - 取消请求 - 拦截器\_YK 菌的博客-CSDN 博客](https://blog.csdn.net/weixin_44972008/article/details/114368528)

## axios 是什么?

前端最流行的 ajax 请求库

react/vue 官方都推荐使用 axios 发 ajax 请求

## axios 特点

1.基于 xhr + promise 的异步 ajax 请求库

2.浏览器端/node 端都可以使用

3.支持请求／响应拦截器

4.支持请求取消

5.请求/响应数据转换

6.批量发送多个请求

## axios 常用语法

axios(config): 通用/最本质的发任意类型请求的方式

axios(url[, config]): 可以只指定 url 发 get 请求

axios.request(config): 等同于 axios(config)

axios.get(url[, config]): 发 get 请求

axios.delete(url[, config]): 发 delete 请求

axios.post(url[, data, config]): 发 post 请求

axios.put(url[, data, config]): 发 put 请求

axios.defaults.xxx: 请求的默认全局配置

axios.interceptors.request.use(): 添加请求拦截器

axios.interceptors.response.use(): 添加响应拦截器

axios.create([config]): 创建一个新的 axios(它没有下面的功能)

axios.Cancel(): 用于创建取消请求的错误对象

axios.CancelToken(): 用于创建取消请求的 token 对象

axios.isCancel(): 是否是一个取消请求的错误

axios.all(promises): 用于批量执行多个异步请求

axios.spread(): 用来指定接收所有成功数据的回调函数的方法

<img src="https://fastly.jsdelivr.net/gh/1405720461/blog_img@main/study/1.webp"  style="zoom:67%;" />

### axios.create(config)

1. 根据指定配置创建一个新的 axios, 也就就每个新 axios 都有自己的配置

2. 新 axios 只是没有取消请求和批量发请求的方法, 其它所有语法都是一致的

3. 为什么要设计这个语法?

   (1) 需求: 项目中有部分接口需要的配置与另一部分接口需要的配置不太一 样, 如何处理

   (2) 解决: 创建 2 个新 axios, 每个都有自己特有的配置, 分别应用到不同要 求的接口请求中

### 拦截器函数/ajax 请求/请求的回调函数的调用顺序

1. 说明: 调用 axios()并不是立即发送 ajax 请求, 而是需要经历一个较长的流程
2. 流程: 请求拦截器 2 => 请求拦截器 1 => 发 ajax 请求 => 响应拦截器 1 => 响应拦截器 2 => 请求的回调
3. 注意: 此流程是通过 promise 串连起来的, 请求拦截器传递的是 config, 响应 拦截器传递的是 response

### 取消请求

1. 基本流程

   配置 cancelToken 对象

   缓存用于取消请求的 cancel 函数

   在后面特定时机调用 cancel 函数取消请求

   在错误回调中判断如果 error 是 cancel, 做相应处理

2. 实现功能

   点击按钮, 取消某个正在请求中的请求

   在请求一个接口前, 取消前面一个未完成的请求
