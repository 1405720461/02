---
title: 前端实现token无感刷新
description: 实现无感刷新 Token 的前端解决方案
mathjax: true
tags:
  - 无感刷新
  - 前端
  - axios
categories:
  - 前端
abbrlink: 9a8537ce
date: 2024-03-23 00:00:00
updated: 2024-03-23 00:00:00
---

## 实现无感刷新 Token 的前端解决方案

在前端开发中，处理用户登录状态下 Token 过期的问题至关重要。

### 1. 问题现象及原因

当用户登录状态下 Token 过期时，可能会出现突然跳转到登录页面的情况。这是因为前端请求拦截器检测到 Token 过期，导致请求失败，服务器返回状态码 401，触发前端跳转到登录页面的逻辑。

### 2. 解决方案概述

通过双 Token 机制（access_token 和 refresh_token）实现无感刷新 Token。具体流程包括：

- 拦截请求：在请求中携带 access_token 进行鉴权，后端验证 Token 的有效性。
- 响应拦截：捕获请求失败，判断是否为 Token 过期导致的失败，若是则调用刷新 Token 的接口。
- 刷新 Token：利用 refresh_token 获取新的 access_token，更新本地存储的 Token。
- 重新发送请求：在 Token 刷新成功后，重新发送之前因 Token 过期而失败的请求，确保用户操作的连贯性。

{% note info simple %}注：如果 refresh_token 也过期了，那么则需要清除掉所有 token（access_token 和 refresh_token），返回登录页登录。在刷新 access_token 的同时，最好也能刷新 refresh_token，比如 refresh_token 设置过期为 7 天，刷新一次 access_token 后把 refresh_token 又往后续了 7 天。这也是为什么很多软件登录后几乎不用再登录的原因。{% endnote %}

{% note warning simple %}提示：在刷新 access_token 的时候，建议设置一个标识变量用于标识 access_token 是否已经刷新了，毕竟过期时发起的请求可能有多条，响应拦截后没必要重复刷新 access_token，而且重复刷新 acces_token 可能会报错，因为最先执行完的刷新请求已经将 refresh_token 更新了，而后面执行的刷新请求还是使用旧的 refresh_token{% endnote %}

### 3. 具体实现

```javascript
const axiosInstance = axios.create({
  baseURL: "XXX",
  timeout: 5000, // 请求超时时间
});

const HOME_PAGE = "/"; // 登录页面的路径

// 封装 refreshToken 逻辑
let expiredRequestArr = []; // 存储失败的请求
let firstRequest = true; // 控制是否首次刷新 Token

// 存储当前因为 Token 失效导致发送失败的请求
const saveErrorRequest = (expiredRequest) => {
  expiredRequestArr.push(expiredRequest);
};

// 利用 refreshToken 更新当前使用的 Token
const updateTokenByRefreshToken = () => {
  axiosInstance
    .post("/refreshToken")
    .then((res) => {
      const { accessToken } = res.data;
      // 更新本地 Token
      localStorage.setItem("accessToken", accessToken);
      // 重新发送失败的请求
      expiredRequestArr.forEach((request) => {
        request();
      });
      expiredRequestArr = [];
    })
    .catch((err) => {
      console.log("刷新 Token 失败", err);
      // 刷新 Token 失败跳转登录页
      window.location.href = `${HOME_PAGE}/login`;
    });
};

// refreshToken 函数，尝试刷新 Token
const refreshToken = (expiredRequest) => {
  saveErrorRequest(expiredRequest);
  if (firstRequest) {
    updateTokenByRefreshToken(); // 刷新 Token
    firstRequest = false;
  }
};

// 响应拦截器处理 Token 过期
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // 保存失败的请求并尝试刷新 Token
      saveErrorRequest(() => {
        return axiosInstance(error.config); // 刷新 Token 后重新发送请求
      });
      if (firstRequest) {
        updateTokenByRefreshToken(); // 刷新 Token
        firstRequest = false;
      }
    } else {
      return Promise.reject(error.response);
    }
  }
);
```

### 4. 实操流程

1. 登录成功后，获取 access_token 和 refresh_token。
2. 请求接口时，在请求头中携带 access_token 进行鉴权。
3. 当请求失败且状态码为 401 时，调用刷新 Token 的接口。
4. 刷新 Token 成功后，重新发送之前失败的请求。

通过以上实现，用户可以在不受 Token 过期影响的情况下，持续地使用应用，提升了用户体验。
