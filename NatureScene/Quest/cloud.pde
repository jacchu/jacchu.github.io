public class Cloud implements Display {
  float x;
  float y;
  float scale;
  float trans;
  float rate;
  Rain rain;
  boolean isRaining = false;

  
  public Cloud() {
    this.x = random(0, width + width/10);
    this.y = random(0, height/3); 
    this.scale = random(-10, 10);
    this.trans = random(100, 255);
    this.rate = random(0.1, 1);
    this.rain = new Rain(this.x, this.y);
  }
  
  public void startRaining() {
    this.isRaining = true;
  }
  
  public void display() {
     if (this.isRaining) {
       rain.move(x, y);
       rain.display();
       fill(104, 100, 104, this.trans);
     }
     else{
       fill(255, 255, 255, this.trans);
     }

    noStroke();
    ellipse(155 + this.x, 1 + this.y, 50 + this.scale, 50 + this.scale);
    ellipse(185 + this.x, 14 + this.y, 35 + this.scale, 35 + this.scale);
    ellipse(128 + this.x, this.y, 25 + this.scale, 25 + this.scale);
    
    x = x - this.rate;
    if( x < -300) {
        y = y + random(-20, 20);
        x = width + width/2;
    }
  }
}