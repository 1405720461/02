---
title: Promise
description: Promise
mathjax: true
tags:
  - js
  - promise
categories:
  - 前端
cover: /assets/blog_bg/2.webp
abbrlink: 54b11a0c
date: 2023-06-01 19:57:00
updated: 2023-06-01 19:57:00
---

# Promise

## Promise 的理解和使用

### Promise 是什么?

**抽象表达:**

1. Promise 是一门新的技术(ES6 规范)

2. Promise 是 JS 中进行异步编程的新解决方案

​ 备注：旧方案是单纯使用回调函数

**具体表达:**

1. 从语法上来说: Promise 是一个构造函数

2. 从功能上来说: promise 对象用来封装一个异步操作并可以获取其成功/ 失败的结果值

#### promise 的状态改变

1. pending 变为 resolved

2. pending 变为 rejected

   说明: 只有这 2 种, 且一个 promise 对象只能改变一次 无论变为成功还是失败, 都会有一个结果数据 成功的结果数据一般称为 value, 失败的结果数据一般称为 reason

#### promise 的基本流程

<img src="https://cdn.staticaly.com/gh/1405720461/blog_img@main/study/2.webp"  style="zoom:67%;" />

#### promise 的基本使用

1. 使用 1: 基本编码流程

```js
<script>
  // 1) 创建 promise 对象(pending 状态), 指定执行器函数 const p = new
  Promise((resolve, reject) =>{" "}
  {
    // 2) 在执行器函数中启动异步任务
    setTimeout(() => {
      const time = Date.now();
      // 3) 根据结果做不同处理
      // 3.1) 如果成功了, 调用 resolve(), 指定成功的 value, 变为 resolved 状态
      if (time % 2 === 1) {
        resolve("成功的值 " + time);
      } else {
        // 3.2) 如果失败了, 调用 reject(), 指定失败的 reason, 变为rejected 状态
        reject("失败的值" + time);
      }
    }, 2000)
  }
  ) // 4) 能 promise 指定成功或失败的回调函数来获取成功的 vlaue 或失败的 reason p.then(
  value => {
    // 成功的回调函数 onResolved, 得到成功的 vlaue
    console.log("成功的 value: ", value)
  }, reason =>{" "}
  {
    // 失败的回调函数 onRejected, 得到失败的 reason
    console.log("失败的 reason: ", reason)
  }
  )
</script>
```

2. 使用 2: 使用 promise 封装基于定时器的异步

```js
<script>
	function doDelay(time) {
		// 1. 创建 promise 对象
		return new Promise((resolve, reject) => {
		// 2. 启动异步任务
			console.log('启动异步任务')
			setTimeout(() => {
				console.log('延迟任务开始执行...')
				const time = Date.now() // 假设: 时间为奇数代表成功, 为偶数代表失败
				if (time %2=== 1) { // 成功了
					// 3. 1. 如果成功了, 调用 resolve()并传入成功的 value
					resolve('成功的数据 ' + time)
				} else { // 失败了
					// 3.2. 如果失败了, 调用 reject()并传入失败的 reason
					reject('失败的数据 ' + time)
				}
			}, time)
		})
	}
	const promise = doDelay(2000)
	promise.then(
		value => {
			console.log('成功的 value: ', value)
		},
		reason => {
			console.log('失败的 reason: ', reason)
		},
	)
</script>
```

3. 使用 3: 使用 promise 封装 ajax 异步请求

```js
<script>
	/*
	可复用的发 ajax 请求的函数: xhr + promise
	*/
	function promiseAjax(url) {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest()
			xhr.onreadystatechange = () => {
			if (xhr.readyState!==4) return
				const {status, response} = xhr
				// 请求成功, 调用 resolve(value)
				if (status>=200 && status<300) {
					resolve(JSON.parse(response))
				} else { // 请求失败, 调用 reject(reason)
					reject(new Error('请求失败: status: ' + status))
				}
			}
			xhr.open("GET", url)
			xhr.send()
		})
	}
	promiseAjax('https://api.apiopen.top2/getJoke?page=1&count=2&type=video')
		.then(
			data => {
				console.log('显示成功数据', data)
			},
			error => {
				alert(error.message)
			}
		)
</script>
```

### 为什么要用 Promise?

#### 指定回调函数的方式更加灵活

1. 旧的: 必须在启动异步任务前指定
2. promise: 启动异步任务 => 返回 promie 对象 => 给 promise 对象绑定回调函数(甚至可以在异步任务结束后指定/多个)

#### 支持链式调用, 可以解决回调地狱问题\*

1. 什么是回调地狱?

   回调函数嵌套调用, 外部回调函数异步执行的结果是嵌套的回调执行的条件

2. 回调地狱的缺点?

   不便于阅读 不便于异常处理

3. 解决方案?

   promise 链式调用

4. 终极解决方案?

   async/await

```js
<script>
	// 成功的回调函数
	function successCallback(result) {
		console.log("声音文件创建成功: " + result);
	}
	// 失败的回调函数
	function failureCallback(error) {
		console.log("声音文件创建失败: " + error);
	}

	/* 1.1 使用纯回调函数 */
	createAudioFileAsync(audioSettings, successCallback, failureCallback)

	/* 1.2. 使用 Promise */
	const promise = createAudioFileAsync(audioSettings); // 2
	setTimeout(() => {
		promise.then(successCallback, failureCallback);
	}, 3000);

	/*2.1. 回调地狱*/
	doSomething(function(result) {
		doSomethingElse(result, function(newResult) {
			doThirdThing(newResult, function(finalResult) {
				console.log('Got the final result: ' + finalResult)
			}, failureCallback)
		}, failureCallback)
	}, failureCallback)

	/*2.2. 使用 promise 的链式调用解决回调地狱*/
	doSomething().then(function(result) {
		return doSomethingElse(result)
	})
	.then(function(newResult) {
		return doThirdThing(newResult)
	})
	.then(function(finalResult) {
		console.log('Got the final result: ' + finalResult)
	})
	.catch(failureCallback)

	/*2.3. async/await: 回调地狱的终极解决方案*/
	async function request() {
		try {
			const result = await doSomething()
			const newResult = await doSomethingElse(result)
			const finalResult = await doThirdThing(newResult)
			console.log('Got the final result: ' + finalResult)
		} catch (error) {
			failureCallback(error)
		}
	}
</script>
```

### 如何使用 Promise?

#### API

1. Promise 构造函数: Promise (excutor) {}

   (1) executor 函数: 执行器 (resolve, reject) => {}

   (2) resolve 函数: 内部定义成功时我们调用的函数 value => {}

   (3) reject 函数: 内部定义失败时我们调用的函数 reason => {}

   说明: executor 会在 Promise 内部立即同步调用,异步操作在执行器中执行

2. Promise.prototype.then 方法: (onResolved, onRejected) => {}

   (1) onResolved 函数: 成功的回调函数 (value) => {}

   (2) onRejected 函数: 失败的回调函数 (reason) => {}

   说明: 指定用于得到成功 value 的成功回调和用于得到失败 reason 的失败回调 返回一个新的 promise 对象

3. Promise.prototype.catch 方法: (onRejected) => {}

   (1) onRejected 函数: 失败的回调函数 (reason) => {}

   说明: then()的语法糖, 相当于: then(undefined, onRejected)

4. Promise.resolve 方法: (value) => {}

   (1) value: 成功的数据或 promise 对象

   说明: 返回一个成功/失败的 promise 对象

5. Promise.reject 方法: (reason) => {}

   (1) reason: 失败的原因

   说明: 返回一个失败的 promise 对象

6. Promise.all 方法: (promises) => {}

   (1) promises: 包含 n 个 promise 的数组

   说明: 返回一个新的 promise, 只有所有的 promise 都成功才成功, 只要有一个失败了就 直接失败

7. Promise.race 方法: (promises) => {}

   (1) promises: 包含 n 个 promise 的数组

   说明: 返回一个新的 promise, 第一个完成的 promise 的结果状态就是最终的结果状态

#### promise 的几个关键问题

1. 如何改变 promise 的状态?

   (1) resolve(value): 如果当前是 pending 就会变为 resolved

   (2) reject(reason): 如果当前是 pending 就会变为 rejected

   (3) 抛出异常: 如果当前是 pending 就会变为 rejected

2. 一个 promise 指定多个成功/失败回调函数, 都会调用吗?

   当 promise 改变为对应状态时都会调用

3. 改变 promise 状态和指定回调函数谁先谁后?

   (1) 都有可能, 正常情况下是先指定回调再改变状态, 但也可以先改状态再指定回调

   (2) 如何先改状态再指定回调?

   ​ ① 在执行器中直接调用 resolve()/reject()

   ​ ② 延迟更长时间才调用 then()

   (3) 什么时候才能得到数据?

   ​ ① 如果先指定的回调, 那当状态发生改变时, 回调函数就会调用, 得到数据

   ​ ② 如果先改变的状态, 那当指定回调时, 回调函数就会调用, 得到数据

4. promise.then()返回的新 promise 的结果状态由什么决定?

   (1) 简单表达: 由 then()指定的回调函数执行的结果决定

   (2) 详细表达:

   ​ ① 如果抛出异常, 新 promise 变为 rejected, reason 为抛出的异常

   ​ ② 如果返回的是非 promise 的任意值, 新 promise 变为 resolved, value 为返回的值

   ​ ③ 如果返回的是另一个新 promise, 此 promise 的结果就会成为新 promise 的结果

5. promise 如何串连多个操作任务?

   (1) promise 的 then()返回一个新的 promise, 可以开成 then()的链式调用

   (2) 通过 then 的链式调用串连多个同步/异步任务

6. promise 异常传透?

   (1) 当使用 promise 的 then 链式调用时, 可以在最后指定失败的回调,

   (2) 前面任何操作出了异常, 都会传到最后失败的回调中处理

7. 中断 promise 链?

   (1) 当使用 promise 的 then 链式调用时, 在中间中断, 不再调用后面的回调函数

   (2) 办法: 在回调函数中返回一个 pendding 状态的 promise 对象
