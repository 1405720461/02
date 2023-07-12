---
title: 恋爱小屋
tags:
  - 恋爱
date: 2023-05-26
update: 2023-05-26
comments: false
password: "wangjinglun"
theme: xray
message: 这里记录我和女朋友的一些事情哦，需要密码才能进入哦!
abstract: 只有你和我才知道密码! #密码框提示信息
wrong_pass_message: 抱歉, 这个密码看着不太对, 请再试试! #密码错误提示信息
---

<link rel="stylesheet" type="text/css" href="/css/love.css">

<div class="Time flex">
  <div class='time-left flex'>
    <div class="time time1">
      <div class="mask">
        <p class="left_top">在一起已经 :</p>
        <span id="day1" class="date1"></span>
        <div class="date2">天啦</div>
        <p class="right_bottom right_bottom1">起始于2020-11-08 周日</p>
      </div>
    </div>
    <!-- <div class="time time2">
      <div class="mask">
        <p class="left_top">生日还有 :</p>
        <span id="day2" class="date1"></span>
        <div class="date2">天</div>
        <p class="right_bottom">2023-07-12 周三</p>
      </div>
    </div>
    <div class="time time3">
      <div class="mask">
        <p class="left_top">宝宝生日还有 :</p>
        <span id="day3" class="date1"></span>
        <div class="date2">天</div>
        <p class="right_bottom">2023-10-01 周日</p>
      </div>
    </div> -->
    <br>
    {% span center logo large gray, 相册 %}
    <br>
    <div class="gallery-group-main time-gallery">
    {% galleryGroup 'wjl❤️pxy' '小笨蛋啊' '/personal/love/love_img/love' /assets/images/Violet_Evergarden/1.webp %}
    {% galleryGroup '青岛' '一起去青岛啦' '/personal/love/love_img/Qingdao' /assets/images/Violet_Evergarden/1.webp %}
    </div>
  </div>
  <div class='time-right'>
{% folding blue, 走过点点滴滴 %}

{% timeline wjl❤️pxy , pink %}

<!-- timeline  2023-04-21  -->

一起出发去青岛 🚆

<!-- endtimeline -->

<!-- timeline 2021-11-08 -->

一周年啦

<!-- endtimeline -->
<!-- timeline 2020-11-08 -->

我们在一起啦 💕

<!-- endtimeline -->

{% endtimeline %}

<!-- endtab -->

{% endfolding %}
  </div>
</div>

<script defer src="/js/date.js"></script>
