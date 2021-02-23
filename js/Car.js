// slow car down when stopped
const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.06;
const MIN_SPEED_TO_TURN = 0.5;

function Car(whichImage) {
  this.x = canvasWidth / 2;
  this.y = canvasHeight / 2;

  // point car to north east
  this.ang = -Math.PI / 3;
  this.speed = 0;
  this.myCarPic = whichImage;

  // set default paint color
  this.paintColor = '#363F45';

  // set default keyHeld to false
  this.keyHeld_Gas = false;
  this.keyHeld_Reverse = false;
  this.keyHeld_TurnLeft = false;
  this.keyHeld_TurnRight = false;
  this.keyHeld_Paint = false;
}

Car.prototype.setupInput = function (upKey, rightKey, downKey, leftKey, paintKey) {
  this.controlKeyUp = upKey;
  this.controlKeyRight = rightKey;
  this.controlKeyDown = downKey;
  this.controlKeyLeft = leftKey;
  this.contolKeyPaint = paintKey;
};

Car.prototype.move = function () {
  // decrease 0.94 speed
  this.speed *= GROUNDSPEED_DECAY_MULT;

  // increase speed
  if (this.keyHeld_Gas) {
    this.speed += DRIVE_POWER;
  }

  // decrease speed
  if (this.keyHeld_Reverse) {
    this.speed -= REVERSE_POWER;
  }

  // disallow steering when speed is too low
  if (Math.abs(this.speed) > MIN_SPEED_TO_TURN) {
    if (this.keyHeld_TurnLeft) {
      this.ang -= TURN_RATE;
    }

    if (this.keyHeld_TurnRight) {
      this.ang += TURN_RATE;
    }
  }

  // get car's position
  this.x += Math.cos(this.ang) * this.speed;
  this.y += Math.sin(this.ang) * this.speed;

  // hit the bound
  if (this.x < 0) {
    this.x = canvasWidth;
  }

  if (this.x > canvasWidth) {
    this.x = 0;
  }

  if (this.y < 0) {
    this.y = canvasHeight;
  }

  if (this.y > canvasHeight) {
    this.y = 0;
  }
};

Car.prototype.draw = function () {
  drawBitmapCenteredWithRotation(this.myCarPic, this.x, this.y, this.ang);
};

Car.prototype.paint = function () {
  if (this.keyHeld_Paint) {
    // paint the trail
    colorCircle(this.x, this.y, 11, this.paintColor);
  }
};
