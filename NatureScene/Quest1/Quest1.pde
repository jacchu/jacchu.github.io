PImage rainbow;
ArrayList<Display> images;
ArrayList<Cloud> canRain;
ArrayList<Characters> raining;
ArrayList<Characters> displayTree;
ArrayList<Characters> nightChange;
ArrayList<Characters> dayChange;
ArrayList<Characters> startFire;
ArrayList<Tree> opacity;
int raintimer = 0;
int firetimer = 0;
int dampfire = 0;
boolean day = true;
int rainbow_opacity = 0;
int rainbowtimer = 0;
boolean showbow = true;

void bundle() {
  images = new ArrayList<Display>();
  canRain = new ArrayList<Cloud>();
  raining = new ArrayList<Characters>();
  displayTree = new ArrayList<Characters>();
  nightChange = new ArrayList<Characters>();
  dayChange = new ArrayList<Characters>();
  startFire = new ArrayList<Characters>();
  opacity = new ArrayList<Tree>();
  
  for (int index = 0; index < 20; ++ index) {
    PImage flames = loadImage("https://github.com/jacchu/jacchu.github.io/blob/master/NatureScene/flames%20copy.png");
    Cloud cloud = new Cloud();
    Tree tree = new Tree(flames);
    images.add(cloud);
    canRain.add(cloud);
    opacity.add(tree);
    images.add(tree);
  }
  
  for(int index = 0; index < 2; ++ index) {
    PImage rain = loadImage("https://github.com/jacchu/jacchu.github.io/blob/master/NatureScene/rain%20copy.png");
    PImage tree = loadImage("https://github.com/jacchu/jacchu.github.io/blob/master/NatureScene/tree%20copy.png");
    PImage fire = loadImage("https://github.com/jacchu/jacchu.github.io/blob/master/NatureScene/fire%20copy.png");
    PImage moon = loadImage("https://github.com/jacchu/jacchu.github.io/blob/master/NatureScene/moon%20copy.png");
    PImage sun = loadImage("https://github.com/jacchu/jacchu.github.io/blob/master/NatureScene/sun%20copy.png");
    
    Characters charactersRain = new Characters(rain);
    Characters charactersTree = new Characters(tree);
    Characters charactersNight = new Characters(moon);
    Characters charactersDay = new Characters(sun);
    Characters charactersFire = new Characters(fire);
    
    images.add(charactersRain);
    raining.add(charactersRain);
    
    images.add(charactersTree);
    displayTree.add(charactersTree);
    
    images.add(charactersNight);
    nightChange.add(charactersNight);
    
    images.add(charactersDay);
    dayChange.add(charactersDay);
    
    images.add(charactersFire);
    startFire.add(charactersFire);
  }
}

void setup () {
  size(1280, 755);
  bundle();
  rainbow = loadImage("https://github.com/jacchu/jacchu.github.io/blob/master/NatureScene/rainbow%20copy.png");
}

void draw () {
  noStroke();
  if(day == true) {
    background(130, 202, 250);
    fill(255, 255, 0);
    ellipse(100, 100, 150, 150);
    fill(77, 189, 51);
  }
  if(day == false) {
    background(0, 51, 128);
    fill(191, 191, 191);
    ellipse(100, 100, 150, 150);
    fill(0, 51, 128);
    ellipse(150, 100, 150, 150);
    fill(37, 110, 17);
    rainbow_opacity = 0;
    rainbowtimer = 0;
  }
  
  noStroke();
  rect(0, height/2, width, height/2);

  if (raintimer >= 1) {
    raintimer += 1;
    if(showbow) {
      rainbowtimer = 1;
    }
  }
  if (raintimer > 300) {
    for (int index = 0; index <= canRain.size() - 1; index++) {
      Cloud cloud_element = canRain.get(index);
      cloud_element.isRaining = false;
    }
    raintimer = 0;
  }   
  if (rainbowtimer >= 1 && rainbowtimer < 100 && day == true) {
    rainbow_opacity += 1;
    rainbowtimer += 1;
    if (rainbow_opacity > 255) {
      rainbow_opacity = 255;
    }
  }
  if (rainbowtimer == 100) {
    rainbow_opacity -= 1;
    if (rainbow_opacity < 0) {
      rainbow_opacity = 0;
    }
  }

  tint(255, rainbow_opacity);
  rainbow.resize(0, height/2);
  image(rainbow, width - rainbow.width, 0);
  tint(255, 255);
    
  
  if (firetimer >= 1) {
    firetimer += 1;
  }
  if (firetimer > 100) {
    for(Tree thing: opacity) {
       thing.fadeopacity(true);
    }
    firetimer = 0;
  }
  
  if (dampfire >= 1){
    dampfire += 1;
  }
  if(dampfire > 50) {
    for(Tree thing: opacity) {
      thing.burning(false);
    }
    dampfire = 0;
  }
  
  for (Display thing: images) {
    thing.display();
  }
}

void mousePressed () {
  for (Characters character: raining) {
    if(character.mouseZone() == true) {
      raintimer = 1;
      if (random(0,1) > 0.1) {
        showbow = true;
      } else {
        showbow = false;
      }
      for (Cloud thing: canRain) {
        thing.startRaining();
      }
      for (Tree thing: opacity) {
        thing.fadeopacity(false);
        thing.fopacity = false;
        thing.burning(false);
      }
    }
  }
  for(Characters character: displayTree) {
    if(character.mouseZone() == true) {
      for(Tree thing: opacity) {
        thing.burning(false);
        thing.opacity();
        thing.fadeopacity(false);
        firetimer = 0;
      }
    }
  }
  for(Characters character: startFire) {
    if(character.mouseZone() == true) {
      for(Tree thing: opacity) {
        thing.burning(true);
        thing.fadeopacity(false);
      }
      firetimer = 1;
      dampfire = 0;
      for(Cloud cloud: canRain) {
        for (Tree tree: opacity) {
          tree.burning(true);
        }
        if (cloud.isRaining == true) {
          firetimer = 0;
          dampfire = 1;
        }
      } 
    }
  }
  for(Characters character: nightChange) {
    if(character.mouseZone() == true) {
      day = false;
    }
  }
  for(Characters character: dayChange) {
    if(character.mouseZone() == true) {
      day = true;
    }
  }
}

public interface Display {
  public void display();
}

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