let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

let dpr = window.devicePixelRatio || 1;
let w = isMobile ? 350 : 400, spacing = isMobile ? 1 : 2;
let windowWidth = window.innerWidth;
let canvasWidth = w * spacing;
let renderX = Math.abs((windowWidth - canvasWidth) * dpr / 2);

let DameDaneParticleDemo = new DameDaneParticle(document.getElementById('akCanvas'), {
  src: './image/Arknights/island.png',
  renderX,
  renderY: isMobile ? 100 : 60,
  w,
  size: isMobile ? 1.2 : 1.8,
  spacing,
  validColor: {
    min: 300,
    max: 765,
    invert: false
  },
  effectParticleMode: 'repulsion',
  Thickness: 50,
});


//修改粒子吸附或者散开效果
function changeParticleMode() {
  DameDaneParticleDemo.toggleParticleMode()
}

//方舟图片
function arknight() {
  DameDaneParticleDemo.ChangeImg('./image/Arknights/arknight.jpeg', { w: 350 })
}

function island() {
  DameDaneParticleDemo.ChangeImg('./image/Arknights/island.png', { w: isMobile ? 350 : 400 })
}

function longmen() {
  DameDaneParticleDemo.ChangeImg('./image/Arknights/longmen.png', { w: 350 })
}

function penguin() {
  DameDaneParticleDemo.ChangeImg('./image/Arknights/penguin.jpeg', { w: 350 })
}

function rhine() {
  DameDaneParticleDemo.ChangeImg('./image/Arknights/rhine.jpeg', { w: 350 })
}

function reunion() {
  DameDaneParticleDemo.ChangeImg('./image/Arknights/reunion.jpeg', { w: 400 })
}

//原神元素
function fire() {
  DameDaneParticleDemo.ChangeImg('./image/Genshin-Impact/fire.webp', { w: 350 })
}

function grass() {
  DameDaneParticleDemo.ChangeImg('./image/Genshin-Impact/grass.webp', { w: 350 })
}

function ice() {
  DameDaneParticleDemo.ChangeImg('./image/Genshin-Impact/ice.webp', { w: 350 })
}

function rock() {
  DameDaneParticleDemo.ChangeImg('./image/Genshin-Impact/rock.webp', { w: 350 })
}

function thunder() {
  DameDaneParticleDemo.ChangeImg('./image/Genshin-Impact/thunder.webp', { w: 350 })
}

function water() {
  DameDaneParticleDemo.ChangeImg('./image/Genshin-Impact/water.webp', { w: 350 })
}

function wind() {
  DameDaneParticleDemo.ChangeImg('./image/Genshin-Impact/wind.webp', { w: 350 })
}


// 获取类名为btn的元素
var button = document.querySelector('.btn');

// 添加点击事件监听器
button.addEventListener('click', function () {
  // 切换当前按钮的类名为active
  if (this.classList.contains('active')) {
    this.classList.remove('active');
  } else {
    this.classList.add('active');
  }

  // 切换所有class为box的元素的类名为open
  var boxes = document.querySelectorAll('.box');
  boxes.forEach(function (box) {
    if (box.classList.contains('open')) {
      box.classList.remove('open');
    } else {
      box.classList.add('open');
    }
  });
});

// 获取所有图片元素
const imgTags = document.querySelectorAll('img');

// 遍历所有图片元素
imgTags.forEach(img => {
  // 获取图片的src属性值
  const src = img.getAttribute('src');
  // 解析src，提取文件名
  const fileName = src.substring(src.lastIndexOf('/') + 1); // 获取文件名部分
  const methodName = fileName.substring(0, fileName.indexOf('.')); // 获取第一个.前的部分

  // 为每个图片元素添加点击事件
  img.addEventListener('click', function () {
    // 触发对应的事件
    window[methodName](); // 使用window对象来调用全局作用域中的函数
  });
});
