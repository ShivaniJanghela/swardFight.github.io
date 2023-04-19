let canvas = document.querySelector("canvas");
let enemyHealth= document.querySelector(".enemyHealth")
let playerHealth= document.querySelector(".playerHealth")
let timer= document.querySelector(".timer");
let result=document.querySelector(".result");
let ctx=canvas.getContext("2d");
canvas.width=1472;
canvas.height=700.9;
ctx.fillRect(0,0,canvas.width,canvas.height);

// Setting images though Class Sprite
let background = new Sprite({
    position:{
        x:0,
        y:0
    },
    imgSrc:"./imgs/background.png",
})
let shop = new Sprite({
    position:{
        x:950,
        y:200
    },
    imgSrc:"./imgs/shop.png",
    scale:3,
    maxFrames:6

})


//creating players though Class Fighter
let gravity=0.7;
let player = new Fighter(
{
   position: {
    x:0,
    y:0
},
   velocity:{
    x:0,
    y:0
},

// color:"red",
imgSrc:"./imgs/player1/Idle.png",
maxFrames:8,
scale:2.5,
attackBox:{
    offset:{
        x:100,
        y:50
    },
    width:160,
    height:50
},
offset:{
    x:215,
    y:157
},
sprites:{
    idle:{
        
        imgSrc:"./imgs/player1/Idle.png",
        maxFrames:8
    },
    run:{
        imgSrc:"./imgs/player1/Run.png",
        maxFrames:8
    },
    jump:{
        imgSrc:"./imgs/player1/Jump.png",
        maxFrames:2
    },
    fall:{
        imgSrc:"./imgs/player1/Fall.png",
        maxFrames:2
    },
    attack:{
        imgSrc:"./imgs/player1/Attack1.png",
        maxFrames:6
    },
    takeHit:{
        imgSrc:"./imgs/player1/Take Hit.png",
        maxFrames:4
    },
    death:{
        imgSrc:"./imgs/player1/Death.png",
        maxFrames:6
    }


}
});
let enemy = new Fighter(
{
   position: {
    x:400,
    y:100
},
velocity:{
    x:0,
    y:0
},

color:"blue",
imgSrc:"./imgs/player2/Idle.png",
maxFrames:4,
scale:2.5,
attackBox:{
    offset:{
        x:-170,
        y:50
    },
    width:170,
    height:50
},
offset:{
    x:215,
    y:167
},
sprites:{
    idle:{
        
        imgSrc:"./imgs/player2/Idle.png",
        maxFrames:4
    },
    run:{
        imgSrc:"./imgs/player2/Run.png",
        maxFrames:8
    },
    jump:{
        imgSrc:"./imgs/player2/Jump.png",
        maxFrames:2
    },
    fall:{
        imgSrc:"./imgs/player2/Fall.png",
        maxFrames:2
    },
    attack:{
        imgSrc:"./imgs/player2/Attack2.png",
        maxFrames:4
    },
    takeHit:{
        imgSrc:"./imgs/player2/Take hit.png",
        maxFrames:3
    },
    death:{
        imgSrc:"./imgs/player2/Death.png",
        maxFrames:7
    }

}})

const keys={
ArrowRight:{
        pressed : false,
    },
ArrowLeft:{
        pressed : false,
    },
ArrowUp:{
        pressed : false,
    },
a:{
        pressed : false,
    },
d:{
        pressed : false,
    },
w:{
        pressed : false,
    }
}
let timerValue=80;

    setInterval(() => {
        if(timerValue>0)
        {
            timerValue--;
            timer.innerText=timerValue;
        } 
       
    }, 1000);

// Game function
function gameEngine()
{   
    // Result condition
    if(timerValue===0||player.healthScore===0||enemy.healthScore===0)
    {
    finalResult();
    }
    // Player movements
    player.velocity.x=0;
    enemy.velocity.x=0;
//   player.switchSprites('idel')

    if(keys.a.pressed && player.lastKey === "a")
    {
        
        player.velocity.x=-5;
       player.switchSprites('run');

    }
    else if(keys.d.pressed && player.lastKey === "d")
    {
    player.velocity.x=5;
    player.switchSprites('run');
    }
    else{
        player.switchSprites('idle')

    }

    if(player.velocity.y<0)
    {
       player.switchSprites('jump');
        
    }
    else if(player.velocity.y>0)
    {
       player.switchSprites('fall');

    }


    if(keys.w.pressed && player.lastKey === "w")
    {
        player.velocity.y=-15;
    }
    
    if(keys.ArrowLeft.pressed &&enemy.lastKey==='ArrowLeft')
    {
        
        enemy.velocity.x=-5;
    enemy.switchSprites('run');

    
    }
     else if(keys.ArrowRight.pressed && enemy.lastKey==='ArrowRight' )
    {
    enemy.velocity.x=5;
    enemy.switchSprites('run');

    
    }
    else{
    enemy.switchSprites('idle');
    }

    if(enemy.velocity.y<0)
    {
       enemy.switchSprites('jump');
        
    }
    else if(enemy.velocity.y>0)
    {
       enemy.switchSprites('fall');

    }

    if(keys.ArrowUp.pressed && enemy.lastKey==='ArrowUp')
    {
        enemy.velocity.y=-15;
    }
    // Attack box collision
    if(timerValue!=0&&player.healthScore!=0&&enemy.healthScore!=0)
    {
    if( collision(player,enemy)&& player.isAttacking&&player.currentFrame===4)
    {
        // enemy.switchSprites("takeHit");

        // enemy.healthScore-=10
        enemy.takeHit();
        player.isAttacking=false;
        if(enemy.healthScore<30)
        {
            enemyHealth.style.backgroundColor="red"
        }
        enemyHealth.style.width= enemy.healthScore +"%"

    }
}
    // if player misses
    if(player.isAttacking&&player.currentFrame===4)
    {
        player.isAttacking=false;
    }
   
    if(timerValue!=0&&player.healthScore!=0&&enemy.healthScore!=0)

   {
    if( collision(enemy,player)&& enemy.isAttacking&&enemy.currentFrame===2)
    {
        // player.switchSprites("takeHit");

        // player.healthScore-=10
        player.takeHit();
        enemy.isAttacking=false;
        if(player.healthScore<30)
        {
            playerHealth.style.backgroundColor="red"
        }
        playerHealth.style.width = player.healthScore +"%"
        

    }
}
    // if enemy misses
    if(enemy.isAttacking&&enemy.currentFrame===4)
    {
        enemy.isAttacking=false;
    }
     
}

window.requestAnimationFrame(animation);
function animation()
{
window.requestAnimationFrame(animation);
ctx.fillStyle="black"
ctx.fillRect(0,0,canvas.width,canvas.height);
background.update();
shop.update();
ctx.fillStyle='rgba(255,255,255,0.1)'
ctx.fillRect(0,0,canvas.width,canvas.height)
player.update();
enemy.update();

gameEngine();
}

// Event listners for player movements
window.addEventListener("keydown",(event)=>
{
    if(!player.death)
    {
switch(event.key)
{
    case "d":
        keys.d.pressed=true;
        player.lastKey="d";
        break;

    case "a":
        keys.a.pressed=true; 
        player.lastKey="a";
        break;

    case "w":
        keys.w.pressed=true;
        player.lastKey="w";
        break;
    
    case "q":
        player.attack()
       break;

    
}
    }
if(!enemy.death)
{
    switch(event.key)
{ case ' ':
        enemy.attack()
       break;

    case 'ArrowRight':
        keys.ArrowRight.pressed=true;
        enemy.lastKey ='ArrowRight';
        break;
    
    case 'ArrowLeft':
        keys.ArrowLeft.pressed=true;
        enemy.lastKey ='ArrowLeft';
        break;
    
    case 'ArrowUp':
        keys.ArrowUp.pressed=true;
        enemy.lastKey ='ArrowUp';
        break;
}
}
})

window.addEventListener("keyup",(event)=>
{
switch(event.key)
{
    case "ArrowRight":
        keys.ArrowRight.pressed=false;
        break;

    case "ArrowLeft":
        keys.ArrowLeft.pressed=false;
        break;

    case "ArrowUp":
        keys.ArrowUp.pressed=false;
        break;  
        
    case 'd':
        keys.d.pressed=false;
        break;

    case 'a':
        keys.a.pressed=false;
        break;

    case 'w':
        keys.w.pressed=false;
        break;  
}

}
)
