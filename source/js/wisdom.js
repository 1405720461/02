const quotes = [
    "爱你，老妈",
    "少年拥有了时间，时间带走了年少",
    "吃什么补什么，吃苦不能成为人上人，吃人才能",
    "暴雨中前进，伞是倒划天空的船",
    "把地球倒置，我用撒哈拉沙漠来计时",
    "我将房门反锁，于是尘世的孤独便都有了归宿",
    "很多人看不到未来，其实是看到了未来",
    "我最新的照片，其实是我最老的照片",
];

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}
