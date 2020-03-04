var Vessel = function(x, y) {
  this.ACCELERATION = 0.2;
  this.SPINSPEED = 0.1;

  this.height = 30;
  this.width = 20;

  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.force = 0;

  this.dir = -Math.PI/2; // face up
  this.spin = 0;

  this.spinLeft = function() {
    this.spin = this.SPINSPEED;
  };

  this.spinRight = function() {
    this.spin = -this.SPINSPEED;
  };

  this.stopSpinning = function() {
    this.spin = 0;
  };

  this.accelerate = function() {
      this.force = this.ACCELERATION;
  };

  this.stopAccelerate = function() {
      this.force = 0;
  };

  this.update = function() {
    this.vx += this.force * Math.cos(this.dir);
    this.vy += this.force * Math.sin(this.dir);
    this.x += this.vx;
    this.y += this.vy;

    this.dir += this.spin;

    if (this.x < 0) {
      this.x = canvas.width;
    } else if (this.x > canvas.width) {
      this.x = 0;
    }
    if (this.y < 0) {
      this.y = canvas.height;
    } else if (this.y > canvas.height) {
      this.y = 0;
    }
  };

  this.draw = function(ctx) {
    ctx.fillStyle = 'white';

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(Math.PI / 2 + this.dir);

    ctx.beginPath();
    ctx.moveTo(0, -this.height/2);
    ctx.lineTo(-this.width/2, this.height/2);
    ctx.lineTo(this.width/2, this.height/2);
    ctx.fill();

    ctx.restore();
  };
};

var drawCanvas = function(canvas, ctx, vessel) {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  vessel.draw(ctx);
};

var setup = function() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  var vessel = new Vessel(canvas.width / 2, canvas.height / 2, ctx);
  drawCanvas(canvas, ctx, vessel);

  document.addEventListener('keydown', function(evt) {
    evt.preventDefault();

    if (evt.keyCode === 39) {
      vessel.spinLeft();
    }
    if (evt.keyCode === 37) {
      vessel.spinRight();
    } 
    if (evt.keyCode === 38) {
      alert("6");
      vessel.accelerate();
    } 
  });

  document.addEventListener('keyup', function(evt) {
    evt.preventDefault();

    if (evt.keyCode === 39 || evt.keyCode === 37) {
      vessel.stopSpinning();
    }
    if (evt.keyCode === 38) {
      vessel.stopAccelerate();
    }
  });

  window.setInterval(function() {
    vessel.update();
    drawCanvas(canvas, ctx, vessel)
  }, 1000/60);
};

window.onload = setup();
