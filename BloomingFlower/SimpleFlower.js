var scaleFactor = 1;

void center () {
  stroke(255, 255, 255);
  fill(0, 0, 0);
  ellipse(200, 205, 15, 15);
};

float first_layer_petals (angle) {
  pushMatrix();
  translate(200, 200);
  rotate(radians(angle));
  scale(scaleFactor);

  beginShape();
  vertex(0,-5);
  bezierVertex(22,-26,13,-36,-2,-50);
  bezierVertex(-6,-24,-24,-31,0,-5);
  endShape();
  popMatrix();
};

float first_layer () {
  first_layer_petals(0);
  first_layer_petals(72);
  first_layer_petals(144);
  first_layer_petals(216);
  first_layer_petals(288);
};

float second_layer_petals (angle) {
  pushMatrix();
  translate(200, 200);
  rotate(radians(angle));
  scale(scaleFactor);

  beginShape();
  vertex(30,-40);
  bezierVertex(39,-8,16,5,0,0);
  bezierVertex(-4,-6,-5,-41,30,-40);
  endShape();
  popMatrix();
};

float second_layer () {
  second_layer_petals(0);
  second_layer_petals(72);
  second_layer_petals(144);
  second_layer_petals(216);
  second_layer_petals(288);
};

float third_layer_petals (angle) {
  pushMatrix();
  translate(200, 200);
  rotate(radians(angle));
  scale(scaleFactor);

  beginShape();
  vertex(39, -57);
  bezierVertex(76, -85, 67, -1, 0, 0);
  bezierVertex(-27, -57, 51, -96, 39, -57);
  endShape();
  popMatrix();
};

float third_layer () {
  third_layer_petals(0);
  third_layer_petals(72);
  third_layer_petals(144);
  third_layer_petals(216);
  third_layer_petals(288);
};

float fourth_layer_petals (angle) {
  pushMatrix();
  translate(200, 200);
  rotate(radians(angle));
  scale(scaleFactor);

  beginShape();
  vertex(0,-92);
  bezierVertex(71,-128,77,-69,0,0);
  bezierVertex(-81,-75,-50,-128,0,-92);
  endShape();
  popMatrix();
};

float fourth_layer () {
  fourth_layer_petals(0);
  fourth_layer_petals(72);
  fourth_layer_petals(144);
  fourth_layer_petals(216);
  fourth_layer_petals(288);
};

float fifth_layer_petals (angle) {
  pushMatrix();
  translate(200, 200);
  rotate(radians(angle));
  scale(scaleFactor);

  beginShape();
  vertex(110, -150);
  bezierVertex(115, -98, 150, 0, 0, 0);
  bezierVertex(-30, -170, 66, -124, 110, -150);
  endShape();
  popMatrix();
};

float fifth_layer () {
  fifth_layer_petals(0);
  fifth_layer_petals(72);
  fifth_layer_petals(144);
  fifth_layer_petals(216);
  fifth_layer_petals(288);
};

void setup () {
  size(400, 400);
}

void draw () {
  background(0, 0, 0);

  fifth_layer();
  fourth_layer();
  third_layer();
  second_layer();
  first_layer();
  center();
};
