/* 
        Boss Battler
By https://github.com/GriffinMLN

changelog:
v0.1 - configured basic file structure
v0.2 - added functions for player attack, monster attack
v0.3 - added random crits
*/

console.log('Boss Battler v0.3');
console.log('Battle Start:');

const bossHealth = document.getElementById('monster-health');
const playerHealth = document.getElementById('player-health');
const attackBtn = document.getElementById('attack-btn');
const healBtn = document.getElementById('heal-btn');
const critStrikeMultiplier = 3;
const defaultPlayerDamage = Math.floor((Math.random() * (35 - 25) + 25));
const defaultMonsterDamage = Math.floor((Math.random() * (5 - 2) + 2));
let playerAttackDamage = defaultPlayerDamage;
let monsterAttackDamage = defaultMonsterDamage;

function startingHealth(maxLife) {
    bossHealth.max = maxLife;
    bossHealth.value = maxLife;
    playerHealth.max = maxLife;
    playerHealth.value = maxLife;
};

// Bug: When a critical strike occurs, it always seems to have the same value.

function damageMonster(playerAttackDamage) {
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
};

function damagePlayer(monsterAttackDamage) {
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
};

attackBtn.addEventListener('click', function() {
    damageMonster(playerAttackDamage);
    damagePlayer(monsterAttackDamage);
});