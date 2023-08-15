// 整个页面加载完之后再执行function里的内容
window.addEventListener('load', function () {
    // 任务总数
    var num = 0;
    // 数组a下标
    var i = 0;
    var a = [i];
    // 圆圈左右状态
    var bl = false;
    var left = 0;
    // 节流阀
    var throttle = true;
    let newTaskInput = document.querySelector('.new-task input');
    // 输入空格光标定到搜索框
    document.addEventListener('keyup', function (e) {
        if (e.keyCode == 32) {
            newTaskInput.focus();
        }
    })
    newTaskInput.onkeydown = function (event) {
        if (event.keyCode == 13) {
            // 读取用户输入内容
            let newTaskText = newTaskInput.value.trim();
            if (newTaskText != '') {
                // console.log(newTaskText);
                // 找到.todo.template节点
                let template = document.querySelector('.todo-template');
                // 复制节点   
                // true 深度拷贝，会复制节点本身以及里面所有的子节点
                // false 浅拷贝，只克隆复制节点本身，不克隆里面的子节点
                let newTaskCopy = template.cloneNode(true);
                // console.log(newTaskCopy);
                // 找到todo.item节点
                var newTaskNode = newTaskCopy.querySelector('.todo-item');
                // 替换为用户输入内容
                newTaskNode.querySelector('.center-item').innerText = newTaskText;
                // 拿到第一个节点
                let firstTodo = document.querySelector('.taskbar .todo-item');
                // insertBefore 将newTaskNode插入到firstTodo节点前面
                document.querySelector('.taskbar').insertBefore(newTaskNode, firstTodo).style.animation = "huaru 1.3s cubic-bezier(.45,.03,.2,.94) 1";
                newTaskInput.value = '';
                num++;
                document.querySelector('.number').innerText = num;
                newTaskNode.x = 2;

                a[i] = newTaskNode;
                i++;

                // 点击事件
                var finish = newTaskNode.querySelector('.left-item');
                finish.onclick = function (event) {
                    // 判断是否完成  x=1已完成  x==2未完成 x==3已删除
                    if (finish.innerText == '') {
                        finish.innerText = '';
                        let todoText = finish.parentElement.querySelector('.center-item');
                        todoText.style.textDecoration = 'line-through';
                        newTaskNode.x = 1;
                        // num--;
                        document.querySelector('.number').innerText = num;
                    } else {
                        finish.innerText = '';
                        let todoText = finish.parentElement.querySelector('.center-item');
                        todoText.style.textDecoration = 'none';
                        newTaskNode.x = 2;
                        // num++;
                        document.querySelector('.number').innerText = num;
                    }

                }

                // 点击删除
                let de = document.querySelector('.right-item');
                let item = de.parentElement;

                de.onclick = function () {
                    item.remove();
                    // let taskBar = document.querySelector('.taskbar');
                    // taskBar.removeChild(newTaskNode);
                    newTaskNode.x = 3;
                    // console.log(a);
                    num--;
                    document.querySelector('.number').innerText = num;

                }

                // 定时延时功能
                // 定时
                let timingList = document.getElementById('timing-list');
                let delayedList = document.getElementById('delayed-list');
                let TASK = timingList.parentElement.parentElement.parentElement;
                delayedList.disabled = true;
                // console.log(TASK.children[1].innerHTML);
                var Time = 0; //时间
                var TIME = 0; //延时时间
                timingList.onchange = function () {
                    Time = timingList.value;
                    let time = Time;
                    delayedList.disabled = true;
                    if (TASK.x == 2) {
                        var timer = setInterval(() => { //计时器
                            time--;
                            if (TASK.x == 1 || TASK.x == 3) { //如果任务已完成清除计时器
                                clearInterval(timer);
                            }
                            // if (de.onclick) {
                            //     clearInterval(timer);
                            // }
                            if (time == 0) {
                                var popover = confirm('您时间已到，是否进行延时操作'); //confirm返回true或false
                                delayedList.disabled = false;

                                // 不延时
                                if (popover == false) {
                                    finish.innerText = '';
                                    let todoText = finish.parentElement.querySelector('.center-item');
                                    todoText.style.textDecoration = 'line-through';
                                    TASK.x = 1;
                                } else if (popover == true) {

                                    // 延时
                                    delayedList.onchange = function () {
                                        TIME = delayedList.value;
                                        time = TIME;
                                        var TIMER = setInterval(() => {
                                            time--;
                                            if (TASK.x == 1) {
                                                clearInterval(TIMER);
                                            }

                                            if (time == 0) {
                                                confirm('时间到！任务 ' + TASK.children[1].innerHTML + ' 已完成');
                                                finish.innerText = '';
                                                let todoText = finish.parentElement.querySelector('.center-item');
                                                todoText.style.textDecoration = 'line-through';
                                                TASK.x = 1;
                                                timingList.disabled = true;
                                                delayedList.disabled = true;
                                            }
                                        }, 1000);
                                    }
                                }
                                clearInterval(timer);
                                // TASK.x = 1;
                            }
                        }, 1000);
                    } else if (TASK.x == 1) {
                        confirm('该任务已完成');
                        // timingList.value = 0;
                    }

                }


            }

            let all = document.querySelector('.all');
            let unfinished = document.querySelector('.unfinished');
            let finished = document.querySelector('.finished');
            // let finish1 = document.querySelector('.left-item').parentElement;
            // console.log(finish1);

            // 所有按钮
            all.onclick = function () {
                all.setAttribute('style', 'box-shadow:5px 5px 15px rgb(219, 218, 218), -5px -5px 10px #fff ');
                unfinished.setAttribute('style', 'box-shadow:none');
                finished.setAttribute('style', 'box-shadow:none');
                var o = a.length;
                for (let i = 0; i < a.length; i++) {
                    if (a[i].x == 1) {
                        a[i].style.display = '';
                        // a[i].style.animation = "huaru 1.3s cubic-bezier(.45,.03,.2,.94) 1";
                    } else if (a[i].x == 3) {
                        o--;
                    } else {
                        a[i].style.display = '';
                    }

                }
                num = o;
                document.querySelector('.number').innerText = num;
            }


            // 点击未完成按钮
            unfinished.onclick = function () {
                // unfinished.style.boxShadow = '5px 5px 15px rgb(219, 218, 218), -5px -5px 10px #fff';
                unfinished.setAttribute('style', 'box-shadow:5px 5px 15px rgb(219, 218, 218), -5px -5px 10px #fff ');
                all.setAttribute('style', 'box-shadow:none');
                finished.setAttribute('style', 'box-shadow:none');
                var m = a.length;
                for (let i = 0; i < a.length; i++) {
                    // console.log(a[i]);
                    if (a[i].x == 1) {
                        a[i].style.display = 'none';
                        m--;
                    } else if (a[i].x == 3) {
                        m--;
                    } else {
                        a[i].style.display = '';
                    }
                }

                num = m;
                document.querySelector('.number').innerText = num;
            }

            // 已完成按钮
            finished.onclick = function () {
                finished.setAttribute('style', 'box-shadow:5px 5px 15px rgb(219, 218, 218), -5px -5px 10px #fff ');
                unfinished.setAttribute('style', 'box-shadow:none');
                all.setAttribute('style', 'box-shadow:none');
                var n = 0;
                for (let i = 0; i < a.length; i++) {
                    if (a[i].x == 1) {
                        a[i].style.display = '';
                        n++;
                        // a[i].style.animation = "huaru 1.3s cubic-bezier(.45,.03,.2,.94) 1";
                    } else {
                        a[i].style.display = 'none';
                    }
                }

                num = n;
                document.querySelector('.number').innerText = num;
            }

            // 全选全不选功能
            let slide = document.querySelector('.slide');
            let slideInput = document.querySelector('.slide-input');
            // let count = 0;

            // // 不能连续点击
            // function done() {
            //     if (count == 0) {
            //         clearInterval(flag);
            //     } else {
            //         count = count - 1;
            //     }
            // }
            slide.onclick = function () {
                // clearInterval(Right);
                // clearInterval(Left);
                // if (count == 0) {
                if (throttle) {
                    throttle = false;
                    if (bl == false) {
                        // clearInterval(Left);
                        // var Right = setInterval(f, 3);
                        animate(slideInput, 390, function () {
                            throttle = true;
                        });
                        slideInput.style.animation = "Color 1.3s 1 forwards"
                        bl = true;
                        for (let i = 0; i < a.length; i++) {
                            if (a[i].x != 3) {
                                a[i].children[0].innerText = '';
                                a[i].children[1].style.textDecoration = 'line-through';
                                a[i].x = 1;
                            }
                        }

                    } else if (bl == true) {
                        // clearInterval(Right);
                        // var Left = setInterval(F, 3);
                        animate(slideInput, 10, function () {
                            throttle = true;
                        });
                        slideInput.style.animation = "COLOR 1.3s 1 forwards"
                        bl = false;
                        for (let i = 0; i < a.length; i++) {
                            if (a[i].x != 3) {
                                a[i].children[0].innerText = '';
                                a[i].children[1].style.textDecoration = 'none';
                                a[i].x = 2;
                            }
                        }
                    }
                }

                count = 1;
                // flag = setInterval(done, 1000);
                // }

                // // 圆圈往右
                // function f() {
                //     if (left == 390) {
                //         clearInterval(Right);
                //     } else {
                //         left += 3;
                //         slideInput.style.left = left + 'px';
                //     }
                //     slideInput.style.animation = "Color 1.3s 1 forwards"
                // }

                // // 圆圈往左
                // function F() {
                //     if (left == 9) {
                //         clearInterval(Left);
                //     } else {
                //         left -= 3;
                //         slideInput.style.left = left + 'px';
                //     }
                //     slideInput.style.animation = "COLOR 1.3s 1 forwards"
                // }
            }

            // 删除已完成
            let definished = document.querySelector('.right-footer');
            definished.onclick = function () {
                for (let i = 0; i < a.length; i++) {
                    if (a[i].x == 1) {
                        // delete a[i];
                        a[i].remove(i);
                        a[i].x = 3;
                        num--;
                        document.querySelector('.number').innerText = num;

                    }
                }

            }



        }


    }
    // 改变背景颜色
    let taskIcon = document.querySelector('.task-icon');
    let bgc = document.querySelector('body');
    let today = document.querySelector('.task');
    let Q = 1;
    taskIcon.onclick = function () {
        if (Q == 0) {
            bgc.setAttribute('style', 'background-color: rgb(225, 239, 255)');
            today.setAttribute('style', 'color: rgb(4, 190, 253)');
            taskIcon.setAttribute('style', 'color: rgb(4, 190, 253)');
            Q = 1;
        } else if (Q == 1) {
            bgc.setAttribute('style', 'background-color: rgb(202, 243, 223);');
            today.setAttribute('style', 'color: rgb(140, 231, 187)');
            taskIcon.setAttribute('style', 'color: rgb(140, 231, 187)');
            Q = 2;
        } else if (Q == 2) {
            bgc.setAttribute('style', 'background-color: rgb(216, 245, 253);');
            today.setAttribute('style', 'color: rgb(139, 217, 238)');
            taskIcon.setAttribute('style', 'color: rgb(139, 217, 238)');
            Q = 3;
        } else if (Q == 3) {
            bgc.setAttribute('style', 'background-color: rgb(241, 219, 255);');
            today.setAttribute('style', 'color: rgb(241, 219, 255)');
            taskIcon.setAttribute('style', 'color: rgb(241, 219, 255)');
            Q = 4;
        } else if (Q == 4) {
            bgc.setAttribute('style', 'background-color: rgb(247, 208, 215);');
            today.setAttribute('style', 'color: rgb(247, 208, 215)');
            taskIcon.setAttribute('style', 'color: rgb(247, 208, 215)');
            Q = 0;
        }
    }

})
// 日期时间
function showTime() {
    let date = new Date();

    // 年月日
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    // 时分秒
    let hour = date.getHours();
    hour = hour < 10 ? '0' + hour : hour;
    let minute = date.getMinutes();
    minute = minute < 10 ? '0' + minute : minute;
    let second = date.getSeconds();
    second = second < 10 ? '0' + second : second;

    // 显示
    let element = document.getElementById('date');
    element.innerHTML = '<p>' + year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second + '</p>';
}
var ShowTime = window.setInterval("showTime()", 1000);