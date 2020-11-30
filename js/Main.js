// set car layer and paint layer
var canvas1;
var canvasContext1;
var canvas2;
var canvasContext2;
var canvasWidth = window.innerWidth;
var canvasHeight = document.body.offsetHeight;

// create car
var madCar = new Car(carPic);

// start program
window.addEventListener('load', function () {
  // get car layer
  canvas1 = document.getElementById('gameCanvas1');
  canvasContext1 = canvas1.getContext('2d');

  // get paint layer
  canvas2 = document.getElementById('gameCanvas2');
  canvasContext2 = canvas2.getContext('2d');

  // make layers full screen
  canvas1.width = window.innerWidth;
  canvas1.height = document.body.offsetHeight;

  canvas2.width = window.innerWidth;
  canvas2.height = document.body.offsetHeight;

  // draw loading screen
  colorRect(0, 0, canvasWidth, canvasHeight, 'black');
  colorText('Loading...', canvasWidth / 2 - 20, canvasHeight / 2, 'white');

  // start game after all images loaded
  loadImages();
});

function imageLoadingDoneSoStartGame() {
  // set interval
  var framesPerSecond = 30;
  setInterval(updateAll, 1000 / framesPerSecond);

  // set keys car
  setupInput();
}

function updateAll() {
  // put screen on first layer
  colorRect(0, 0, canvasWidth, canvasHeight, 'white');

  // put screen on second layer
  madCar.move();
  madCar.draw();
  madCar.paint();
}

function showHideInstruction() {
  var x = document.getElementById('instruction');
  if (x.style.display === 'none') {
    x.style.display = 'block';
  } else {
    x.style.display = 'none';
  }
}

function showHidePalette() {
  var x = document.getElementById('colorPalette');
  if (x.style.display === 'none') {
    x.style.display = 'block';
  } else {
    x.style.display = 'none';
  }
}