public class Characters implements Display {
  float x;
  float y;
  float scale;
  float rate;
  PImage image;
  
  public Characters(PImage image) {
    this.x = random(25, width - 25);
    this.y = random(-400, height - 200);
    this.scale = random(0.03, 0.06);
    this.rate = random(0.5, 1);
    this.image = image;
    this.image.resize(0, round(this.image.height * this.scale));
  }
  
  public float getX() {
    return this.x;
  }
  public float getY() {
    return this.y;
  }
  public float getWidth() {
    return image.width;
  }
  public float getHeight() {
    return image.height;
  }
  
  public boolean mouseZone() {
    if(mouseX > this.getX() && mouseX < this.getX() + this.getWidth() 
       && mouseY > this.getY() && mouseY < this.getY() + this.getHeight()){
         return true;
       }
    return false;
  }
  
  public void display() {
    image(image, this.x, this.y);
    y = y + this.rate;
    if( y > height + 100) {
        y = random(-400, -50);
    }
  }   
}