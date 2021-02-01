import Particle from './particle.js';

function loadImages(paths, whenLoaded) {
  const imgs = [];
  const imgO = [];
  paths.forEach(function(path) {
      const img = new Image();
      img.onload = function () {
          imgs.push(img);
          imgO.push({path,img});
          if (imgs.length === paths.length) whenLoaded(imgO);
      };
      img.src = path;
  });
}

class Sketch {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);
    
    this.width = document.documentElement.clientWidth;
    this.height = document.documentElement.clientHeight;
    
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.time = 0;
    this.particles = [];
    this.raf();
    this.mousemove();
    this.x = 0;
    this.y = 0;

    this.colors = [
      '#e154ed',
      '#63d62b',
      '#23b1b6',
      '#ebbs3e',
      '#000000',
    ];

    loadImages(['1.png'],(images)=> {
      console.log(images);
      // this.images = images;
      this.img = images[0].img;
      // this.raf();
      // this.mousemove();
    });
  }

  randomColor() {
    return this.colors[Math.floor(Math.random()*this.colors.length)];
  }

  mousemove() {
    this.canvas.addEventListener('mousemove',(e)=> {
      // console.log(e.clientX,e.clientY);
      let x = e.clientX;
      let y = e.clientY;

      let dx = x - this.x;
      let dy = y - this.y;

      let distCenter = Math.sqrt((x-this.width/2)**2 + (y-this.height/2)**2);
      distCenter /= Math.sqrt((this.width/2)**2 + (this.height/2)**2);
      distCenter = 1 - distCenter;
      let velX = Math.floor(dx/5 + 3*(Math.random() - 0.5));
      let velY = Math.floor(dy/5 + 3*(Math.random() - 0.5));
      for(let i = 0; i < 6; i++) {
        this.particles.push(
          new Particle(
            this.img, x, y, this.randomColor(), velX, velY, 11, 
          )
        );
      }

      this.x = x;
      this.y = y;
      
    })
  }

  raf() {
    this.time++;
    // console.log(this.time);
    this.ctx.clearRect(0,0,this.width,this.height)
    // this.ctx.fillRect(this.x,this.y,100,100);
    this.particles.forEach((p,i)=> {
      if(p.life>0) {
        p.draw(this.ctx);
      } else {
        this.particles.splice(i, 1);
      }
    })
    window.requestAnimationFrame(this.raf.bind(this));
  }
}
new Sketch();