function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

var spans = document.getElementsByClassName('color-span');
for (var i = 0; i < spans.length; i++) {
  var color = getRandomColor();
  spans[i].style.color = color;
}