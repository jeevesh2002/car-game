// set key codes
const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
const KEY_SPACE = 32;
const KEY_BACKSPACE = 8;

function setupInput() {
  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);

  // backspace to erase draw layer
  document.addEventListener('keydown', function (event) {
    if (event.keyCode === KEY_BACKSPACE) {
      canvasContext2.clearRect(0, 0, canvasWidth, canvasHeight);
    }
  });

  // set cars' keys
  madCar.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW, KEY_SPACE);
}

function keySet(keyEvent, whichCar, setTo) {
  // match event's keyCode with car's keyCode
  if (keyEvent.keyCode === whichCar.controlKeyLeft) {
    whichCar.keyHeld_TurnLeft = setTo;
  }

  if (keyEvent.keyCode === whichCar.controlKeyRight) {
    whichCar.keyHeld_TurnRight = setTo;
  }

  if (keyEvent.keyCode === whichCar.controlKeyUp) {
    whichCar.keyHeld_Gas = setTo;
  }

  if (keyEvent.keyCode === whichCar.controlKeyDown) {
    whichCar.keyHeld_Reverse = setTo;
  }

  if (keyEvent.keyCode === whichCar.contolKeyPaint) {
    whichCar.keyHeld_Paint = setTo;
  }

  // turn off default keys' function
  keyEvent.preventDefault();
}

function keyPressed(evt) {
  // set keyHeld to true
  keySet(evt, madCar, true);
}

function keyReleased(evt) {
  // set keyHeld to false
  keySet(evt, madCar, false);
}