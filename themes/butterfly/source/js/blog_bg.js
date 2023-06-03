var imagePaths = [
    "assets/blog_bg/1.webp",
    "assets/blog_bg/2.webp",
    "assets/blog_bg/3.webp",
    "assets/blog_bg/4.webp",
];

function displayRandomImage() {
    var randomIndex = Math.floor(Math.random() * imagePaths.length);
    var randomImagePath = imagePaths[randomIndex];
    var articleElement = document.querySelector(".article");
    articleElement.style.backgroundImage = "url('" + randomImagePath + "')";
}

window.onload = function() {
    displayRandomImage();
};