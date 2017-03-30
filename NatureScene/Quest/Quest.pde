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
    PImage flames = loadImage("flames.png");
    Cloud cloud = new Cloud();
    Tree tree = new Tree(flames);
    images.add(cloud);
    canRain.add(cloud);
    opacity.add(tree);
    images.add(tree);
  }
  
  for(int index = 0; index < 2; ++ index) {
    PImage rain = loadImage("rain.png");
    PImage tree = loadImage("tree.png");
    PImage fire = loadImage("fire.png");
    PImage moon = loadImage("moon.png");
    PImage sun = loadImage("sun.png");
    
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
  rainbow = loadImage("rainbow.png");
}

void draw () {
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
      if (random(0,1) > 0.9) {
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