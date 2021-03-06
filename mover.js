
var Mover = function(m, x, y) {
  this.mass = m;
  this.position = createVector(x, y);
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
  this.G = 0.4;

// Newton's 2nd law: F = M * A
  // or A = F / M
  this.applyForce = function(force) {
    var f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  };
    
    this.attract = function(entity){
      var force = p5.Vector.sub(this.position, entity.position);
      var distance = force.mag();
       distance = constrain(distance, 5.0, 25.0);
      force.normalize();

      var strength = (this.G * this.mass * entity.mass)/distance*distance;
      force.mult(strength);
      return force;
    }
  this.update = function() {
    this.velocity.add(this.acceleration);// Velocity changes according to acceleration
    this.position.add(this.velocity);// position changes by velocity
    this.acceleration.mult(0);// We must clear acceleration each frame
  };

  this.display = function() {
    stroke(0);
    strokeWeight(2);
    fill(255, 127);
    ellipse(this.position.x, this.position.y, this.mass*16, this.mass*16);
  };

  this.checkEdges = function() {
    if (this.position.x > width) {
      this.position.x = width;
      this.velocity.x *= -1;
    } else if (this.position.x < 0) {
      this.velocity.x *= -1;
      this.position.x = 0;
    }
    if (this.position.y > height) {
      this.velocity.y *= -0.9; //dampens over time
      this.position.y = height;
    }
  };

};