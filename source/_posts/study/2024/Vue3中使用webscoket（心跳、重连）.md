---
title: Vue3中使用webscoket（心跳、重连）
description: Vue3中如何使用webscoket，对websocket进行简单封装
mathjax: true
tags:
  - websocket
  - vue3
  - 前端
categories:
  - 前端
abbrlink: 624eab8f
date: 2024-03-05 00:00:00
updated: 2024-03-05 00:00:00
---

### 前言

最近在做一个 H5 仿新版 QQ 的一个项目，使用的技术栈为 Vue3 + TypeScript + Vite + Pinia + Naive UI

其中最主要的核心功能就是 WebSocket，建立长连接，实现即时通信效果

<div class='blog-img'>
 <img src='https://fastly.jsdelivr.net/gh/1405720461/blog_img@main/study/47.png' />
</div>

## 正文

首先在`src/utils`下新建一个 `websocket.ts` 文件，里面是封装的 websocket 类（其中部分功能需要根据自己业务需求修改）

```ts
class WebSocketClass {
  private wsurl: string;
  private id: number;
  private socketTask: WebSocket | null = null;
  private isConnected: boolean = false; //是否关闭连接
  private heartbeatIntervalId: ReturnType<typeof setInterval> | null = null;
  private reconnectTimeoutId: ReturnType<typeof setTimeout> | null = null;

  constructor(
    wsurl: string,
    id: number,
    private heartbeatInterval: number = 3 //心跳间隔
  ) {
    this.wsurl = wsurl; // 连接地址
    this.id = id; // 用户id
    this.connect(); // 立即尝试连接
  }

  private connect(): void {
    this.socketTask = new WebSocket(this.wsurl);

    this.socketTask.onopen = () => {
      console.log("WebSocket连接成功！");

      this.isConnected = true;
      this.startHeartbeat();
    };

    this.socketTask.onmessage = (messageEvent) => {
      //写自己收到消息的逻辑
      console.log("接收到WebSocket消息：", JSON.parse(messageEvent.data));
      const newMessage = JSON.parse(messageEvent.data);
      ...
    };

    this.socketTask.onerror = () => {
      console.error("WebSocket连接错误！");
      this.isConnected = false;
    };

    this.socketTask.onclose = () => {
      console.log("WebSocket连接已关闭！");
      //判断是否登录逻辑，如果退出登录，断开连接，否则进行重连
      const isLogin = JSON.parse(localStorage.getItem("user") as string).isLogin;
      this.isConnected = false;
      if (isLogin) {
        this.tryReconnect();
      }
    };
  }

  //心跳检测
  private startHeartbeat(): void {
    if (this.heartbeatIntervalId) clearInterval(this.heartbeatIntervalId); // 清理旧的心跳
    this.heartbeatIntervalId = setInterval(() => {
      if (this.socketTask && this.isConnected) {
        //心跳检测消息（看后端需求）
        const heartbeatMessage = {
          Action: "1",
          Sender: this.id,
        };
        this.socketTask.send(JSON.stringify(heartbeatMessage));
        console.log("发送心跳检测消息：", heartbeatMessage);
      }
    }, this.heartbeatInterval * 1000);
  }

  //心跳重连
  private tryReconnect(): void {
    if (this.reconnectTimeoutId) clearTimeout(this.reconnectTimeoutId); // 清理旧的重连
    this.reconnectTimeoutId = setTimeout(() => {
      console.log("尝试重新连接WebSocket...");
      this.connect();
    }, 5000);
  }

  //发送消息
  send(message: string): void {
    if (this.socketTask && this.isConnected) {
      this.socketTask.send(message);
    } else {
      console.error("发送失败：WebSocket未连接或已关闭。");
    }
  }

  //关闭连接
  close(): void {
    if (this.heartbeatIntervalId) clearInterval(this.heartbeatIntervalId); // 停止心跳
    if (this.reconnectTimeoutId) clearTimeout(this.reconnectTimeoutId); // 阻止重连

    if (this.socketTask && this.isConnected) {
      this.socketTask.close();
      this.socketTask = null;
    }

    this.isConnected = false;
  }
}

export default WebSocketClass;

```

定义接口

```ts
export interface IWebSocket {
  send(message: string): void;
  close(): void;
}
```

## 如何使用

在需要使用的组件中，进行引入，初始化实例

```ts
import type { IWebSocket } from "@/model/xxx";
import websocket from "@/utils/websocket.ts";

//建立ws通信
const ws: IWebSocket = new websocket(
  `ws://xxxx/ws?id=${userInfo.uid}`,
  userInfo.uid
) as IWebSocket;
```

此时已经建立连接

<div class='blog-img'>
 <img src='https://fastly.jsdelivr.net/gh/1405720461/blog_img@main/study/45.png' />
</div>

会自动进行心跳检测

<div class='blog-img'>
 <img src='https://fastly.jsdelivr.net/gh/1405720461/blog_img@main/study/46.png' />
</div>

需要进行通信时，调用`send()`发送消息
