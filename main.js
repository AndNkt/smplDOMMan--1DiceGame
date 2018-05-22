//roll a dice(pig game) till win(take more than 100 points)
//if player get 1 pts he lose his current-pull score and move come to another player


let diceDOM0=document.querySelector('.dice-0');//var  for select
let diceDOM1=document.querySelector('.dice-1');//var for select

//.textContent method change text inside element //setter
//document.querySelector('#current-'+ activePlayer).textContent=dice;
//document.querySelector('#current-'+ activePlayer).innerHTML='<em>'+dice+'</em>';

/*
//to read content from element getter
var x =document.querySelector('#score-0').textContent;
console.log(x);
*/
let roundScores, scores, activePlayer,finalScore;
//state var
let gamePlayin;
initGame();

//add event listener on roll button
document.querySelector('.btn-roll').addEventListener('click',function (){
    checkGameScore();
    if(gamePlaying){
        //1. take a rand number
    //use rand to calculate dice between 0 and 5, floor remove decimal, +1 make it from 1..6
        setDices();

    }
    });

//add event listener for hold btn
document.querySelector('.btn-hold').addEventListener('click',function (){
  
    if(gamePlaying===true && typeof gamePlaying!=='undefined'){
        //add current score to global score
    scores[activePlayer]+=roundScores;
    //update UI
    document.querySelector('#score-'+activePlayer).textContent=scores[activePlayer];
    //check if player won a game
    if (scores[activePlayer]>=finalScore){
    //if player win a game then write winner 
        document.querySelector('#name-'+activePlayer).textContent='Winner';
    //remove dice
        diceDOM1.style.display='none';
    //apply winner class to a panel
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
    //remove class active
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
        gamePlaying=false;
        console.log(gamePlaying);

        //remove all event listeners from buttons to prevent btn push after end of the game

       document.querySelector('.btn-hold').style.display='none';
       document.querySelector('.btn-roll').style.display='none';

    }else{
      //next player turn
      nextPlayer();
    }
    }
    
});


//add event listener for new-game btn
document.querySelector('.btn-new').addEventListener('click',initGame);


function initGame(){

    checkGameScore();

    activePlayer=parseInt((Math.random()).toFixed());//first player is -0 second -1
    console.log('activePlayer='+activePlayer);
//
    scores=[0,0];
//
    roundScores=0;

    //change css properties (hide dice)
    document.querySelector('.dice-0').style.display='none';
    document.querySelector('.dice-1').style.display='none';
    //all data set to zero
    document.getElementById('score-0').textContent='0';
    document.getElementById('score-1').textContent='0';
    document.getElementById('current-0').textContent='0';
    document.getElementById('current-1').textContent='0';
    document.getElementById('name-0').textContent='Player-1';
    document.getElementById('name-1').textContent='Player-2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.getElementById('scorevalue').value="";//delete final score
    setActiveClass(activePlayer);
    
    document.querySelector('.btn-hold').style.display='block';
    document.querySelector('.btn-roll').style.display='block';
}

function setDices(){
    var dice0= Math.floor(Math.random()*6)+1;
    var dice1= Math.floor(Math.random()*6)+1;
    //2. display a result(dice number)
    //change css properties (show dice) and show actual image 
    
    diceDOM0.style.display='block';
    diceDOM1.style.display='block';
    diceDOM0.src='img/dice-'+dice0+'.png';//select image of the dice
    diceDOM1.src='img/dice-'+dice1+'.png';//select image of the dice
    console.log('Dices:'+dice0+':'+dice1);

    //3. update round score if roll-number was not a one
    if(dice0 ===1 && dice1 ===1){
        //next player turn
        nextPlayer();

    }else{
        //add score
        roundScores=dice0+dice1;//defined in global scope
        //roundScores=roundScores+dice
        document.querySelector('#current-'+ activePlayer).textContent=roundScores;//change active player   
    }
}


function checkGameScore(){
    finalScore=parseInt(document.getElementById('scorevalue').value);
    //console.log('finalScore=',finalScore);
    if (finalScore>=1 && finalScore<=300) {  
        gamePlaying=true;
    }else{
        gamePlaying=false;
    }
}

function setActiveClass(actPl){
    if (actPl===0) {
        document.querySelector('.player-0-panel').classList.add('active');
        document.querySelector('.player-1-panel').classList.remove('active');
    }else{
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.add('active');
    }
}

function nextPlayer(){
//next player turn
    (activePlayer===0)? activePlayer=1:activePlayer=0;
    roundScores=0;
    document.getElementById('current-0').textContent='0';
    document.getElementById('current-1').textContent='0';

    //set active class to active player
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');
    //document.querySelector('.player-1-panel').classList.toggle('active');
    //document.querySelector('.player-0-panel').classList.toggle('active');
    setActiveClass(activePlayer);

    diceDOM0.style.display='none';
    diceDOM1.style.display='none';
}