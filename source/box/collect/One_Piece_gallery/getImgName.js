// server.js
const fs = require('fs');
const path = require('path');

const imgFolderPath = './img';

// 读取文件夹中的所有文件
fs.readdir(imgFolderPath, (err, files) => {
    if (err) {
        console.error('Error reading folder:', err);
        return;
    }

    // 过滤出webp格式的图片文件名
    const webpImageFiles = files.filter(file => path.extname(file).toLowerCase() === '.webp');

    // 获取前60个图片文件名（去除后缀）
    const first60WebpImageNames = webpImageFiles.map(file => path.basename(file, '.webp'));

    // 打印前60个图片文件名（去除后缀）
    console.log(first60WebpImageNames.slice(0, 60));
    console.log(first60WebpImageNames.slice(60, 120));
    console.log(first60WebpImageNames.slice(120));
});
