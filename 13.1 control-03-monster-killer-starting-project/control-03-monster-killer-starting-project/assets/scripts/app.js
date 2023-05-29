 const ATTACK_VALUE = 10;
 const STRONG_ATTACK_VALUE = 17;
 const MONSTAR_ATTACK_VALUE = 14;
 const HEAL_VALUE = 20;
 const MODE_ATTACK = 'ATTACK';
 const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
 const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
 const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
 const LOG_EVENT_MONSTAR_ATTACK = 'MONSTAR_ATTACK';
 const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
 const LOG_EVENT_GAME_OVER = 'GAME_OVER';
 

 let enteredValue = prompt('Maximum life for you and monstar.', '100');
 let chosenMaxLife = parseInt(enteredValue);
 let battleLog = [];

 if(isNaN(chosenMaxLife) || chosenMaxLife <= 0 ){
  chosenMaxLife = 100;
 }

 let currentMonsterHealth = chosenMaxLife;
 let currentPlayerHealth = chosenMaxLife;
 let hasBonusLife = true;
 let lastLogEntry;


 adjustHealthBars(chosenMaxLife);

 function attackMonstar(mode){

  let maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
  let logEvent = mode === MODE_ATTACK ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_PLAYER_STRONG_ATTACK; 
  // if(mode === MODE_ATTACK){
  //   maxDamage = ATTACK_VALUE
  //   logEvent = LOG_EVENT_PLAYER_ATTACK;
  // }else if(mode === MODE_STRONG_ATTACK){
  //   maxDamage = STRONG_ATTACK_VALUE
  //   logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK
  // }
  const damage = dealMonsterDamage(maxDamage)
  currentMonsterHealth -= damage;

  writeToLog(
    logEvent,
    damage,
    currentMonsterHealth,
    currentPlayerHealth
  )
  endRound();
 }
 function writeToLog(ev, val, monstarHealth, playerHealth){
   let logEntry;
   if(ev === LOG_EVENT_PLAYER_ATTACK){
    logEntry = {
      event: ev,
      value: val,
      target: 'MONSTAR',
      finalMonstarHealth: monstarHealth,
      finalPlayerHealth: playerHealth
    };
   } else if (ev === LOG_EVENT_PLAYER_STRONG_ATTACK) {
      logEntry = {
        event: ev,
        value: val,
        target: 'MONSTAR',
        finalMonstarHealth: monstarHealth,
        finalPlayerHealth: playerHealth
      };
   } else if ( ev === LOG_EVENT_MONSTAR_ATTACK){
      logEntry = {
        event: ev,
        value: val,
        target: 'PLAYER',
        finalMonstarHealth: monstarHealth,
        finalPlayerHealth: playerHealth
      };
   } else if ( ev === LOG_EVENT_PLAYER_HEAL) {
    logEntry = {
      event: ev,
      value: val,
      target: 'PLAYER',
      finalMonstarHealth: monstarHealth,
      finalPlayerHealth: playerHealth
    }
   } else if (ev == LOG_EVENT_GAME_OVER){
    logEntry = {
      event: ev,
      value: val,
      finalMonstarHealth: monstarHealth,
      finalPlayerHealth: playerHealth
    }
   }
   battleLog.push(logEntry)
 }

 function reset(){
  currentPlayerHealth = chosenMaxLife;
  currentMonsterHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
 }

 function endRound(){
  let initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTAR_ATTACK_VALUE); 
  currentPlayerHealth -= playerDamage;

  writeToLog(LOG_EVENT_MONSTAR_ATTACK,
             playerDamage,
             currentMonsterHealth,
             currentPlayerHealth );

  if(currentPlayerHealth <= 0 && hasBonusLife){
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    alert('You would be dead but the bonus life saved you');
    setPlayerHealth(initialPlayerHealth)

  }

  if( currentMonsterHealth <= 0 && currentPlayerHealth >0 ){
    alert('You Won')
    writeToLog(LOG_EVENT_MONSTAR_ATTACK,
      'PLAYER WON',
      currentMonsterHealth,
      currentPlayerHealth );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('You Lost')
    writeToLog(LOG_EVENT_MONSTAR_ATTACK,
      'MONSTAR WON',
      currentMonsterHealth,
      currentPlayerHealth );
  } else if (currentPlayerHealth < 0 && currentMonsterHealth < 0) {
    alert('You have a draw')
    writeToLog(LOG_EVENT_MONSTAR_ATTACK,
      'DRAW GAME',
      currentMonsterHealth,
      currentPlayerHealth );
  }

  if(currentPlayerHealth <= 0 || currentMonsterHealth <= 0){
    reset();
  }

 }

 

 function attackHandler(){
  attackMonstar(MODE_ATTACK)
 }


 function strongAttackHandler(){
  attackMonstar(MODE_STRONG_ATTACK)
 }

 function healPlayerHandler(){
  let healValue;

  if(currentPlayerHealth >= chosenMaxLife - HEAL_VALUE){
    alert("You can't heal to more than your max initial health");
    healValue = chosenMaxLife - currentPlayerHealth;
    console.log('First' + healValue);
  }else{
    healValue = HEAL_VALUE
    console.log( 'Second' + healValue);
  }

  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  writeToLog(LOG_EVENT_PLAYER_HEAL,
    healValue,
    currentMonsterHealth,
    currentPlayerHealth );
  endRound();
 }

 function printLogHandler(){
    // for(let i = 0; i < battleLog.length; i++){
    //   console.log(battleLog[i]);
    // }
    // console.log(battleLog.length);
    // console.log(battleLog)
    // let i = 10;
    // for(const element of battleLog){
    //   console.log(element);
    //   console.log(i);
    //   i--;
    // }

    let i = 0;
    for(const logEntry of battleLog){
      console.log(i)
      console.log( 'last', lastLogEntry)
      if(!lastLogEntry && lastLogEntry !== 0 || lastLogEntry < i ){
         console.log(`#${i}`);
      for(const key in logEntry){
         console.log(`${key} => ${logEntry[key]} `);
      }
      lastLogEntry = i;
      console.log(lastLogEntry);
      }
      i++;
      console.log('last' + i)
      break;
    }

    // let i = 0;
    // while(i < 3){
    //   console.log(i);
    //   i++;
    // }

    // let j = 4;
    // do{
    //   j++;
    //   console.log(j)
    // }while(j < 2)
 }


 attackBtn.addEventListener('click', attackHandler)
 strongAttackBtn.addEventListener('click', strongAttackHandler )
 healBtn.addEventListener('click', healPlayerHandler)
 logBtn.addEventListener('click', printLogHandler )