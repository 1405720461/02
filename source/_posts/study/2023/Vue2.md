---
title: Vue2
description: Vue2知识整理
mathjax: true
tags:
  - js
  - vue
categories:
  - 前端
abbrlink: f8e09374
date: 2023-04-15 05:20:00
updated: 2023-04-15 05:20:00
---

# Vue

---

### [Vue 渐进式理解](https://blog.csdn.net/wangzunkuan/article/details/80729683)

### [Vue render 函数](https://www.jianshu.com/p/7508d2a114d3)

### [vue diff 算法](https://www.bilibili.com/video/BV1JR4y1R7Ln/?spm_id_from=333.788&vd_source=e754d95b996bf636e1256b88397221dd)

## Vue 核心

### **初识 Vue**

1.想让 Vue 工作,就必须创建一个 Vue 实例,且要传入一个配置对象;

2.root 容器里的代码依然符合 html 规范，只不过混入了一些特殊的 Vue 语法;

3.root 容器里的代码被称为【Vue 模板】;

4.Vue 实例和容器是一一对应的;

5.真实开发中只有一个 Vue 实例，并且会配合着组件一起使用;

6.`{{xxx}}`中的 xxx 要写 js 表达式，且 xxx 可以自动读取到 data 中的所有属性;

7.一旦 data 中的数据发生改变，那么页面中用到该数据的地方也会自动更新;

### **模板语法**

1.插值语法:
功能:用于解析标签体内容。
写法:`{{xxx}}`，xxx 是 js 表达式，且可以直接读取到 data 中的所有属性。

2.指令语涛
功能:用于解析标签（包括:际签属性、标签体内容、绑定事件.....)
举例: v-bind:href="xxx”或简写为:href="xxx"，xxx 同样要写 js 表达式,
且可以直接读取到 data 中的所有属性。
备注: Vue 中有很多的指令，且形式都是:v-????，此处拿 v-bind 举个例子。

---

### 数据绑定

单向数据绑定 (v-bind)

1. 语法：v-bind:href ="xxx" 或简写为 :href

2. 特点：数据只能从 data 流向页面

双向数据绑定 (v-model)

1. 语法：v-mode:value="xxx" 或简写为 v-model="xxx"
2. 特点：数据不仅能从 data 流向页面，还能从页面流向 data

**备注**:

1. 双向绑定一般都应用在表单类元素上(如: input、select 等)

2. v-model :value 可以简写为 v-model，因为 v-model 默认收集的就是 value 值。

---

### el 与 data 的两种写法

1.el 有 2 种写法
(1). new Vue 时候配置 el 属性。
(2). 先创建 Vue 实例，随后再通过 vm.$mount( '#root')指定 el 的值。
2.data 有 2 种写法
(1).对象式 (2).函数式

**3.一个重要的原则:**
由 Vue 管理的函数，一定不要写箭头函数，一旦写了箭头函数，this 就不再是 Vue 实例了。

---

### MVVM 模型

1. M：模型(Model) ：对应 data 中的数据
2. V：视图(View) ：模板
3. VM：视图模型(ViewModel) ： Vue 实例对象

<img src="https://fastly.jsdelivr.net/gh/1405720461/blog_img@main/study/3.webp"  style="zoom:67%;" />

data 中所有的属性,最后都出现在了 vm 身上。
vm 身上所有的属性及 Vue 原型上所有属性，在 Vue 模板中都可以直接使用。

**MVVM 的核心**是 ViewModel 层面 他就像是一个中转站 负责转换 Model 中的数据对象来让数据变得更容易管理和使用，该层向上的与视图进行双向绑定 向下与 Model 层通过接口请求请求进行数据交互，起承上启下作用。View 层展现的不是 Model 的数据，而是 ViewModel 层的数 由 ViewModel 负责与 Model 层交互，这就完全解耦了 View 层和 Model 层，这个解耦是至关重要的，它是前后端分离方案实施的最重要一环。

#### Object.defineProperty 方法

```js
<script>
    let number = 18
    let person = {
        name: '张三',
        sex: '男',
    }

    Object.defineProperty(person, 'age', {
        // value: 18,
        // enumerable: true,   //控制属性是否可以枚举，默认值是false
        // writable: true,     //控制属性是否可以被修改，默认值是false
        // configurable: true   //控制属性是否可以被删除，默认值是false

        //当有人读取person的age属性时，get函数(getter)就会被调用，且返回值就是age的值
        get() {
            return number
        },

        //当有人修改person的age属性时，set函数(setter)就会被调用，且会受到修改的具体值
        set(value) {
            number = value;
        }
    })
</script>
```

#### [vue 双向绑定原理及实现](https://www.cnblogs.com/canfoo/p/6891868.html)\*

---

### 数据代理

https://www.bilibili.com/video/BV1Zy4y1K7SH?p=13&amp;spm_id_from=pageDriver&amp;vd_source=e754d95b996bf636e1256b88397221dd

<img src="https://fastly.jsdelivr.net/gh/1405720461/blog_img@main/study/4.webp"  style="zoom: 50%;" />

1.Vue 中的数据代理:
通过 vm 对象来代理 data 对象中属性的操作(读/写）

2.Vue 中数据代理的好处:
更加方便的操作 data 中的数据

3.基本原理:
通过 object.defineProperty()把 data 对象中所有属性添加到 vm 上.为每一个添加到 vm 上的属性，都指定一个 getter/setter。
在 getter/setter 内部去操作（读/写)data 中对应的属性。

---

### 事件处理

#### 事件的基本使用

1.使用 v-on:xxx 或@xxx 绑定事件，其中 xxx 是事件名;

2.事件的回调需要配置在 methods 对象中，最终会在 vm 上;

3.methods 中配置的函数，不要用箭头函数! 否则 this 就不是 vm 了;

4.methods 中配置的函数，都是被 Vue 所管理的函数，this 的指向是 vm 或 组件实例对象;

5.@click="demo”和@click="demo($event)”效果一致，但后者可以传参;

#### 事件修饰符

1.prevent: 阻止默认事件（常用）;

2.stop: 阻止事件冒泡（常用）;

3.once: 事件只触发一次（常用）;

4.capture: 使用事件的捕获模式;

5.self: 只有 event.target 是当前操作的元素时才触发事件;

6.passive: 事件的默认行为立即执行，无需等待事件回调执行完毕;

#### 键盘事件

1.Vue 中常用的按键别名:

- 回车=> enter

- 删除=> delete(捕获“删除”和“退格”键)
- 退出=> esc
- 空格=> space
- 换行=> tab（特殊，必须配合 keydown 使用）
- 上=> up
- 下=> down
- 左=> left
- 右=> right

  2.Vue 未提供别名的按健，可以使用按健原始的 key 值去绑定，但注意要转为 kebab-case(短横线命名)

  3.系统修饰键（用法特殊）:ctrl、alt、 shift、meta

​ (1).配合 keyup 使用:按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发。

​ (2).配合 keydown 使用:正常触发事件。

4.也可以使用 keyCode 去指定具体的按键（不推荐)

5.Vue.config. keyCodes.自定义键名=健码，可以去定制按键别名

---

### 计算属性与监视

1.定义:要用的属性不存在，要通过已有属性计算得来。

2.原理:底层借助了 object.defineproperty 方法提供的 getter 和 setter.

3.get 函数什么时候执行?
(1).初次读取时会执行一次。
(2).当依赖的数据发生改变时会被再次调用。

4.优势:与 methods 实现相比，内部有缓存机制（复用），效率更高，调试方便。

5.备注:
(1).计算属性最终会出现在 vm 上，直接读取使用即可。
(2).如果计算属性要被修改，那必须写 set 函数去响应修改，且 set 中要引起计算时依赖的数据发生改变。

#### 监视属性 watch

1.当被监视的属性变化时,回调函数自动调用，进行相关操作

2.监视的属性必须存在,才能进行监视 ！！！

3.监视的两种写法:

​ (1).new Vue 时传入 watch 配置

​ (2).通过 vm.$watch 监视

#### 深度监视

​ (1).vue 中的 watch 默认不监测对象内部值的改变（一层）。

​ (2).配置 deep:true 可以监测对象内部值改变（多层）。

备注:

​ (1).Vue 自身可以监测对象内部值的改变，但 Vue 提供的 watch 默认不可以！

​ (2).使用 watch 时根据数据的具体结构，决定是否采用深度监视。

#### computed 和 watch 之间的区别

​ 1.computed 能完成的功能,watch 都可以完成。
​ 2.watch 能完成的功能，computed 不一定能完成，例如: watch 可以进行异步操作。

两个重要的小原则:

​ 1.所被 Vue 管理的函数，最好写成普通函数，这样 this 的指向才是 vm 或 组件实例对象

​ 2.所有不被 Vue 所管理的函数（定时器的回调函数、ajax 的回调函数等、Promise 的回调函数)，最好写成箭头函数,这样 this 的指向才是 vm 或组件实例对象。

---

### 绑定样式

#### class 样式

写法：class=" xxx" xxx 可以是字符串、对象、数组。
字符串写法适用于：类名不确定,要动态获取。
对象写法适用于：要绑定多个样式，个数不确定，名字也不确定。
数组写法适用于：要绑定多个样式，个数确定，名字也确定，但不确定用不用。

#### style 样式

:style="{fontsize: xxx}" 其中 xxx 是动态值。

:style="[a,b]" 其中 a、b 是样式对象。

---

### 条件渲染

#### v-if

写法:
(1).v-if="表达式"

​(2).v-else-if="表达式"

​ (3).v-else="表达式"

适用于: 切换频率较低的场景。

特点: 不展示的 DOM 元素直接被移除。

注意: v-if 可以和: v-else-if、v-else 一起使用，但要求结构不能被“打断”。

#### v-show

写法: v-show="表达式"

适用于: 切换频率较高的场景。

特点: 不展示的 DOM 元素未被移除,仅仅是使用样式隐藏掉

**备注**:使用 v-if 的时，元素可能无法获取到，而使用 v-show 一定可以获取到。

```js
<template v-if="???">???</template>
//template 母版，最终不会渲染到页面上，页面上只会出现中间的内容，template配合v-if使用
```

---

### 列表渲染

#### v-for 指令

1.用于展示列表数据 2.语法: v-for=" (item,index) in xxx" :key="yyy" 3.可遍历: 数组、对象、字符串（用的很少）、指定次数（用的很少)

#### key 作用与原理

面试题: react、vue 中的 key 有什么作用?（key 的内部原理)

1. 虚拟 DOM 中 key 的作用:
   key 是虚拟 DOM 对象的标识，当状态中的数据发生变化时，Vue 会根据【新数据】生成【新的虚拟 DOM】,随后 Vue 进行【新虚拟 DOM】与【旧虚拟 DOM】的差异比较，比较规则如下:

2. 对比规则:
   (1).旧虚拟 DOM 中找到了与新虚拟 DOM 相同的 key:
   若虚拟 DOM 中内容没变，直接使用之前的真实 DOM !
   若虚拟 DOM 中内容变了，则生成新的真实 DOM，随后替换掉页面中之前的真实 DOM。
   (2).旧虚拟 DOM 中未找到与新虚拟 DOM 相同的 key
   创建新的真实 DOM,随后渲染到到页面。

3. 用 index 作为 key 可能会引发的问题:

   1. 若对数据进行: 逆序添加、逆序删除等破坏顺序操作: 会产生没有必要的真实 DOM 更新 ==> 界面效果没问题，但效率低。
   2. 如果结构中还包含输入类的 DOM: 会产生错误 DOM 更新 ==> 界面有问题。

4. 开发中如何选择 key? :
   1. 最好使用每条数据的唯一标识作为 key，比如 id、手机号、身份证号、学号等唯一值。
   2. 如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示,使用 index 作为 key 是没有问题的。

---

### 监测数据

1.vue 会监视 data 中所有层次的数据。

2.如何监测对象中的数据?

​ 通过 setter 实现监视,且要在 new Vue 时就传入要监测的数据。

​ (1).对象中后追加的属性，Vue 默认不做响应式处理

​ (2).如需给后添加的属性做响应式，请使用如下 API:

​ vue.set(target, propertyName/index, value）或

​ vm.$set(target, propertyName/index, value)

3.如何监测数组中的数据?

​ 通过包裹数组更新元素的方法实现,本质就是做了两件事:

​ (1).调用原生对应的方法对数组进行更新。

​ (2).重新解析模板,进而更新页面。

4.在 Vue 修改数组中的某个元素一定要用如下方法:

​ 1.使用这些 API: push()、pop()、shift()、unshift()、splice()、sort()、reverse()

​ 2.Vue.set() 或 vm.$set()

**特别注意**: Vue.set(）和 vm.$set()不能给 vm 或 vm 的根数据对象添加属性！！！

---

### 收集表单数据

若:`<input type="text"/>`, 则 v-model 收集的是 value 值。用户输入的就是 value 值。

若:`<input type="radio"/>`，则 v-model 收集的是 value 值，且要给标签配置 value 值。

若:`<input type="checkbox" />`

​ 1.没有配置 input 的 value 属性，那么收集的就是 checked(勾选 or 未勾选，是布尔值)

​ 2.配置 input 的 value 属性:

​ (1) v-model 的初始值是非数组，那么收集的就是 checked（勾选 or 未勾选，是布尔值)

​ (2) v-model 的初始值是数组，那么收集的的就是 value 组成的数组

**备注**: v-model 的三个修饰符:

​ lazy: 失去焦点再收集数据

​ number: 输入字符串转为有效的数字

​ ​trim: 输入首尾空格过滤

### 内置指令

v-bind : 单向绑定解析表达式，可简写为:xxx

v-model : 双向数据绑定

v-for : 遍历数组/对象/字符串

v-on : 绑定事件监听，可简写为@

v-if : 条件渲染(动态控制节点是否存在)

v-else : 条件渲染（动态控制节点是否存在)

v-show : 条件渲染(动态控制节点是否展示)

**v-text 指令**:

1.作用:向其所在的节点中渲染文本内容。

2.与插值语法的区别:v-text 会替换掉节点中的内容，{{xxx}}则不会。

**v-html 指令**:

1.作用:向指定节点中渲染包含 html 结构的内容。

2.与插值语法的区别:

​ (1).v-html 会替换掉节点中所有的内容，{{xx}}则不会。

​ (2).v-html 可以识别 html 结构。

3.严重注意: v-html 有安全性问题！！！

(1).在网站上动态渲染任意 HTML 是非常危险的，容易导致 XSS 攻击。

(2).一定要在可信的内容上使用 v-html，永不要用在用户提交的内容上!

**v-cloak 指令**(没有值):

1.本质是一个特殊属性。Vue 实例创建完毕并按管容器后，会剧掉 v-cloak 属性。

2.使用 css 配合 v-cloak 可以解决网速慢时页面展示出 {{xxx}} 的问题。

**v-once 指令**:

1.v-once 所在节点在初次动态演染后,就视为静态内容了。

2.以后数据的改变不会引起 v-once 所在结构的更新，可以用于优化性能。

**v-pre 指令**:

1.跳过其所在节点的编译过程

2.可利用它跳过:没有使用指令语法、没有使用插值语法的节点，会加快编译。

---

### 自定义指令

<img src="https://fastly.jsdelivr.net/gh/1405720461/blog_img@main/study/5.webp" style="zoom: 80%;" />

---

### 生命周期

1.又名: 生命周期回调函数、生命周期函数、生命周期钩子。

2.是什么: Vue 在关键时刻帮我们调用的一些特殊名称的函数。

3.生命周期函数的名字不可更改，但函数的具体内容是程序员根据需求编写的。

4.生命周期函数中的 this 指向是 vm 或 组件实例对象。

<img src="https://fastly.jsdelivr.net/gh/1405720461/blog_img@main/study/6.webp" alt="生命周期" style="zoom: 20%;" />

常用的生命周期钩子:

1.**mounte**发送 ajax 请求、启动定时器、绑定自定义事件、订阅消息等【初始化操作】。

2.**beforeDestroy**: 清除定时器、解绑自定义事件、取消订阅消息等【收尾工作】。

关于销毁 Vue 实例

1.销毁后借助 Vue 开发者工具看不到任何信息。

2.销毁后自定义事件会失效，但原生 DOM 事件依然有效。

3.一般不会再 beforeDestroy 操作数据，因为即便操作数据，也不会再触发更新流程了。

## Vue 组件化编程

Vue 中使用组件的三大步骤:

​ 1. 定义组件(创建组件）

​ 2. 注册组件

​ 3. 使用组件(写组件标签)

一、如何定义一个组件?

​ 使用 Vue.extend(options)创建，其中 options 和 new Vue(options)时传入的那个 options 几乎一样，但也有点区别：

​ 区别如下:

​ 1.el 不要写，为什么?—最终所有的组件都要经过一个 vm 的管理，由 vm 中的 el 决定服务哪个容器。

​ 2.data 必须写成函数，为什么?——避免组件被复用时，数据存在引用关系。

​ **备注**: 使用 template 可以配置组件结构。

二、如何注册组件?

1.局部注册: 靠 new Vue 的时候传入 components 选项

2.全局注册: 靠 Vue.component('组件名',组件)

三、编写组件标签:
`<school></school>`

### 非单文件组件

几个注意点:

1.关于组件名:
一个单词组成:

​ 第一种写法(首字母小写): school

​ 第二种写法(首字母大写): School

​ 多个单词组成:

​ 第一种写法(kebab-case 命名):my-school

​ 第二种写法(Camelcase 命名):MySchool（需要 Vue 脚手架支持)

​ **备注:**
​ (1).组件名尽可能回避 HTML 中已有的元素名称，例如: h2、H2 都不行。

​ (2).可以使用 name 配置项指定组件在开发者工具中呈现的名字-

2.关于组件标签:

​ 第一种写法:`<school></school>`

​ 第二种写法: `<school/>`

​ 备注:不用使用脚手架时,`<school/>`会导致后续组件不能渲染。

3.一个简写方式:

​ const school = Vue.extend(options）可简写为: const school = options

#### VueComponent

1. school 组件本质是一个名为 VueComponent 的构造函数，且不是程序员定义的，是 Vue.extend 生成的.

2. 我们只需要写`<school/>`或`<school></school>`，Vue 解析时会帮我们创建 school 组件的实例对象，即 vue 帮我们执行的

   new VueComponent(options)

3. 特别注意:每次调用 Vue.extend，返回的都是一个全新的 VueComponent ！！！

4. 关于 this 指向:

   (1).组件配置中:

   ​ data 函数、methods 中的函数、watch 中的函数、computed 中的函数它们的 this 均是【VueComponent 实例对象】

   (2).new Vue() 配置中:

   ​ data 函数、methods 中的函数、watch 中的函数、computed 中的函数它们的 this 均是【Vue 实例对象】.

5. VueComponent 的实例对象，以后简称 vc（也可称之为:组件实例对象）。

   Vue 的实例对象,以后简称 vm.

---

#### \*内置关系

一个重要的内置关系:

​ `VueComponent.prototype.__proto__ === Vue.prototype`

为什么要有这个关系:

​ 让组件实例对象(vc）可以访问到 Vue 原型上的属性、方法。

> **实例的隐式原型属性永远指向自己缔造者的原型对象。**

### 单文件组件

[单文件组件](https://www.bilibili.com/video/BV1Zy4y1K7SH/?p=60)

## 使用 Vue 脚手架

### 初始化脚手架

**创建脚手架**

https://www.bilibili.com/video/BV1Zy4y1K7SH?p=61&amp;vd_source=e754d95b996bf636e1256b88397221dd

#### 脚手架文件结构

```
├── node_modules
├── public
│ ├── favicon.ico: 页签图标
│ └── index.html: 主页面
├── src
│ ├── assets: 存放静态资源
│ │ └── logo.png
│ │── component: 存放组件
│ │ └── HelloWorld.vue
│ │── App.vue: 汇总所有组件
│ │── main.js: 入口文件
├── .gitignore: git 版本管制忽略的配置
├── babel.config.js: babel 的配置文件
├── package.json: 应用包配置文件
├── README.md: 应用描述文件
├── package-lock.json：包版本控制文件
```

#### 关于不同版本的 Vue:

1.vue.js vue.runtime.xxx.js 的区别:

​ (1).vue.js 是完整版的 Vue，包含: 核心功能+模板解析器。
​ (2).vue.runtime.xxx,js 是运行版的 Vue， 只包含: 核心功能; 没有模板解析器。

2.因为 vue.runtime.xxx.js 没有模板解析器，所以不能使用 template 配置项，需要使用 render 函数接收到的 createElement 函数去指定具体内容。

#### vue.config.js 配置文件

使用`vue inspect > output.js`可以查看到 Vue 脚手架的默认配置。

使用 vue.config.js 可以对脚手架进行个性化定制，详情见: https://cli.vuejs.org/zh

### ref 与 props

#### ref 属性

1.被用来给元素或子组件注册引用信息（id 的替代者)

2.应用在 htm1 标签上获取的是真实 DOM 元素，应用在组件标签上是组件实例对象(vc)

3.使用方式:

​ 打标识: `<h1 ref="xxx">.....</h1>`或`<School ref="xxx"></School>`

​ 获取: this.$refs.xxx

#### 配置项 props

<img src="https://fastly.jsdelivr.net/gh/1405720461/blog_img@main/study/7.webp" style="zoom: 80%;" />

### 父子组件间的三种通信方式\*

#### 通过 props 实现通信

子组件的 props 选项能够接收来自父组件的数据。props 是单项绑定的

##### props 静态传递

子组件通过 props 选项来声明一个自定义的属性，然后父组件就可以再嵌套标签的时候，通过这个属性往子组件传递数据了！

**father_props.vue**

```js
<template>
  <div>
    <h1>我是父组件！</h1>
    <child message="我是子组件一！"></child>  <!-- 通过自定义属性传递数据 -->
  </div>
</template>

<script>
import Child from '../components/child_props.vue'
export default {
  components: {
    Child
  }
}
</script>

<style lang="stylus" scoped>

</style>
```

**child_props.vue**

```js
<template>
  <h3>{{ message }}</h3>
</template>

<script>
export default {
  props: ['message'] // 声明一个自定义的属性
}
</script>

<style lang="stylus" scoped>

</style>
```

---

##### props 动态传递

更多的时候我们需要传送一个动态的数据。这时候就可以用==v-bind(:)==实现。通过 v-bind 绑定 props 的自定义的属性，传递过去的就不是静态的字符串了，它可以是一个表达式，布尔值，对象等等任何类型的值

**father_props.vue**

```js
<template>
  <div>
    <h1>我是父组件！</h1>
    <child message="我是子组件一！"></child>

    <!-- 这是一个 JavaScript 表达式而不是一个字符串 -->
    <child v-bind:message="a+b"></child>

    <!-- 用一个变量进行动态赋值 -->
    <child v-bind:message="msg"></child>
  </div>
</template>

<script>
import Child from '../components/child_props.vue'
export default {
  components: {
    Child
  },
  data () {
    return {
      a: '我是子组件二！',
      b: 41,
      msg: '我是子组件三！' + Math.random()
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>
```

---

**child_props.vue 子组件不变**

#### 通过$ref 实现通信

对于 ref 官方的解释是：ref 是被用来给元素或子组件注册引用信息的。引用信息将会注册在父组件的$refs 对象上。

props 是父组件给子组件信息，那么，$ref 就是子组件给父组件信息。

简单来说，父组件可以通过$ref 来调用子组件的信息，包括 data 和 methods

**father_ref.vue**

```js
<template>
  <div>
    <h1>我是父组件！</h1>
    <child ref="msg"></child>
  </div>
</template>

<script>
import Child from '../components/child_ref.vue'
export default {
  components: {
    Child
  },
  mounted: function () {
    console.log(this.$refs.msg)
    this.$refs.msg.getMessage('我是子组件一！')
  }
}
</script>

<style lang="stylus" scoped>

</style>
```

**child_ref.vue**

```js
<template>
  <h3>{{ message }}</h3>
</template>

<script>
export default {
  data () {
    return {
      message: ''
    }
  },
  methods: {
    getMessage (m) {
      this.message = m
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
```

#### props 和$ref 的对比

1.前者着重于数据的传递，它并不能调用子组件里的属性和方法

2.后者着重于索引，主要用来调用子组件里的属性和方法。特别地，ref 用在 dom 元素的时候，能起到选择器的作用，这个功能比作为索引更加重要

---

#### $emit 实现通信

上面两种方法主要都是父组件为主，给子组件信息，调用子组件的信息。
那么，第三种方法就是以子组件为主。
$emit 绑定一个自定义事件 event，当这个语句被执行的时候，就会将参数 arg 传递给父组件，父组件通过@event 监听并接收参数。

**father_emit.vue**

```js
<template>
  <div>
    <h1>{{ title }}</h1>
    <child @getMessage="showMsg"></child>
  </div>
</template>
<script>
import Child from '../components/child_emit.vue'
export default {
  components: {
    Child
  },
  data () {
    return {
      title: ''
    }
  },
  methods: {
    showMsg (title) {
      this.title = title
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
```

**child_emit.vue**

```js
<template>
  <h3>我是子组件！</h3>
</template>

<script>
export default {
  mounted: function () {
    this.$emit('getMessage', '我是父组件！')
  }
}
</script>

<style lang="stylus" scoped>

</style>
```

#### 三种方法区别

1.对于 props，就是子组件设置一个 props，父组件给这个 props 赋值就可以通信，动态赋值可以用 v-bind（是主要的通信方式）

2.对于 ref，给子组件一个 ref，我们就可以通过这个`this.ref`，来调用子组件的属性和方法，这主要是用在 dom 树中，起到选择器的作用

3.对于$emit，子组件绑定一个方法和参数，父组件可以绑定子组件这个绑定方法的监听，获得子组件返回的参数。第三种方法少见一些。有些逆思维了。 目前不懂它存在的意义。

### 混入 mixin

**解释**

将组件的公共逻辑或者配置提取出来，哪个组件需要用到时，直接将提取的这部分混入到组件内部即可。这样既可以减少代码冗余度，也可以让后期维护起来更加容易。

这里需要注意的是：提取的是逻辑或配置，而不是 HTML 代码和 CSS 代码。换一种想法，mixin 就是组件中的组件，Vue 组件化让我们的代码复用性更高，那么组件与组件之间还有重复部分，我们使用 Mixin 在抽离一遍。

#### Mixin 和 Vuex 的区别？

上面一点说 Mixin 就是一个抽离公共部分的作用。在 Vue 中，Vuex 状态管理似乎也是做的这一件事，它也是将组件之间可能共享的数据抽离出来。两者看似一样，实则还是有细微的区别，区别如下：

- Vuex 公共状态管理，如果在一个组件中更改了 Vuex 中的某个数据，那么其它所有引用了 Vuex 中该数据的组件也会跟着变化。
- Mixin 中的数据和方法都是独立的，组件之间使用后是互相不影响的。

**功能**:可以把个组件共用的配置提取成一个混入对象使用方式:
第一步定义混合,例如:

```js
{
	data(){...},
	methods:{....}
}
```

第二步使用混入,例如:

​ (1).全局混入: Vue.mixin(xxx)

​ (2).局部混入: mixins: ['xxx']

### 插件

功能:用于增强 Vue
本质:包含 install 方法的一个对象，install 的第一个参数是 Vue，第二个以后的参数是插件使用者传递的数据。

定义插件:

```js
对象.install = function (Vue，options) {
	//1.添加全局过滤器
	vue.filter(....)
	//2.添加全局指令
	vue.directive(.. . .)
	//3.配置全局混入(合)
	Vue.mixin(... .)
	//4.添加实例方法
	Vue.prototype.$myMethod = function (){...}
	Vue.prototype.$myProperty = xxxx
}
```

**使用插件**: `Vue.use()`

#### scoped 样式

作用: 让样式在局部生效，防止冲突。

写法: `<style scoped>`

### TodoList 案例总结

1.组件化编码流程:

​ (1).拆分静态组件:组件要按照功能点拆分，命名不要与 html 元素冲突。

​ (2).实现动态组件:考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用:

&nbsp;&nbsp;&nbsp;1).一个组件在用: 放在组件自身即可。

&nbsp;&nbsp;&nbsp;2).一些组件在用: 放在他们共同的父组件上(**状态提升**)。

​ (3).实现交互:从绑定事件开始。

2.props 适用于:

​ (1).父组件==>子组件 通信

​ (2).子组件==>父组件 通信(要求父先给子一个函数)

3.使用 v-model 时要切记: **v-model 绑定的值不能是 props 传过来的值，因为 props 是不可以修改的！**

4.props 传过来的若是对象类型的值，修改对象中的属性时 Vue 不会报错，但不推荐这样做。

### webStorage

1.存储内容太小一般支持 5MB 左右(不同浏览器可能还不一样)

2.浏览器端通过 Window.sessionStorage 和 Window.localStorage 属性来实现本地存储机制。

3.相关 APl:
&nbsp;&nbsp;1.`xxxxxStorage.setItem('key', 'value');`
&nbsp;&nbsp;该方法接受一个键和值作为参数，会把键值对添加到存储中，如果键名存在，则更新其对应的值。
&nbsp;&nbsp;2.`xxxxxStorage-getItem('person');`
&nbsp;&nbsp;该方法接受一个键名作为参数，返回键名对应的值。
&nbsp;&nbsp;3.`xxxxxStorage.removeItem('key');`
&nbsp;&nbsp;该方法接受一个键名作为参数，并把该键名从存储中删除。
&nbsp;&nbsp;4.`xxxxxStorage.clear()`
&nbsp;&nbsp;该方法会清空存储中的所有数据。

4.**备注**:

​ 1.SessionStorage 存储的内容会随着浏览器窗口关闭而消失。

​ 2.LocalStorage 存储的内容，需要手动清除才会消失。

​ 3.`xxxxxStorage.getItem(xxx)` 如果 xxx 对应的 value 获取不到，那么 getltem 的返回值是 null

​ 4.`JSON.parse(nul1)`的结果依然是 null。

### 组件自定义事件

1.子种组件间通信的方式，适用于:**子组件**===>**父组件**

⒉.使用场景: A 是父组件，B 是子组件，B 想给 A 传数据，那么就要在 A 中给 B 绑定自定义事件（**事件的回调在 A 中**)。

3.绑定自定义事件:

​ (1).第一种方式，在父组件中: `<Demo @atguigu="test"/>`或`<Demo v-on:atguigu="test"/>`
​ (2).第二种方式，在父组件中:

```vue
<Demo ref="demo" />
...... mounted(){ this.$refs.xxx.$on('atguigu',this.test) }
```

​ (3).若想让自定义事件只能触发一次，可以使用`once`修饰符，或`$once`方法。

4.触发自定义事件: `this.$emit('atguigu',数据)`

5.解绑自定义事件`this.$off('atguigu')`

6.组件上也可以绑定原生 DOM 事件，需要使用`native`修饰符。

7.**注意**:通过`this.refs.xxx.$on('atguigu' ,回调)`绑定自定义事件时，回调**要么配置在 methods 中，要么用箭头函数**，否则 this 指向会出问题！！！

### 全局事件总线

1.—种组件间通信的方式，适用于**任意组件间通信**。

2.安装全局事件总线:

```js
new Vue({
	......
	beforeCreate() {
		Vue.prototype.$bus = this / /安装全局事件总线，$bus就是当前应用的vm
	},
	......
})
```

3.使用事件总线 :

​ (1).接收数据: A 组件想接收数据，则在 A 组件中给$bus 绑定自定义事件，事件的**回调留在 A 组件自身**。

```js
methods(){
	demo(data){......}
},
......
mounted() {
	this.$bus.$on('xxxx',this.demo)
}
```

​ (2).提供数据:`this.$bus.$emit( 'xxxx',数据)`

4.最好在 beforeDestroy 钩子中，用$off 去解绑**当前组件所用到的事件\***。

### 消息订阅与发布（pubsub）

1.—种组件间通信的方式，适用于**任意组件间通信**。

2.使用步骤:

​ 1.安装 pubsub: `npm i pubsub-js`
​ 2.引入: `import pubsub from 'pubsub-js'`
​ 3.接收数据:A 组件想接收数据，则在 A 组件中订阅消息，订阅的**回调留在 A 组件自身**。

```js
methods(){
	demo(data){......}
}
......
mounted() {
	this.pid = pubsub.subscribe('xxx',this.demo)//订阅消息
}
```

4.提供数据:`pubsub.publish('xxx',数据)`

5.最好在 beforeDestroy 钩子中，用`PubSub.unsubscribe(pid)`去<span style="color: red">取消订阅。</span>

#### nextTick（生命周期钩子）

1.语法: `this.$nextTick(回调函数)`

2.作用: 在下一次 DOM 更新结束后执行其指定的回调。

3.什么时候用: 当改变数据后，要基于更新后的新 DOM 进行某些操作时，要在 nextTick 所指定的回调函数中执行。

[vue.nextTick()方法的使用详解（简单明了）](https://blog.csdn.net/zhouzuoluo/article/details/84752280)

### 过渡与动画

1.作用: 在插入、更新或移除 DOM 元素时，在合适的时候给元素添加样式类名。

2.图示:
<img src="https://fastly.jsdelivr.net/gh/1405720461/blog_img@main/study/9.webp" /> 3.写法:

​ 1.准备好样式:

​ (1).元素进入的样式:

​ &nbsp;​&nbsp;1.v-enter: 进入的起点

​ ​ &nbsp;​&nbsp;2.v-enter-active: 进入过程中

​ &nbsp;​&nbsp;3.v-enter-to: 进入的终点

​ (2).元素离开的样式:

​ ​ &nbsp;​&nbsp;1.v-leave: 离开的起点

​ ​ &nbsp;​&nbsp;2.v-leave-active: 离开过程中

​ ​ &nbsp;​&nbsp;3.v-leave-to: 离开的终点

​ 2.使用`<transition>`包裹要过度的元素，并配置 name 属性:

```html
<transition name="hello">
  <h1 v-show="isShow">你好啊!</h1>
</transition>
```

​ 3.**备注**: 若有多个元素需要过度，则需要使用:`<transition-group>`，且每个元素都要指定 key 值。

## Vue 中的 ajax

### vue 脚手架配置代理(开发环境 Ajax 跨域问题)

**方法一**

在 vue.config.js 中添加如下配置:

```js
devServer: {
  proxy: "http://localhost:5000";
}
```

说明:

​ 1.优点: 配置简单，请求资源时直接发给前端（8080）即可。

​ 2.缺点: 不能配置多个代理，不能灵活的控制请求是否走代理。

​ 3.工作方式: 若按照上述配置代理，当请求了前端不存在的资源时，那么该请求会转发给服务器（优先匹配前端资源)

**方法二**

编写 vue.config.js 配置具体代理规则:

```js
module.exports = {
  devServer: {
    proxy: {
      "/api1": {
        //匹配所有以'/api'开头的请求路径
        target: "http://localhost:5000", //代理目标的基础路径
        changeOrigin: true,
        pathRewrite: { "^/api1": "" },
      },
      "/api2": {
        //匹配所有以'/api'开头的请求路径
        target: "http://localhost: 5001", // 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: { "^/api2": "" },
      },
    },
  },
};
/*
	changeOrigin设置为true时，服务器收到的请求头中的host为: localhost: 5000
	changeOrigin设置为false时，服务器收到的请求头中的host为: localhost:8080
	changeOrigin默认值为true
*/
```

说明:

​ 1.优点: 可以配置多个代理，且可以灵活的控制请求是否走代理。

​ 2.缺点: 配置略微繁琐，请求资源时必须加前缀。

### slot 插槽

1.作用: 让父组件可以向子组件指定位置插入 html 结构，也是一种组件间通信的方式，适用于**父组件===>子组件**。

2.分类: 默认插槽、具名插槽、作用域插槽

3.使用方式:

​ (1).默认插槽:

```vue
父组件中:
<Category>
		<div>html结构1</div>
	</Category>

子组件中:
<template>
  <div>
    <!--定义插槽-->
    <slot>插槽默认内容...</slot>
  </div>
</template>
```

​

​ (2).具名插槽:

```vue
父组件中:
<Category>
		<template slot="center">
			<div>html结构1</div>
		</template>
		
		<template v-slot:footer>
			<div>html结构2</div>
		</template>
	</Category>

子组件中:
<template>
  <div>
    <!--定义插槽-->
    <slot name="center">插槽默认内容...</slot>
    <slot name="footer">插槽默认内容...</slot>
  </div>
</template>
```

​ (3).作用域插槽:

​ 1).理解: 数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定。(games 数据在 Category 组件中，但使用数据所遍历出来的结构由 App 组件决定）

​ 2).具体编码:

```vue
父组件中:
<Category>
		<template scope="scopeData">
			<!--生成的是ul列表-->
			<ul>
				<li v-for="g in scopeData.games" : key="g">{{g}}</li>
			</ul>
		</template>
	</Category>

<Category>
		<template slot-scope="scopeData">
			<!--生成的是h4标题-->
			<h4 v-for="g in scopeData.games" :key="g">{{g}}</h4>
		</template>
	</Category>

子组件中:
<template>
  <div>
    <slot :games="games"></slot>
  </div>
</template>
<script>
export default {
  name: "Category",
  props: ["title"],
  //数据在子组件自身
  data() {
    return {
      games: ["红色警戒", "穿越火线", "英雄联盟", "超级玛丽"],
    };
  },
};
</script>
```

## vuex

### 概念

专门在 Vue 中实现集中式状态（数据）管理的一个 Vue 插件，对 vue 应 用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方

式，且适用于任意组件间通信。

**为什么要使用 Vuex**

我们知道组件之间是独立存在的 组件之间要想实现通信 目前只有 props 选项 ，中大型项目时 面对一大堆组件之间的通信，与逻辑代码 将组件之间的共享数据给拿出来 在一定的规则下管理这些数据

**什么时候使用 Vuex？**

1. 多个组件依赖于同一状态
2. 来自不同组件的行为需要变更同一状态

#### vuex 工作原理图

<img src="https://fastly.jsdelivr.net/gh/1405720461/blog_img@main/study/8.webp" alt="vuex" style="zoom: 33%;" />

- **视图（View）**，以声明方式将**状态**映射到视图；
- **操作（Actions）**，响应在**视图**上的用户输入导致的状态变化
- **状态（State）**，驱动应用的数据源

### 搭建 vuex 环境(store)

1.创建文件:`src/store/index.js`

```js
//引入vue核心库
import Vue from "vue";
//引入Vuex
import Vuex from "vuex";
//应用vuex插件
Vue.use(Vuex);

//准备actions对象——响应组件中用户的动作
const actions = {};
//准备mutations对象——修改state中的数据
const mutations = {};
//准备state对象——保存具体的数据
const state = {};

//创建并暴露store
export default new Vuex.Store({
  actions,
  mutations,
  state,
});
```

2.在`main.js`中创建 vm 时传入`store`配置项

```js
......
//引入store
import store from './store'
......

//创建vm
new Vue({
	el:'#app',
	render: h => h(App)，
	store
})
```

### 基本使用

1. 初始化数据、配置`actions` 、配置`mutations`，操作文件`store.js`

```js
//引入vue核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//引用vuex
Vue.use(Vuex)

const actions = {
	//响应组件中加的动作
    jia(context,value){
		//console.log('actions中的jia被调用了',miniStore ,value)
        context.commit('JIA',value)
	}，
}

const mutations = {
	//执行加
	JIA(state,value){
		//console.log('mutations中的JIA被调用了' ,state,value)
        state.sum += value
	)
}

//初始化数据
const state = {
	sum:0
}

//创建并暴露store
export default new Vuex.Store({
	actions,
	mutations
    state,
})
```

2. 组件中读取 vuex 中的数据:`$store.state.sum`

3. 组件中修改 vuex 中的数据:`$store.dispatch('action中的方法名',数据)`或`$store.commit('mutations中的方法名',数据)`

> **备注**:若没有网络请求或其他业务逻辑，组件中也可以越过 actions，即不写`dispatch`，直接编写`commit`

### getters 的使用

1. 概念: 当 state 中的数据需要经过加正后再使用时，可以使用 getters 加工。

2. 在`store.js `中追加`getters`配置

```js
......
const getters = {
	bigSum(state){
		return state.sum * 10
	}
}

//创建并暴露store
export default new Vuex.Store({
	......
    getters
})
```

3. 组件中读取数据:`$store.getters.bigSum`

### 四个 map 方法的使用

1.**mapState 方法**: 用于帮助我们映射`state`中的数据为计算属性

```js
computed: {
	//借助mapState生成计算属性: sum、school、subject（对象写法)
	...mapState({sum:'sum',school:'school',subject:'subject'})，

    //借助mapState生成计算属性: sum、school、subject（数组写法)
	...mapState(['sum','school','subject'])，
}
```

2.**mapGetters 方法**: 用于帮助我们映射`getters`中的数据为计算属性

```js
computed: {
	//借助mapGetters生成计算属性: bigSum(对象写法)
	...mapGetters({bigSum:'bigSum'}),

	//借助mapGetters生成计算属性: bigSum(数组写法)
	...mapGetters(['bigSum'])
}
```

3.**mapActions 方法**: 用于帮助我们生成与`actions`对话的方法，即:包含`$store.dispatch(xx)`的函数

```js
methods:{
	//靠mapActions生成: increment0dd、 incrementWait（对象形式)
	...mapActions({incrementOdd:'jia0dd',incrementwait:'jiawait'})
	//靠mapActions生成: incrementOdd、incrementwait（数组形式)
	...mapActions(['jia0dd','jiawait'])
}
```

4.**mapMutations 方法**:用于帮助我们生成与`mutations`对话的方法，即:包含 `$store.commit(xx)`的函数

```js
methods:{
	//靠mapActions生成: increment、decrement（对象形式)
    ...mapMutations({increment:'JIA',decrement:'JIAN'}),

    //靠mapMutations生成:JIA、JIAN（对象形式)
	...mapMutations(['JIA','JIAN'])，
}
```

### 模块化+命名空间\*

1.目的: 让代码更好维护，让多种数据分类更加明确。

2.修改`store.js`

```js
const countAbout = {
	namespaced:true,//开启命名空间
    state:{ x:1 },
	mutations:{ ... },
    actions: { ... }，
    getters: {
		bigSum(state){
			return state.sum*10
        }
	}
}

const personAbout = {
	namespaced:true,//开启命名空间
    state:{ ... },
	mutations: { ... },
    actions: { ... }
}

const store = new Vuex.Store({
	modules: {
		countAbout,
        personAbout
    }
})
```

3.开启命名空间后，组件中读取 state 数据:

```js
//方式一:自己直接读取
this.$store.state.personAbout.list
//方式二:借助mapState读取:
...mapState('countAbout',['sum','school','subject'])，
```

4.开启命名空间后，组件中读取 getters 数据:

```js
//方式一:自己直接读取
this.$store.getters['personAbout/firstPersonName']
//方式二:借助mapGetters读取;
...mapGetters('countAbout', ['bigSum'])
```

5.开启命名空间后，组件中调用 dispatch

```js
//方式一:自己直接dispatch
this.$store.dispatch('personAbout/addPersonWang', person)
//方式二，借助mapActions:
...mapActions('countAbout',{incrementOdd:'jiaOdd', incrementwait:'jiawait'})
```

6.开启命名空间后，组件中调用 commit

```js
//方式一:自己直接commit
this.$store.commit('personAbout/ADD_PERSON' ,person)
//方式二:借助mapMutations:
...mapMutations('countAbout',{increment:'JIA',decrement:'JIAN'}),
```

### vuex 核心概念和 API

各个类型的 API 各司其职，mutation 只管存，你给我（dispatch）我就存；action 只管中间处理，处理完我就给你，你怎么存我不管；Getter 我只管取，我不改的。action 放在了 methods 里面，说明我们应该把它当成函数来用（讲道理，钩子函数也应该可以的） mutation 是写在 store 里面的，这说明，它就是个半成品，中间量，我们不应该在外面去操作它。getter 写在了 computed 里面，这说明虽然 getter 我们写的是函数，但是我们应该把它当成计算属性来用。

#### state

1.vuex 管理的状态对象

2.是**Vuex**中的唯一数据源

3.只能通过 mutation 修改

4.示例代码

```js
const state = {
	xxx.initValue
}
```

#### actions

1.值为一个对象，包含多个响应用户动作的回调函数

2.通过 `commit()`来触发` mutation` 中函数的调用, 间接更新 state

3.如何触发 actions 中的回调？

​ 在组件中使用: `$store.dispatch('对应的 action 回调名') `触发

4.可以包含异步代码（定时器, ajax 等等）

5.示例代码

```js
const actions = {
  zzz({ commit, state }, data1) {
    commit("yyy", { data1 });
  },
};
```

#### mutations

1.值是一个对象，包含多个直接更新 state 的方法

2.谁能调用 mutations 中的方法?如何调用?

​ 在 action 中使用: `commit('对应的 mutations 方法名')`触发

3.mutations 中方法的特点: 不能写异步代码、只能单纯的操作 state

4.示例代码:

```js
const mutations = {
	yyy (state，{data1}) {
	//更新state的某个属性
	}
}
```

#### modules

1.包含多个 module

2.一个 module 是一个 store 的配置对象

3.与一个组件（包含有共享数据）对应

#### model\*

[Module | Vuex (vuejs.org)](https://vuex.vuejs.org/zh/guide/modules.html)

https://www.jianshu.com/p/a0c11ae01991

## vue-router

### 相关理解

#### vue-router 的理解

vue 的一个插件库，专门用来实现 SPA 应用

#### 对 SPA 应用的理解

1. 单页 Web 应用（single page web application，SPA）。
2. 整个应用只有**一个完整的页面**。
3. 点击页面中的导航链接**不会刷新**页面，只会做页面的**局部更新**。
4. 数据需要通过 ajax 请求获取

### 基本路由

#### 路由的理解

1. 什么是路由?

   1. 一个路由就是 ─ 组映射关系(key - value)
   2. key 为路径, value 可能是 function 或 component

2. 路由分类

3. 后端路由:

   1. 理解: value 是 function,用于处理客户端提交的请求。

   2. 工作过程: 服务器接收到一个请求时,根据**请求路径**找到匹配的**函数**来处理请求,返回响应数据。

4. 前端路由:

   1. 理解: value 是 component，用于展示页面内容。

   2. 工作过程: 当浏览器的路径改变时,对应的组件就会显示。

#### 基本使用

1.安装 vue-router，命令:`npm i vue-router` 如果是 vue2 的话,命令后面加@3

2.应用插件:`Vue.use(VueRouter)`

3.编写 router 配置项:

```js
//引入VueRouter
import VueRouter from "vue-router";
//引入Luyou组件
import About from "../components/About";
import Home from "../ components /Home";

//创建router实例对象，去管理一组一组的路由规则
const router = new VueRouter({
  routes: [
    {
      path: "/about",
      component: About,
    },
    {
      path: "/home",
      component: Home,
    },
  ],
});

//暴露router
export default router;
```

4.实现切换(active-class 可配置高亮样式)

```js
<router-link active-class="active" to="/about">
  About
</router-link>
```

5.指定展示位置

```js
<router-view></router-view>
```

#### 几个注意点

1.路由组件通常存放在`pages`文件夹，一般组件通常存放在`components`文件夹。

2.通过切换，“隐藏"了的路由组件，默认是被销毁掉的，需要的时候再去挂载。

3.每个组件都有自己的`$route`属性，里面存储着自己的路由信息。

4.整个应用只有一个 router，可以通过组件的`$router`属性获取到。

### 嵌套路由(多级路由)

1.配置路由规则，使用 children 配置项:

```js
routes: [
  {
    path: "/about",
    component: About,
  },
  {
    path: "/home",
    component: Home,
    children: [
      //通过children配置子级路由
      {
        path: "news", //此处一定不要写:/news
        component: News,
      },
      {
        path: "message", //此处一定不要写:/message
        component: Message,
      },
    ],
  },
];
```

2.跳转（要写完整路径)∶

```js
<router-link to="/home/news">News</router-link>
```

### 路由的 query 参数

1.传递参数

```js
<! --跳转并携带query参数，to的字符串写法-->
<router-link :to="/home/message/detail?id=666&title=你好">跳转</router-link>

<!--跳转并携带query参数，to的对象写法-->
<router-link
	:to="{
		path:"/home/message/detail',
		query:{
			id:666,
			title: '你好'
        }
	}"
>跳转</router-link>
```

2.接收参数:

```js
$route.query.id;
$route.query.title;
```

### 命名路由

1.作用: 可以简化路由的跳转。

2.如何使用

​ 1.给路由命名:

```js
{
	path:'/demo',
    component:Demo,
        children: [
			{
				path:'test',
                component:Test,
                children: [
					{
						name:'hello’//给路由命名
                        path:'welcome',
						component:Hello,
					}
				]
			}
		]
}
```

2.简化跳转:

```js
<!--简化前,需要写完整的路径-->
<router-link to='/demo/test/welcome'>跳转</router-link>

<!--简化后，直接通过名字跳转-->
<router-link :to="{name:'hello'}">跳转</router-link>

<!--简化写法配合传递参数-->
<router-link
	:to="{
		name : "hello',
		query:{
			id :666,
			title:'你好'
        }
	}"
>跳转</router-link>
```

### 路由的 params 参数

1.配置路由，声明接收 params 参数

```js
{
	path:'/home',
	component:Home,
	children:[
		{
			path:'news',
			component: News
		},
		{
			component:Message,
			children:[
				{
					name:'xiangqing',
					path:'detail/:id/:title',//使用占位符声明接收params参数
					component: Detail
				}
			]
		}
	]
}
```

2.传递参数

```js
<!--跳转并携带params参数，to的字符串写法-->
<router-link :to="/home/message/detail/666/你好">跳转</router-link>

<!--跳转并携带params参数，to的对象写法-->
<router-link
	:to="{
		name:'xiangqing',
		params:{
			id:666,
			title:"你好"
		}
	}”
>跳转</router-link>
```

> 特别注意: 路由携带 params 参数时，若使用 to 的对象写法，则不能使用 path 配置项，必须使用 name 配置!

3.接收参数:

```js
$route.params.id;
$route.params.title;
```

### 路由的 props 配置

作用: 让路由组件更方便的收到参数

```js
{
	name:'xiangqing',
	path:'detail/:id',
	component:Detail,
	//第一种写法: props值为对象，该对象中所有的key-value的组合最终都会通过props传给Detail组件
	//props:{a:900}

	//第二种写法: props值为布尔值，布尔值为true，则把路由收到的所有params参数通过props传给Detail组件
	//props:true

	//第三种写法:props值为函数，该函数返回的对象中每一组key-value都会通过props传给Detail组件
	props(route){
		return {
			id:route.query.id,
			title:route.query.title
		}
	}
}
```

#### [vue 路由传参的三种基本方式](https://www.jianshu.com/p/d276dcde6656)

### 路由传参相关面试题

**如何指定 params 参数可传可不传?**
如果路由要求传递 params 参数，但是你就不传递 params 参数，发现一件事情，URL 会有问题的
如何指定 params 参数可以传递、或者不传递，在配置路由的时候，在占位的后面加上一个问号【params 可以传递或者不传递】

**params 参数可以传递也可以不传递，但是如果传递是空串，如何解决?**

使用 undefined 解快: params 参数可以传递、不传递（空的字符串)

`this.$router.push({name:'search' ,params:{ keyword : " "||undefined} }),`

**路由组件可不可以传递 props 数据？**

可以，三种写法，在路由配置中，组件用 props 接收

```js
//布尔值写法:params
//props:true,		只能传params参数
//对象写法:额外的给路由组件传递一些props
//props:{a: 1,b:2},
//函数写法:可以params参数、query参数，通过props传递给路由组件
props:($route)=>{
	return·{keyword:$route.params.keyword ,k:$route.query.k};
}
```

### `<router-link>`的 replace 属性(无痕浏览 doge)

1.作用:控制路由跳转时操作浏览器历史记录的模式

⒉ 浏览器的历史记录有两种写入方式:分别为`push`和`replace`，`push`是追加历史记录，`replace`是替换当前记录。路由跳转时候默认为`push`

3.如何开启`replace`模式:`<router-link replace ......>News</router-link>`

### 编程式路由导航

1.作用:不借助`<router-link>`实现路由跳转，让路由跳转更加灵活

2.具体编码:

```js
//$router的两个API
this.$router.push({
  name: "xiangqing",
  params: {
    id: xxx,
    title: xxx,
  },
});

this.$router.replace({
  name: "xiangqing",
  params: {
    id: xxx,
    title: xxx,
  },
});

this.$router.forward(); //前进
this.$router.back(); //后退
this.$router.go(); //可前进也可后退
```

### 缓存路由组件

1.作用:让不展示的路由组件保持挂载，不被销毁。

2.具体编码:

```js
<keep-alive include="News(组件名)">
  <router-view></router-view>
</keep-alive>
```

### 两个新的生命周期钩子

1.作用: 路由组件所独有的两个钩子，用于捕获路由组件的激活状态。

2.具体名字:

1. `activated`路由组件被激活时触发。
2. `deactivated`路由组件失活时触发。

### 路由守卫

作用: 对路由进行权限控制

#### 全局守卫

```js
//全局前置守卫:初始化时执行、每次路由切换前执行
router.beforeEach((to,from,next)=>{
	if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
		if(localStorage.getItem('school') === 'atguigu'){ //权限控制的具体规则
			next()//放行
		}else{
			alert('暂无权限查看")
			//next({name:'guanyu'})
		}
	}else{
		next()//放行
	}
})

//全局后置守卫:初始化时执行、每次路由切换后执行
router.afterEach((to,from)=>{
	if(to.meta.title){
		document.title = to.meta.title  //修改网页的title
	}else{
		document.title = 'vue_test'
	}
})
```

#### 独享守卫

```js
beforeEnter(to,from,next){
	if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
		if(localStorage.getItem('school') === 'atguigu'){
			next()
		}else{
			alert('暂无权限查看')
			//next({name:'guanyu'})
		}
	}else{
		next()
	}
}
```

#### 组件内路由守卫

```js
//进入守卫:通过路由规则，进入该组件时被调用
beforeRouteEnter (to,from,next) {
},
//离开守卫:通过路由规则，离开该组件时被调用
beforeRouteLeave (to,from,next) {
}
```

### 路由器的两种工作模式 hash 与 history

[前端部署]: https://www.bilibili.com/video/BV1Zy4y1K7SH?p=133&spm_id_from=pageDriver&vd_source=e754d95b996bf636e1256b88397221dd

1.对于一个 url 来说，什么是 hash 值?——#及其后面的内容就是 hash 值。

2.hash 值不会包含在 HTTP 请求中，即: hash 值不会带给服务器。

3.hash 模式:

​ (1).地址中永远带着#号，不美观。

​ (2).若以后将地址通过第三方手机 app 分享，若 app 校验严格，则地址会被标记为不合法。

​ (3).兼容性较好。

​ (4).他虽然在 URL 中，但是不会被包括在 HTTP 请求当中 对后端完全没影响 因此改变 hash 不会重新加载页面

4.history 模式:

​ (1).地址干净，美观。

​ (2).兼容性和 hash 模式相比略差。

​ (3).应用部署上线时需要后端人员支持，解决刷新页面服务端 404 的问题。

​ (4).当他修改执行时 虽然改变了当前的 URL 但游览器不会立即向后端发送请求

### 前端路由原理解析与实现

**什么是前端路由 ？**

路由描述的是 URL 与 UI 之间的映射关系 这种映射是单向的 即 URL 变化引起的 UI 更新（无需刷新页面）

**如何实现前端路由？**

要实现前端路由需要解决两个核心

1.如何改变 URL 却不引起页面刷新

2.如何检测 URL 变化了

下面分别使用 hash 与 history 两种实现方式回答上面的两个核心问题

**hash 实现**

hash 是 url 中 hash（#）及后面的部分，常用作锚点在页面进行导航，改变 url 中的 hash 部分不会引起页面刷新

通过 hashchange 事件 监听 url 变化 改变 url 的方式只有这几种：通过游览器的前进后退 通过标签改变 url 通过 window.location 改变 URL 这几种情况改变 URL 都会触发 hashchange 事件

**history 实现**

history 提供了 pushState（增加状态）和 replaceState（改变状态）两个方法，这两个方法改变 URL 的 path 部分不会引起页面刷新

history 提供类似`hashchange` 事件的 popstate 事件 但 popstate 事件有些不同：通过浏览器前进后退改变 URL 时会触发 popstate 事件，通过`pushState/replaceState`或`<a>`标签改变 URL 不会触发 popstate 事件。好在我们可以拦截 `pushState/replaceState`的调用和标签的点击事件来检测 URL 变化，所以监听 URL 变化可以实现，只是没有 hashchange 那么方便。

## Vue UI 组件库

### 移动端常用 UI 组件库

1. Vant https://youzan.github.io/vant
2. Cube UI https://didi.github.io/cube-ui
3. Mint UI http://mint-ui.github.io

### PC 端常用 UI 组件库

1. Element UI https://element.eleme.cn
2. IView UI https://www.iviewui.co.

## 组件间通信高级\*

### 1.事件注意事项

事件：系统事件：click、双击、鼠标系列事件等等

​ 自定义事件

事件源、事件类型、事件回调

1、原生 DOM----button 标签可以绑定系统事件

2、组件标签-----可以绑定系统事件（不起作用：因为属于自定义事件）------@click 后面+ .native （可以把自定义事件变成原生的 DOM 事件）

原生 DOM click 事件，其实是给子组件的根节点绑定了单击事件----利用到事件委派

给原生 DOM 绑定自定义事件是没有任何意义的，因为没有办法触发$emit 函数

### 2.v-model

【组件通信方式的一种】

父组件

```vue
<template>
  <div>
    <h2>深入v-model</h2>
    <input type="text" v-model="msg" />
    <span>{{ msg }}</span>
    <br />
    <hr />
    <h2>v-model实现原理（vue2)</h2>
    <!--
			原生DOw当中是有oninput事件，它经常结合表单元素一起使用，当表单元素文本内容发生变化的时候就会发出发一次回调
			Vue2:可以通过value与input事件实现v-model功能
			:value 与 oninput 事件结合与 :v-model一样
		-->
    <input type="text" :value="msg" @input="msg = $event.target.value" />
    <span>{{ msg }}</span>
    <!--深入学习v-model：实现父子组件数据同步（实现父子组件通信） -->
    <!--
			:value到底是什么？ props，父子组件通信
			@input到底是什么？ 并非原生DOM的input事件，属于自定义事件
		-->
    <CustomInput :value="msg" @input="msg = $event" />
    <!-- 简化写法 -->
    <CustomInput v-model="msg" />
  </div>
</template>
<script type="text/ecmascript-6">
export default {
	name: " ModelTest',
	cmponents:{
		CustomInput
	},
	data(){
		return {
			msg:"我爱你塞北的大雪"
		}
	}
}
</script>
```

CustomInput 组件

```vue
<template>
  <div>
    <h2>input包装组件</h2>
    <!--
			:value   动态属性
			@input   给原生DOM绑定原生DOM事件
		-->
    <input
      type="text"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>
<script type="text/ecmascript-6">
export default {
	name: 'CustomInput',
	props:['value']
}
</script>
```

v-model 实现原理：value 与 input 事件实现的，而且还需要注意可以通过 v-mode 实现父子组件数据同步

### 3.sync 属性修饰符

【组件通信方式的一种】

父组件

```vue
<template>
  <div>
    小明的爸爸现在有{{ money }}元

    <h2>不使用sync修改符</h2>
    <!--
			:money父组件给子组件传递props
			@update:money给子组件绑定的自定义事件只不过名字叫做update:money
			目前现在这种操作，起始和v-model很相似,可以实现父子组件数据同步
		-->
    <Child :money="money" @update:money="money = $event" />

    <h2>使用sync修改符</h2>
    <!--
			:money.sync:  
			第一，父组件给字符串传递props money
			第二，给当前子组件绑定了一个自定义事件,而且事件名称即为update:money
		-->
    <Child2 :money.sync="money" />
    <hr />
  </div>
</template>
<script type="text/ecmascript-6">
import Child from './Child.vue'
import Child2 from './Child2.vue'
export default{
	name:'',
	data(){
		return{
			money : 10000
		}
	},
	components:{
		Child,
        Child2
    }
}
</script>
```

Child 组件（两个组件一样）

```vue
<template>
  <div>
    <span>小明每次花100元</span>
    <button @click="$emit('update:money', money - 100)">花钱</button>
    爸爸还剩{{ money }}元
  </div>
</template>
<script type="text/ecmascript-6">
export default{
	name:'child',
	props: ['money']
}
</script>
```

### 4. `$attrs` 与 `$listeners`

`$attrs`属于组件的一个属性，可以获取到父组件传递过来的 props 数据，对于子组件而言，父组件给的数据可以利用 props 接收，如果子组件通过 props 接收的属性，在$attrs 属性当中是获取不到的

$listeners 也是组件实例自身的一个属性，他可以获取到父组件给子组件传递的自定义事件

按钮想要增加鼠标放上去的提示信息，外面加一个 a 标签，:title 属性为提示信息

### 5.`$children`与`$parent`

建议用 ref ,直接获取相应的子组件

$children 是组件实例的属性，可以获取到当前组件的全部子组件【是个数组】

不要用$children[0]书写，如果子组件过多，第 0 项可能不是想要的组件

$parent 可以获取到某个组件的父组件，可以操作父组件的数据和方法

### 6.混入 mixin

如果项目当中出现很多结构类似功能，想到组件复用

如果项目当中很多的组件 JS 业务逻辑相似，想到 mixin【可以把多个组件 JS 部分重复、相似地方】

### 7.插槽

可以实现父子组件通信（通信的结构）

默认插槽

具名插槽

作用域插槽：子组件的数据来源于父组件，子组件是决定不了自身结构与外观
