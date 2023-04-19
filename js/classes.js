// For images or animation
class Sprite
{
constructor({position,imgSrc,scale=1,maxFrames=1,offset={x:0,y:0}})
{
this.position=position;
// this.height=150;
// this.width=40
this.image=new Image();
this.image.src=imgSrc;
this.scale=scale;
this.maxFrames=maxFrames;
this.currentFrame=0;
this.elaspsedFrames=0;
this.holdFrames=5
this.offset=offset
}
draw()
{
   ctx.drawImage(
    this.image,
    this.currentFrame*this.image.width/this.maxFrames,
    0,
    this.image.width/this.maxFrames,
    this.image.height,
    this.position.x-this.offset.x,
    this.position.y-this.offset.y,
    this.image.width/this.maxFrames*this.scale,
    this.image.height*this.scale); 
}
animate()
{
    this.elaspsedFrames++;
    if(this.elaspsedFrames%this.holdFrames==0)
    {
      if(this.currentFrame<this.maxFrames-1)
     {
        this.currentFrame++;
     }
      else
     {
        this.currentFrame=0;
     }
    }
}
update()
{
    this.draw();
    this.animate();
}

}
//  For Player
class Fighter extends Sprite
{
constructor({position,velocity,color,offset,imgSrc,scale=1,maxFrames=1,sprites,attackBox={offset:{},width:undefined,height:undefined}})
{
    super({
        position,
        imgSrc,
        scale,
        maxFrames,
        offset,
    }
    )
this.velocity=velocity;
this.color=color 
this.height=150;
this.width=40
this.healthScore=100
this.lastKey
this.death=false
this.attackBox={
    position:{
        x : this.position.x,
        y : this.position.y 
    },
    // Offest is used to fix attackBox position for enemy & player
    offset:attackBox.offset,  
    width:attackBox.width,
    height:attackBox.height,     
   
}
this.isAttacking=false
this.currentFrame=0;
this.sprites=sprites
for(const sprite in sprites)
{
    sprites[sprite].image= new Image(),
    sprites[sprite].image.src= sprites[sprite].imgSrc
    // console.log(this.sprites);
}

}


update()
{
    this.draw();
    if(!this.death)
    {this.animate();
    }
    // attack boxes
    this.attackBox.position.x=this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y=this.position.y+this.attackBox.offset.y;

    
    
    if(this.position.y+this.height+this.velocity.y>=canvas.height-120)
    {
        this.velocity.y=0;
        this.position.y=430; 
    }
   
    else{
        this.velocity.y+=gravity;
    }
    // console.log(this.position.y);
    this.position.y+=this.velocity.y;
    this.position.x+=this.velocity.x;
}
attack()
{
    this.switchSprites('attack')

    this.isAttacking=true;
    // setTimeout(()=>{
    //     this.isAttacking=false;
    // },1000)
}
takeHit()
{
    this.healthScore-=10
    if(this.healthScore<=0)
    {
    this.switchSprites("death");
   }
   else{
    this.switchSprites("takeHit");

   }
}
switchSprites(sprite)
{    
// over all other animation with attack animation
if(this.image===this.sprites.attack.image&&
    this.currentFrame<this.maxFrames-1 )
 {
    return;
 }
// over all other animation with takeHit animation

 if(this.image===this.sprites.takeHit.image&&
    this.currentFrame<this.maxFrames-1 )
 {
    return;
 }
// over all other animation with death animation

 if(this.image===this.sprites.death.image )
 {
 if( this.currentFrame===this.maxFrames-1 )
    this.death=true;
     return;
 }
        
switch (sprite)
 {
    case "idle":
        if(this.image!=this.sprites.idle.image)
        {
            this.image=this.sprites.idle.image;
            this.maxFrames=this.sprites.idle.maxFrames
            this.currentFrame=0
        }
        break;
 
    case "run" :
        if(this.image!=this.sprites.run.image)
        {
            this.image=this.sprites.run.image;
            this.maxFrames=this.sprites.run.maxFrames
            this.currentFrame=0
        }
        break;

    case "jump":
        if(this.image!=this.sprites.jump.image)
            {
            this.image=this.sprites.jump.image;
                this.maxFrames=this.sprites.jump.maxFrames
                this.currentFrame=0
            }
        break;  
        
    case "fall":
        if(this.image!=this.sprites.fall.image)
            {
                this.image=this.sprites.fall.image;
                this.maxFrames=this.sprites.fall.maxFrames
                this.currentFrame=0
            }
            break;      
    
    case "attack":
        if(this.image!=this.sprites.attack.image)
             {
                this.image=this.sprites.attack.image;
             this.maxFrames=this.sprites.attack.maxFrames
                this.currentFrame=0
            }
            break;  
            
    case "takeHit":
        if(this.image!=this.sprites.takeHit.image)
             {
                this.image=this.sprites.takeHit.image;
             this.maxFrames=this.sprites.takeHit.maxFrames
                this.currentFrame=0
            }
            break; 
    case "death":
            if(this.image!=this.sprites.death.image)
             {
                this.image=this.sprites.death.image;
                this.maxFrames=this.sprites.death.maxFrames
                this.currentFrame=0
            }
            break;  
}
}
}
