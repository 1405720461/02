const SimpleWisdomQuotes = [
    "少年拥有了时间，时间带走了年少",
    "吃什么补什么，吃苦不能成为人上人，吃人才能",
    "暴雨中前进，伞是倒划天空的船",
    "把地球倒置，我用撒哈拉沙漠来计时",
    "我将房门反锁，于是尘世的孤独便都有了归宿",
    "很多人看不到未来，其实是看到了未来",
    "我最新的照片，其实是我最老的照片",
    "旧人不知我近况，新人不知我过往，近况不该旧人知，过往不与新人讲",
    "所到之处，皆是命数",
    "我于昨晚去世，走时心如止水。我于今早重生，来时心怀暖阳",
    "愿有岁月可回首，且以深情共白头",
    "我想和你一起生活，在某个小镇，共享无尽黄昏，和绵绵不绝的钟声",
    "所有的桥都是温暖的，因为它让河流不再难过",
    "我在黄昏垂钓夕阳，试图拉起我堕落的人生",
    "有目的的人生才会迷路，我只是来世界散步",
    ["怀念过去是不是在历史的长河里刻舟求剑", "珍惜当下是不是在现实的波涛中见风使舵", "展望未来是不是在前进的道路上望梅止渴"]
];

const LOLQuotes = [
    "爱你，老妈，明天见",
    "如果真相带来痛苦，谎言只会雪上加霜",
    "谎言不会伤人，真相才是快刀",
    "世界既不黑也不白，而是一道精致的灰",
    "我曾踏足山巅，也曾进入低谷，二者都让我受益良多",
    "真正的大师，永远都怀着一颗学徒的心",
    "我于杀戮之中盛放，亦如黎明中的花朵",
    "断剑重铸之日，其势归来之时！",
    "生日快乐！",
    "天下万般兵刃，唯有过往伤人最深",
    "一片赤胆平乱世，手中长枪定江山",
    "我回来，是为了那些回不来的人",
    "时间，不在于你拥有多少，而在于你怎样使用",
    "疾风，亦有归途",
    "面如霜下雪，吻如学上霜",
    "花团锦簇的节日用来铭记逝者",
    "精准与否，就是屠宰与手术的区别",
    "灾难始终慢我一步",
    "命数如织，当为磐石",
    "那必须是我了",
    "树叶的一生，只是为了归根吗？",
    "一剑诛恶，一剑镇魂",
    "执子之魂，与子共生",
    "说教无益，折断的骨头是最好的课本"
]

const CartoonQuotes = [
    "花无凋零之日，意无传递之时，爱情亘古不变，紫罗兰与世长存",
    "过去无可挽回，未来可以改变",
    "如果我们能活着出去，万水千山，你愿意陪我一起看吗？",
    "我即方位，我即吉凶",
    "你们总说俺瓜，俺一点都不瓜，大多数时候俺都机智的一匹",
    "我把这只手臂赌在了新时代",
    "我是旧时代的残党，新时代没有载我的船",
    "这个时代名为白胡子",
    "狙击王 把那面旗子打穿",
    "再见梅丽",
    "梦想就像星辰，你可以看到，但是你摸不到",
    "开往团结屯的列车即将进站",
]

const quotesCollection = {
    SimpleWisdomQuotes,
    LOLQuotes,
    CartoonQuotes
}

// 用于存储当前正在遍历的集合和其索引
let currentCollection = null;
let isReturningArrayItems = false;
let currentIndex = 0;
let arrayItem = null;

function getRandomQuote() {
    // 如果当前处于返回数组项的模式
    if (isReturningArrayItems) {
        // 如果数组已经遍历完，则退出数组项模式，重新选择下一个集合
        if (currentIndex < arrayItem.length) {
            return arrayItem[currentIndex++];
        } else {
            isReturningArrayItems = false;
            return getRandomQuote();
        }
    } else {
        // 随机选择一个集合
        const collectionKeys = Object.keys(quotesCollection);
        const randomCollectionKey = collectionKeys[Math.floor(Math.random() * collectionKeys.length)];
        currentCollection = quotesCollection[randomCollectionKey];

        const randomIndex = Math.floor(Math.random() * currentCollection.length);

        // 如果选中的项是数组，则进入返回数组项的模式
        if (Array.isArray(currentCollection[randomIndex])) {
            arrayItem = currentCollection[randomIndex];
            isReturningArrayItems = true;
            currentIndex = 0;
            return getRandomQuote();
        } else {
            return currentCollection[randomIndex];
        }
    }
}
