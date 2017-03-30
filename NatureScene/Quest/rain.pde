public class Rain implements Display {
  float x;
  float y;
  float wIdth;
  float hEight;
  float depth;
  float speed;
  float spacing;
  int numRain;
  float[] rain;
  
  public Rain(float x, float y) {
    this.x = x;
    this.y = y; 
    this.wIdth = 3;
    this.hEight = 5;
    this.depth = random(height/2, height/2 + 100);
    this.speed = 0.01;
    this.spacing = 2;
    this.numRain = 40;
  }
  
  public void move(float x, float y) {
     this.x = x;
     this.y = y;
  }   
  
  public void display() {
    rain = new float[this.numRain];
    for (int index = 0; index < this.numRain; ++index) {
      rain[index] = random(y, this.depth);  
    }
    
    noStroke();
    fill(51, 102, 255);
    for (int index = 0; index < this.numRain; ++index) {
        ellipse(x + 120 +(index * this.spacing), rain[index], this.wIdth, this.hEight);
        rain[index] += this.speed;
        if (rain[index] > height) {
            rain[index] = this.y + 10;  
        }
    }
  }
}