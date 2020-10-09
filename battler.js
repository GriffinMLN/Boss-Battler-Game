/* 
        Boss Battler
By https://github.com/GriffinMLN

changelog:
v0.1 - configured basic file structure
v0.2 - added functions for player attack, monster attack
v0.3 - added random crits
v0.4 - added player mana, heal logic, win/loss conditions
v0.5 - improved combat log and win/loss conditions
*/

console.log('Boss Battler v0.5');
console.log('Battle Start:');

const bossHealth = document.getElementById('monster-health');
const playerHealth = document.getElementById('player-health');
const playerMana = document.getElementById('player-mana');
const attackBtn = document.getElementById('attack-btn');
const healBtn = document.getElementById('heal-btn');
const critStrikeMultiplier = 3;
const defaultPlayerDamage = Math.floor((Math.random() * (35 - 25) + 25));
const defaultMonsterDamage = Math.floor((Math.random() * (5 - 2) + 2));
const healPlayerAmount = Math.floor((Math.random() * (15 - 8) + 8))
const healManaCost = 10;
let playerAttackDamage = defaultPlayerDamage;
let monsterAttackDamage = defaultMonsterDamage;
let gameOver = false;

// Bug: When a critical strike occurs, it always seems to have the same value.

function damageMonster(playerAttackDamage) {
    if (gameOver == true) {
        return;
    }
    let critChance = Math.floor((Math.random() * 100));
    if (critChance > 80) {
        playerAttackDamage = playerAttackDamage * critStrikeMultiplier
        console.log('You hit for: ' + playerAttackDamage + ' Critical strike!');
        bossHealth.value = +bossHealth.value - playerAttackDamage;
        return playerAttackDamage = defaultPlayerDamage;
    } else {
    const checkNormalAtk = Math.floor((Math.random() * 10) + playerAttackDamage);
    console.log('You hit for: ' + checkNormalAtk);
    bossHealth.value = +bossHealth.value - checkNormalAtk;
    }
    if (bossHealth.value <= 0){
        console.log('GAME OVER! You win.');
        alert('GAME OVER! You win.');
        gameOver = true;
    }
};

function damagePlayer(monsterAttackDamage) {
    if (gameOver == true) {
        return;
    }
    let critChance = Math.floor((Math.random() * 100));
    if (critChance > 80) {
        monsterAttackDamage = monsterAttackDamage * critStrikeMultiplier;
        console.log('Boss hits you for: ' + monsterAttackDamage + ' Critical strike!');
        playerHealth.value = +playerHealth.value - monsterAttackDamage;
        monsterAttackDamage = defaultMonsterDamage;
    } else {
    const checkNormalAtk = Math.floor((Math.random() * 10) + monsterAttackDamage);
    console.log('Boss hits you for: ' + checkNormalAtk);
    playerHealth.value = +playerHealth.value - checkNormalAtk;
    }
    if (playerHealth.value <= 0){
        console.log('GAME OVER! You lost.');
        alert('GAME OVER! You lost.');
        gameOver = true;
    }
};

function healPlayer() {
    playerMana.value = +playerMana.value - healManaCost;
}

attackBtn.addEventListener('click', function() {
    damageMonster(playerAttackDamage);
    damagePlayer(monsterAttackDamage);
});

healBtn.addEventListener('click', function() {
    if (gameOver == false && playerMana.value >= 10){
        playerHealth.value = +playerHealth.value + healPlayerAmount;
        healPlayer(healPlayerAmount);
        damagePlayer(monsterAttackDamage);
        console.log('You heal for: ' + healPlayerAmount);
        } else {
            if (gameOver) {
                alert('GAME OVER!');
            } else {
            console.log('Not Enough Mana!');
            alert('Not Enough Mana!')
            }
        }
});