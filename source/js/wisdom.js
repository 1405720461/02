const SimpleWisdomQuotes = [
    "少年拥有了时间，时间带走了年少",
    "吃什么补什么，吃苦不能成为人上人，吃人才能",
    "暴雨中前进，伞是倒划天空的船",
    "把地球倒置，我用撒哈拉沙漠来计时",
    "我将房门反锁，于是尘世的孤独便都有了归宿",
    "很多人看不到未来，其实是看到了未来",
    "我最新的照片，其实是我最老的照片",
];

const LOLQuotes = [
    "爱你，老妈，明天见",
    "如果真相带来痛苦，谎言只会雪上加霜",
    "谎言不会伤人，真相才是快刀",
    "世界既不黑也不白，而是一道精致的灰",
    "我曾踏足山巅，也曾进入低谷，二者都让我受益良多",
    "真正的大师，永远都怀着一颗学徒的心",
]

const quotesCollection = {
    SimpleWisdomQuotes,
    LOLQuotes
}

function getRandomQuote() {
    const collectionKeys = Object.keys(quotesCollection);
    const randomCollectionKey = collectionKeys[Math.floor(Math.random() * collectionKeys.length)];

    // 从选中的集合中随机选择一条
    const selectedCollection = quotesCollection[randomCollectionKey];
    const randomIndex = Math.floor(Math.random() * selectedCollection.length);

    return selectedCollection[randomIndex];
}
