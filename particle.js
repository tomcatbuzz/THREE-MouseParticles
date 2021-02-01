export default class Particle {
  constructor(img,x,y,color,velX,velY,size) {
    this.x = x;
    this.y = y;
    this.velX = velX
    this.velY = velY;
    this.img = img;
    this.defaultSize = 10;
    this.life = 10 + 5*Math.random();
    this.maxLife = 10;
    this.color = color;
    this.grav = 0;
    this.rotation = Math.random()*Math.PI;
  }

  draw(ctx) {
    this.x +=this.velX;
    this.y +=this.velY + this.grav;
    this.velX *=0.99;
    this.velY *=0.99;
    this.grav +=0.01;
    this.life -=0.1;
    this.rotation += this.life/100;
    this.size = this.defaultSize*this.life/this.maxLife;
    ctx.fillStyle = this.color;
    ctx.save();
    ctx.translate(this.x,this.y);
    ctx.rotate(this.rotation);
    ctx.fillRect(-this.size,-this.size,this.size,this.size);
    // ctx.drawImage(this.img,-this.size,-this.size,this.size,this.size);
    ctx.restore();
  }
}