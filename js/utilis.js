function collision(attacker , defenser)
{
    return  (attacker.attackBox.position.x + attacker.attackBox.width >= defenser.position.x &&
        attacker.attackBox.position.x <= defenser.position.x+defenser.width &&
        attacker.attackBox.position.y +attacker.attackBox.height >= defenser.position.y &&
    attacker.attackBox.position.y <= defenser.position.y+defenser.height)

}

function finalResult()
{
      result.style.display="flex";
        if(player.healthScore>enemy.healthScore)
        {
            result.innerText="GAME OVER \n Player1 Won"
            // enemy.switchSprites("death")
        }
        if(enemy.healthScore>player.healthScore)
        {
            result.innerText="GAME OVER \n Player2 Won"
        }
        if(player.healthScore===enemy.healthScore)
        {
            result.innerText="GAME OVER \n Its a Tie"

        }
        if(player.healthScore===0||enemy.healthScore===0)
        {
            timerValue=0;
        }
    
    
}