// turn color palette img to canvas
var colorPalette = new Image();
colorPalette.crossOrigin = 'Anonymous';
colorPalette.src = 'http://i.imgur.com/NdNOaKH.png';

var canvas3 = document.getElementById('colorPalette');
var canvasContext3 = canvas3.getContext('2d');

// draw img on canvas
colorPalette.addEventListener('load', function () {
  canvasContext3.drawImage(colorPalette, 0, 0);
  colorPalette.style.display = 'none';
});

// turn img on canvas to a color picker
function pick(event) {
  var x = event.layerX;
  var y = event.layerY;
  var pixel = canvasContext3.getImageData(x, y, 1, 1);
  var data = pixel.data;

  // set car new paint color
  madCar.paintColor = 'rgba(' + data[0] + ', ' + data[1] +
  ', ' + data[2] + ', ' + (data[3] / 255) + ')';

  // change the current paint color display
  document.getElementById('currentPaintColor').style.backgroundColor = madCar.paintColor;
}

// click color palette to change paint color
canvas3.addEventListener('click', pick);

// set car pics
var carPic = document.createElement('img');

// set automatically in loadImages()
var picsToLoad;

function loadImages() {
  // fill the image list with image objects
  var imageList = [
    { varName: carPic, theFile: 'car.png' },
  ];

  picsToLoad = imageList.length;

  // loop through image list
  for (var i = 0; i < imageList.length; i++) {
    // load car pics
    beginLoadingImage(imageList[i].varName, imageList[i].theFile);
  }
}

// load an image and decrement picsToLoad
function beginLoadingImage(imgVar, fileName) {
  imgVar.onload = countLoadedImagesAndLaunchIfReady;
  imgVar.src = 'images/' + fileName;
}

// launch when picsToLoad = 0
function countLoadedImagesAndLaunchIfReady() {
  picsToLoad--;
  if (picsToLoad === 0) {
    imageLoadingDoneSoStartGame();
  }
}