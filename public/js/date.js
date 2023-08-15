// 设置变量（不同的时间传入方式）
let target_time1 = new Date("2020/11/08");
// let target_time2 = new Date("2023/07/12");
// let target_time3 = new Date("2023/10/01");
// var target_time = new Date();
// target_time.setHours(target_time.getHours() + 5);

// 获取需要对应插入数据的节点
let day_ele1 = document.getElementById("day1");
// let day_ele2 = document.getElementById("day2");
// let day_ele3 = document.getElementById("day3");

// 获取目标时间到当前时间的毫秒数，进行计算并返回结果
function countDown1(){
    let reduce_ms = Date.now() - target_time1.getTime(); 
    return {
        day  : parseInt(reduce_ms / 1000 / 3600 / 24),
    }
}

function countDown2(a){
    let reduce_ms = a.getTime() - Date.now(); 
    return {
        day  : parseInt(reduce_ms / 1000 / 3600 / 24)+1,
    }
}


// 将数据渲染到页面指定节点中
function renderCountDown(){
    let res1 = countDown1();
    // let res2 = countDown2(target_time2);
    // let res3 = countDown2(target_time3);
    day_ele1.innerHTML = res1.day;
    // day_ele2.innerHTML = res2.day;
    // day_ele3.innerHTML = res3.day;
}


// 实现倒计时效果
setTimeout(renderCountDown,1000);
renderCountDown()


// <!-- 在一起已经 : <span id="day"></span>天啦 -->

// <!-- <script defer src="/js/date.js"></script> -->


