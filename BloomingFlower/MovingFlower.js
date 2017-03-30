var frame = 0;

void center () {
  fill(157, 204, 37);
  ellipse(200, 200, 15, 15);
};

var sa1 = 1;
var sa2 = 1;
var sa3 = 1;
var sa4 = 1;
var sa5 = 1;
var scaleFactor = 0.79;

float tip_shifts (t) {
  return t < 0.5 ? 2*t*t : -1+(4-2*t)*t;
};

float size_easing (frame) {
  var input = (frame % 100) / 100; // 0.0 to 1.0
  var easing = tip_shifts(input);  // 0.0 to 1.0
  var adjusted = easing - 0.5;     // -0.5 to +0.5
  if (frame % 200 < 100) {
    adjusted = -adjusted;
  }
  return adjusted + 0.5;           // 0.0 to 1.0
};

PVector wave_tip (frame) {
  var input = (frame % 100)/100;
  var easing = tip_shifts(input);
  var adjusted = (easing * 10) - 5;

  if (frame % 200 <100) {
    adjusted = -adjusted;
  }

  return new PVector(
    -adjusted,
    +adjusted
  );
};

var wind_x = 0;
var wind_y = 0;

Object rotate_point (x, y, angle) {
  // convert to radians
  angle = radians(angle);

  //var theta = Math.atan(y/x);
  var cos_theta = Math.cos(angle);
  var sin_theta = Math.sin(angle);

  var x1 = x * cos_theta - y * sin_theta;
  var y1 = x * sin_theta + y * cos_theta;

  return new PVector(x1, y1);
};

float first_layer_petals (angle, top_angle, tip_delta) {
  pushMatrix();
  translate(200, 200);
  rotate(radians(angle + top_angle));
  scale(sa1);
  scale(scaleFactor);

  var rwind = rotate_point(wind_x, wind_y, -(angle + top_angle));

  beginShape();
  vertex(0,-5);
  bezierVertex(22,-26,13,-36,-2 + tip_delta.x + rwind.x, -50 + tip_delta.y + rwind.y);
  bezierVertex(-6,-24,-24,-31,0,-5);
  endShape();
  popMatrix();
};

float first_layer (frame) {
  fill(255, 0, 140);
  var top_angle = frame/20;
  sa1 = 1 + (size_easing(frame) * 0.2);

  var tip_delta = wave_tip(frame);

  first_layer_petals(0, top_angle, tip_delta);
  first_layer_petals(72, top_angle, tip_delta);
  first_layer_petals(144, top_angle, tip_delta);
  first_layer_petals(216, top_angle, tip_delta);
  first_layer_petals(288, top_angle, tip_delta);
};

float second_layer_petals (angle, top_angle, tip_delta) {
  pushMatrix();
  translate(200, 200);
  rotate(radians(angle + top_angle));
  scale(sa2 + 0.15);
  scale(scaleFactor);

  var rwind = rotate_point(wind_x, wind_y, -(angle + top_angle));

  beginShape();
  vertex(0,0);
  bezierVertex(16, 5, 39, -8, 30 - tip_delta.x + rwind.x, -40 + tip_delta.y + rwind.y);
  bezierVertex(-5, -41, -4, -6, 0, 0);
  endShape();
  popMatrix();
};

float second_layer (frame) {
  fill(65, 164, 235);
  var top_angle = -frame/35;
  sa2 = 1 + (size_easing(frame) * 0.2);

  var tip_delta = wave_tip(frame);

  second_layer_petals(0, top_angle, tip_delta);
  second_layer_petals(72, top_angle, tip_delta);
  second_layer_petals(144, top_angle, tip_delta);
  second_layer_petals(216, top_angle, tip_delta);
  second_layer_petals(288, top_angle, tip_delta);
};

float third_layer_petals (angle, top_angle, tip_delta) {
  pushMatrix();
  translate(200, 200);
  rotate(radians(angle + top_angle));
  scale(sa3);
  scale(scaleFactor);

  var rwind = rotate_point(wind_x, wind_y, -(angle + top_angle));
  rwind.x *= 0.5;
  rwind.y *= 0.5;

  beginShape();
  vertex(0,0);
  bezierVertex(67, -1, 76 + rwind.x, -85 + rwind.y, 39 + rwind.x, -57 + rwind.y);
  bezierVertex(51 + rwind.x, -96 + rwind.y, -27 + rwind.x, -57 + rwind.y, 0, 0);
  endShape();
  popMatrix();
};

float third_layer (frame) {
  fill(52, 219, 66);
  var top_angle = frame/25;
  sa3 = 1 + (size_easing(frame) * 0.2);

  var tip_delta = wave_tip(frame);

  third_layer_petals(0, top_angle, tip_delta);
  third_layer_petals(72, top_angle, tip_delta);
  third_layer_petals(144, top_angle, tip_delta);
  third_layer_petals(216, top_angle, tip_delta);
  third_layer_petals(288, top_angle, tip_delta);

};

float fourth_layer_petals (angle, top_angle, tip_delta) {
  pushMatrix();
  translate(200, 200);
  rotate(radians(angle + top_angle));
  scale(sa4);
  scale(scaleFactor);

  var rwind = rotate_point(wind_x, wind_y, -(angle + top_angle));
  rwind.x *= 0.5;
  rwind.y *= 0.5;

  beginShape();
  vertex(0, 0);
  bezierVertex(77, -69, 71 + rwind.x, -128 + rwind.y, 0 + rwind.x, -92 + rwind.y);
  bezierVertex(-50 + rwind.x, -128 + rwind.y, -81 + rwind.x, -75 + rwind.y, 0, 0);
  endShape();
  popMatrix();
};

float fourth_layer (frame) {
  fill(245, 202, 59);
  var top_angle = -frame/30;

  var tip_delta = wave_tip(frame);
  sa4 = 1 + (size_easing(frame) * 0.2);

  fourth_layer_petals(0, top_angle, tip_delta);
  fourth_layer_petals(72, top_angle, tip_delta);
  fourth_layer_petals(144, top_angle, tip_delta);
  fourth_layer_petals(216, top_angle, tip_delta);
  fourth_layer_petals(288, top_angle, tip_delta);
};

float fifth_layer_petals (angle, top_angle, tip_delta) {
  pushMatrix();
  translate(200, 200);
  rotate(radians(angle + top_angle));
  scale(sa5);
  scale(scaleFactor);

  var rwind = rotate_point(wind_x, wind_y, -(angle + top_angle));

  beginShape();
  vertex(0, 0);
  bezierVertex(150, 0, 115, -98, 110 - tip_delta.x * 2 + rwind.x, -150 + tip_delta.y * 2 + rwind.y);
  bezierVertex(66, -124, -30, -170, 0, 0);
  endShape();
  popMatrix();
};

float fifth_layer (frame) {
  fill(241, 81, 247);
  var top_angle = -frame/50;
  sa5 = 1 + (size_easing(frame) * 0.2);

  var tip_delta = wave_tip(frame);

  fifth_layer_petals(0, top_angle, tip_delta);
  fifth_layer_petals(72, top_angle, tip_delta);
  fifth_layer_petals(144, top_angle, tip_delta);
  fifth_layer_petals(216, top_angle, tip_delta);
  fifth_layer_petals(288, top_angle, tip_delta);
};

void setup() {
    size(400, 400);
}

void draw () {
  background(201, 247, 255);

  frame += 1;

  var wind_delta = 5;

  if (keyPressed && keyCode === RIGHT) {
    wind_x += wind_delta;
  }

  if(keyPressed && keyCode === UP) {
    wind_y -= wind_delta;
  }

  if (keyPressed && keyCode === DOWN) {
    wind_y += wind_delta;
  }

  if(keyPressed && keyCode === LEFT) {
    wind_x -= wind_delta;
  }

  wind_x *= 0.9;
  wind_y *= 0.9;

  fifth_layer(frame);
  fourth_layer(frame);
  third_layer(frame);
  second_layer(frame);
  first_layer(frame);
  center(frame);
};
