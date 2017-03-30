var frame = 0;

void center () {
  fill(157, 204, 37);
  ellipse(200, 200, 15, 15);
};

var uno_i1 = { cx1: 32, cy1:  -4, cx2:  32, cy2: -48, x2: -1, y2: -50 };
var uno_i2 = { cx1:-37, cy1: -47, cx2: -30, cy2:  -1, x2:  0, y2:   0 };

var dos_i1 = { cx1: 25, cy1:  21, cx2:  56, cy2: -18, x2: 30, y2: -40 };
var dos_i2 = { cx2:  5, cy2: -59, cx1: -24, cy1: -26, x2:  0, y2:   0 };

var tres_i1 = { cx1: 31, cy1:  28, cx2:  74, cy2: -23, x2: 39, y2: -57 };
var tres_i2 = { cx2:  9, cy2: -83, cx1: -32, cy1: -35, x2:  0, y2:   0 };

var cuatro_i1 = { cx1: 52, cy1:  4, cx2:  55, cy2: -89, x2: 0, y2: -92 };
var cuatro_i2 = { cx2:-57, cy2:-93, cx1: -51, cy1:  -1, x2:  0, y2:  0 };

var cinco_i1 = { cx1: 64, cy1: 68, cx2: 151, cy2: -74, x2: 121, y2: -133 };
var cinco_i2 = { cx1: 59, cy1: -162, cx2: -73, cy2: -70, x2:  0, y2:  0 };

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

float first_layer_petals (angle, top_angle, tip_delta, uno_c1, uno_c2) {
  pushMatrix();
  translate(200, 200);
  rotate(radians(angle + top_angle));
  scale(sa1);
  scale(scaleFactor);

  var rwind = rotate_point(wind_x, wind_y, -(angle + top_angle));

  beginShape();
  vertex(0,0);
  bezierVertex(uno_c1.cx1, uno_c1.cy1, uno_c1.cx2, uno_c1.cy2, uno_c1.x2 + tip_delta.x + rwind.x, uno_c1.y2 + tip_delta.y + rwind.y);
  bezierVertex(uno_c2.cx1, uno_c2.cy1, uno_c2.cx2, uno_c2.cy2, uno_c2.x2, uno_c2.y2);
  endShape();
  popMatrix();
};

float first_layer (frame) {
  fill(255, 0, 140);
  var top_angle = frame/20;
  sa1 = 1 + (size_easing(frame) * 0.2);

  var tip_delta = wave_tip(frame);

  var uno_final1 = { cx1: 30, cy1: -26, cx2: 13, cy2: -36, x2: -2, y2: -50 };
  var uno_final2 = { cx2: -6, cy2: -24, cx1: -24, cy1: -31, x2: 0, y2: 0 };
  var uno_factor = (frame < 120) ? frame/120 : 1;

  var uno_c1 = {
    cx1: uno_i1.cx1 + uno_factor * (uno_final1.cx1 - uno_i1.cx1),
    cy1: uno_i1.cy1 + uno_factor * (uno_final1.cy1 - uno_i1.cy1),
    cx2: uno_i1.cx2 + uno_factor * (uno_final1.cx2 - uno_i1.cx2),
    cy2: uno_i1.cy2 + uno_factor * (uno_final1.cy2 - uno_i1.cy2),
    x2: uno_i1.x2 + uno_factor * (uno_final1.x2 - uno_i1.x2),
    y2: uno_i1.y2 + uno_factor * (uno_final1.y2 - uno_i1.y2)
  };
  var uno_c2 = {
    cx1: uno_i2.cx1 + uno_factor * (uno_final2.cx1 - uno_i2.cx1),
    cy1: uno_i2.cy1 + uno_factor * (uno_final2.cy1 - uno_i2.cy1),
    cx2: uno_i2.cx2 + uno_factor * (uno_final2.cx2 - uno_i2.cx2),
    cy2: uno_i2.cy2 + uno_factor * (uno_final2.cy2 - uno_i2.cy2),
    x2: uno_i2.x2 + uno_factor * (uno_final2.x2 - uno_i2.x2),
    y2: uno_i2.y2 + uno_factor * (uno_final2.y2 - uno_i2.y2)
  };

  first_layer_petals(0, top_angle, tip_delta, uno_c1, uno_c2);
  first_layer_petals(72, top_angle, tip_delta, uno_c1, uno_c2);
  first_layer_petals(144, top_angle, tip_delta, uno_c1, uno_c2);
  first_layer_petals(216, top_angle, tip_delta, uno_c1, uno_c2);
  first_layer_petals(288, top_angle, tip_delta, uno_c1, uno_c2);
};

float second_layer_petals (angle, top_angle, tip_delta, dos_c1, dos_c2) {
  pushMatrix();
  translate(200, 200);
  rotate(radians(angle + top_angle));
  scale(sa2 + 0.15);
  scale(scaleFactor);

  var rwind = rotate_point(wind_x, wind_y, -(angle + top_angle));

  beginShape();
  vertex(0,0);
  bezierVertex(dos_c1.cx1, dos_c1.cy1, dos_c1.cx2, dos_c1.cy2, dos_c1.x2 + tip_delta.x + rwind.x, dos_c1.y2 - tip_delta.y + rwind.y);
  bezierVertex(dos_c2.cx2, dos_c2.cy2, dos_c2.cx1, dos_c2.cy1, dos_c2.x2, dos_c2.y2);
  endShape();
  popMatrix();
};

float second_layer (frame) {
  fill(65, 164, 235);
  var top_angle = -frame/35;
  sa2 = 1 + (size_easing(frame) * 0.2);

  var tip_delta = wave_tip(frame);

  var dos_final1 = { cx1: 16, cy1: 5, cx2: 39, cy2: -8, x2: 30, y2: -40 };
  var dos_final2 = { cx2: -5, cy2: -41, cx1: -4, cy1: -6, x2: 0, y2:  0 };
  var dos_factor = (frame < 140) ? frame/140 : 1;

  var dos_c1 = {
    cx1: dos_i1.cx1 + dos_factor * (dos_final1.cx1 - dos_i1.cx1),
    cy1: dos_i1.cy1 + dos_factor * (dos_final1.cy1 - dos_i1.cy1),
    cx2: dos_i1.cx2 + dos_factor * (dos_final1.cx2 - dos_i1.cx2),
    cy2: dos_i1.cy2 + dos_factor * (dos_final1.cy2 - dos_i1.cy2),
    x2: dos_i1.x2 + dos_factor * (dos_final1.x2 - dos_i1.x2),
    y2: dos_i1.y2 + dos_factor * (dos_final1.y2 - dos_i1.y2)
  };
  var dos_c2 = {
    cx1: dos_i2.cx1 + dos_factor * (dos_final2.cx1 - dos_i2.cx1),
    cy1: dos_i2.cy1 + dos_factor * (dos_final2.cy1 - dos_i2.cy1),
    cx2: dos_i2.cx2 + dos_factor * (dos_final2.cx2 - dos_i2.cx2),
    cy2: dos_i2.cy2 + dos_factor * (dos_final2.cy2 - dos_i2.cy2),
    x2: dos_i2.x2 + dos_factor * (dos_final2.x2 - dos_i2.x2),
    y2: dos_i2.y2 + dos_factor * (dos_final2.y2 - dos_i2.y2)
  };

  second_layer_petals(0, top_angle, tip_delta, dos_c1, dos_c2);
  second_layer_petals(72, top_angle, tip_delta, dos_c1, dos_c2);
  second_layer_petals(144, top_angle, tip_delta, dos_c1, dos_c2);
  second_layer_petals(216, top_angle, tip_delta, dos_c1, dos_c2);
  second_layer_petals(288, top_angle, tip_delta, dos_c1, dos_c2);
};

float third_layer_petals (angle, top_angle, tip_delta, tres_c1, tres_c2) {
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
  bezierVertex(tres_c1.cx1, tres_c1.cy1, tres_c1.cx2 + rwind.x, tres_c1.cy2 + rwind.y, tres_c1.x2 + rwind.x, tres_c1.y2 + rwind.y);
  bezierVertex(tres_c2.cx2 + rwind.x, tres_c2.cy2 + rwind.y, tres_c2.cx1 + rwind.x, tres_c2.cy1 + rwind.y, tres_c2.x2, tres_c2.y2);
  endShape();
  popMatrix();
};

float third_layer (frame) {
  fill(52, 219, 66);
  var top_angle = frame/25;
  sa3 = 1 + (size_easing(frame) * 0.2);

  var tip_delta = wave_tip(frame);

  var tres_final1 = { cx1: 67, cy1: -1, cx2: 76, cy2: -85, x2: 39, y2: -57 };
  var tres_final2 = { cx2: 51, cy2: -96, cx1: -27, cy1: -57, x2: 0, y2:  0 };
  var tres_factor = (frame < 160) ? frame/160 : 1;

  var tres_c1 = {
    cx1: tres_i1.cx1 + tres_factor * (tres_final1.cx1 - tres_i1.cx1),
    cy1: tres_i1.cy1 + tres_factor * (tres_final1.cy1 - tres_i1.cy1),
    cx2: tres_i1.cx2 + tres_factor * (tres_final1.cx2 - tres_i1.cx2),
    cy2: tres_i1.cy2 + tres_factor * (tres_final1.cy2 - tres_i1.cy2),
    x2: tres_i1.x2 + tres_factor * (tres_final1.x2 - tres_i1.x2),
    y2: tres_i1.y2 + tres_factor * (tres_final1.y2 - tres_i1.y2)
  };
  var tres_c2 = {
    cx1: tres_i2.cx1 + tres_factor * (tres_final2.cx1 - tres_i2.cx1),
    cy1: tres_i2.cy1 + tres_factor * (tres_final2.cy1 - tres_i2.cy1),
    cx2: tres_i2.cx2 + tres_factor * (tres_final2.cx2 - tres_i2.cx2),
    cy2: tres_i2.cy2 + tres_factor * (tres_final2.cy2 - tres_i2.cy2),
    x2: tres_i2.x2 + tres_factor * (tres_final2.x2 - tres_i2.x2),
    y2: tres_i2.y2 + tres_factor * (tres_final2.y2 - tres_i2.y2)
  };

  third_layer_petals(0, top_angle, tip_delta, tres_c1, tres_c2);
  third_layer_petals(72, top_angle, tip_delta, tres_c1, tres_c2);
  third_layer_petals(144, top_angle, tip_delta, tres_c1, tres_c2);
  third_layer_petals(216, top_angle, tip_delta, tres_c1, tres_c2);
  third_layer_petals(288, top_angle, tip_delta, tres_c1, tres_c2);
};

float fourth_layer_petals (angle, top_angle, tip_delta, cuatro_c1, cuatro_c2) {
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
  bezierVertex(cuatro_c1.cx1, cuatro_c1.cy1, cuatro_c1.cx2 + rwind.x, cuatro_c1.cy2 + rwind.y, cuatro_c1.x2 + rwind.x, cuatro_c1.y2 + rwind.y);
  bezierVertex(cuatro_c2.cx2 + rwind.x, cuatro_c2.cy2 + rwind.y, cuatro_c2.cx1 + rwind.x, cuatro_c2.cy1 + rwind.y, cuatro_c2.x2, cuatro_c2.y2);
  endShape();
  popMatrix();
};

float fourth_layer (frame) {
  fill(245, 202, 59);
  var top_angle = -frame/30;
  sa4 = 1 + (size_easing(frame) * 0.2);

  var tip_delta = wave_tip(frame);

  var cuatro_final1 = { cx1: 77, cy1: -69, cx2: 71, cy2: -128, x2: 0, y2: -92 };
  var cuatro_final2 = { cx2: -50, cy2: -128, cx1: -81, cy1: -75, x2: 0, y2:  0 };
  var cuatro_factor = (frame < 180) ? frame/180 : 1;

  var cuatro_c1 = {
    cx1: cuatro_i1.cx1 + cuatro_factor * (cuatro_final1.cx1 - cuatro_i1.cx1),
    cy1: cuatro_i1.cy1 + cuatro_factor * (cuatro_final1.cy1 - cuatro_i1.cy1),
    cx2: cuatro_i1.cx2 + cuatro_factor * (cuatro_final1.cx2 - cuatro_i1.cx2),
    cy2: cuatro_i1.cy2 + cuatro_factor * (cuatro_final1.cy2 - cuatro_i1.cy2),
    x2: cuatro_i1.x2 + cuatro_factor * (cuatro_final1.x2 - cuatro_i1.x2),
    y2: cuatro_i1.y2 + cuatro_factor * (cuatro_final1.y2 - cuatro_i1.y2)
  };
  var cuatro_c2 = {
    cx1: cuatro_i2.cx1 + cuatro_factor * (cuatro_final2.cx1 - cuatro_i2.cx1),
    cy1: cuatro_i2.cy1 + cuatro_factor * (cuatro_final2.cy1 - cuatro_i2.cy1),
    cx2: cuatro_i2.cx2 + cuatro_factor * (cuatro_final2.cx2 - cuatro_i2.cx2),
    cy2: cuatro_i2.cy2 + cuatro_factor * (cuatro_final2.cy2 - cuatro_i2.cy2),
    x2: cuatro_i2.x2 + cuatro_factor * (cuatro_final2.x2 - cuatro_i2.x2),
    y2: cuatro_i2.y2 + cuatro_factor * (cuatro_final2.y2 - cuatro_i2.y2)
  };

  fourth_layer_petals(0, top_angle, tip_delta, cuatro_c1, cuatro_c2);
  fourth_layer_petals(72, top_angle, tip_delta, cuatro_c1, cuatro_c2);
  fourth_layer_petals(144, top_angle, tip_delta, cuatro_c1, cuatro_c2);
  fourth_layer_petals(216, top_angle, tip_delta, cuatro_c1, cuatro_c2);
  fourth_layer_petals(288, top_angle, tip_delta, cuatro_c1, cuatro_c2);
};

float fifth_layer_petals (angle, top_angle, tip_delta, cinco_c1, cinco_c2) {
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
  bezierVertex(cinco_c1.cx1, cinco_c1.cy1, cinco_c1.cx2 + rwind.x, cinco_c1.cy2 + rwind.y, cinco_c1.x2 + rwind.x, cinco_c1.y2 + rwind.y);
  bezierVertex(cinco_c2.cx1 + rwind.x, cinco_c2.cy1 + rwind.y, cinco_c2.cx2 + rwind.x, cinco_c2.cy2 + rwind.y, cinco_c2.x2, cinco_c2.y2);
  endShape();
  popMatrix();
};

float fifth_layer (frame) {
  fill(241, 81, 247);
  var top_angle = -frame/50;
  sa5 = 1 + (size_easing(frame) * 0.2);

  var tip_delta = wave_tip(frame);

  var cinco_final1 = { cx1: 150, cy1: 0, cx2: 115, cy2: -98, x2: 110, y2: -150 };
  var cinco_final2 = { cx1: 66, cy1: -124, cx2: -30, cy2: -170, x2: 0, y2:  0 };
  var cinco_factor = (frame < 200) ? frame/200 : 1;

  var cinco_c1 = {
    cx1: cinco_i1.cx1 + cinco_factor * (cinco_final1.cx1 - cinco_i1.cx1),
    cy1: cinco_i1.cy1 + cinco_factor * (cinco_final1.cy1 - cinco_i1.cy1),
    cx2: cinco_i1.cx2 + cinco_factor * (cinco_final1.cx2 - cinco_i1.cx2),
    cy2: cinco_i1.cy2 + cinco_factor * (cinco_final1.cy2 - cinco_i1.cy2),
    x2: cinco_i1.x2 + cinco_factor * (cinco_final1.x2 - cinco_i1.x2),
    y2: cinco_i1.y2 + cinco_factor * (cinco_final1.y2 - cinco_i1.y2)
  };
  var cinco_c2 = {
    cx1: cinco_i2.cx1 + cinco_factor * (cinco_final2.cx1 - cinco_i2.cx1),
    cy1: cinco_i2.cy1 + cinco_factor * (cinco_final2.cy1 - cinco_i2.cy1),
    cx2: cinco_i2.cx2 + cinco_factor * (cinco_final2.cx2 - cinco_i2.cx2),
    cy2: cinco_i2.cy2 + cinco_factor * (cinco_final2.cy2 - cinco_i2.cy2),
    x2: cinco_i2.x2 + cinco_factor * (cinco_final2.x2 - cinco_i2.x2),
    y2: cinco_i2.y2 + cinco_factor * (cinco_final2.y2 - cinco_i2.y2)
  };

  fifth_layer_petals(0, top_angle, tip_delta, cinco_c1, cinco_c2);
  fifth_layer_petals(72, top_angle, tip_delta, cinco_c1, cinco_c2);
  fifth_layer_petals(144, top_angle, tip_delta, cinco_c1, cinco_c2);
  fifth_layer_petals(216, top_angle, tip_delta, cinco_c1, cinco_c2);
  fifth_layer_petals(288, top_angle, tip_delta, cinco_c1, cinco_c2);
};

void setup () {
  size(400, 400);
}

void draw () {
  background(201, 247, 255);

  frame += 1;

  var wind_delta = 5;

  if (frame > 250) {
    frame = 0;
  }

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
