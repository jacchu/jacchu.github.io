public class Tree implements Display {
  float x;
  float y;
  float wIdth;
  float xstretch;
  float hEight;
  float ystretch;
  float treeopacity;
  float fireopacity;
  boolean oPacity = false;
  boolean fopacity = false;
  boolean burns = false;
  float scale;
  float tint;
  PImage flames;
  
  public Tree(PImage flames) {
    if (random(0,1) > 0.5) {
      this.x = random(-50, width/2 - 50);
    } else {
      this.x = random(width/2 + 50, width + 50);
    }
    this.y = random(height/2, height - 50);
    this.wIdth = 10;
    this.xstretch = 34;
    this.hEight = 52;
    this.ystretch = 63;
    this.treeopacity = 255;
    this.fireopacity = 255;
    this.scale = random(0.05, 0.07);
    this.flames = flames;
    this.flames.resize(0, round(this.flames.height * this.scale));
  }
  
  public void opacity() {
    this.oPacity = true;
    this.treeopacity = 255;
    this.fireopacity = 255;
  }
  
  public void fadeopacity(boolean fopacity) {
    this.fopacity = fopacity;
  }
  
  public void burning(boolean burns) {
    if(this.oPacity) {
      this.burns = burns;
    }
  }
  
  public void display() {
    if (this.oPacity) {
      fill(102, 73, 37, this.treeopacity);
      rect(this.x - this.wIdth/2, this.y, this.wIdth, this.hEight);
      fill(0, 153, 51, this.treeopacity);
      triangle(this.x, y-ystretch, this.x-xstretch, y+xstretch, this.x+xstretch, y+xstretch); 
    }  
    if (this.burns) {
      tint(255, this.fireopacity);
      image(this.flames, this.x-(this.flames.width/2), this.y+(this.flames.height/4));
      tint(255, 255);
    }
    
    if (this.fopacity) {
      treeopacity = treeopacity - 1;
      fireopacity = fireopacity - 1;
    }
  }
}