var suits = ["♠", "♥", "♦", "♣"];
var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
var deck = new Array();
var playerTotal = 0;
var dealerTotal = 0;
var playerHand = new Array();
var dealerHand = new Array();
var dealercardholder;
var userBet = 0;
var currentBalance = 500;

window.addEventListener('load', () => {
    const button = document.querySelector('.clear-icon');
    button.addEventListener('click', () => {
        document.querySelector('.betinput').value = "";
    });
});

function showBalance(){
    document.getElementById("gameResult").style.display = "block";
    document.getElementById("gameResult").innerHTML = "Your Balance: $" + currentBalance;
}

function createDeck()
{
    deck = new Array();
    for (var i = 0 ; i < values.length; i++)
    {
        for(var x = 0; x < suits.length; x++)
        {
            var weight = parseInt(values[i]);
            if (values[i] == "J" || values[i] == "Q" || values[i] == "K")
                weight = 10;
            if (values[i] == "A")
                weight = 11;
            var card = { Value: values[i], Suit: suits[x], Weight: weight };
            deck.push(card);
        }
    }
    updateDeck();
}

function shuffle()
{
    for (var i = 0; i < 1000; i++)
    {
        var location1 = Math.floor((Math.random() * deck.length));
        var location2 = Math.floor((Math.random() * deck.length));
        var tmp = deck[location1];

        deck[location1] = deck[location2];
        deck[location2] = tmp;
    }
}

function startBlackJack()
{   
    playerTotal = 0;
    dealerTotal = 0;
    toggleRestart();
    document.getElementById("gameBtns").style.display="block";
    document.getElementById("gameContent").style.display="block";
    createDeck();
    shuffle();
    dealHands();
    updateDeck();
    checkHand();
    //document.getElementById('player_' + currentPlayer).classList.add('active');
}

function dealHands()
{
    for (var i = 0; i < 2; i++) {
        var card1 = deck.pop();
        var card2 = deck.pop();
     
        var divdealer = document.createElement('div');
        var divplayer = document.createElement('div');
        
        divdealer.id = "dealerCard";
        divplayer.id = "playerCard";
        

        divdealer.innerHTML = card1.Value + card1.Suit; //console.log(card1);
        divplayer.innerHTML = card2.Value + card2.Suit; //console.log(card2);

        dealerHand.push(card1);
        playerHand.push(card2);
        
        //dealerTotal = dealerTotal + card1.Weight;
        //playerTotal = playerTotal + card2.Weight;
       
        document.getElementById("dealer").appendChild(divdealer);
        document.getElementById("player").appendChild(divplayer);
    }
    dealercardholder = document.getElementById("dealer").lastChild.innerHTML;
    document.getElementById("dealer").lastChild.innerText="don't cheat";
    document.getElementById("dealer").lastChild.id = "dealerCardFlip";
    //document.getElementById("playerTotal").innerHTML = playerTotal;
    console.log(dealercardholder);
    colourCard();
}



function updateDeck(){
    document.getElementById("deck").innerHTML = deck.length;
}

function checkHand(){
    playerTotal=0;
    dealerTotal=0;
    for(var i=0; i < playerHand.length; i++){
        playerTotal = playerTotal + playerHand[i].Weight;
        if(playerTotal > 21){
            for(var i=0; i < playerHand.length; i++){
                if(playerHand[i].Value=="A"){
                    playerTotal = playerTotal - playerHand[i].Weight;
                    playerHand[i].Weight=1;
                    playerTotal = playerTotal + playerHand[i].Weight;
                }
            }
        }
    }
    for(var i=0; i < dealerHand.length; i++){
        dealerTotal = dealerTotal + dealerHand[i].Weight;
        if(dealerTotal > 21){
            console.log("help");
            for(var i=0; i < dealerHand.length; i++){
               if(dealerHand[i].Value=="A"){
                    console.log("helpx2");
                    dealerTotal = dealerTotal - dealerHand[i].Weight;
                    dealerHand[i].Weight=1;
                    dealerTotal = dealerTotal + dealerHand[i].Weight;
               }
            }
        }
    }
    //set values
    document.getElementById("playerTotal").innerHTML = playerTotal;
    document.getElementById("dealerTotal").innerHTML = dealerHand[0].Weight + " + Unknown";

    if(playerTotal>21){
        currentBalance = +currentBalance - +userBet;
        result("Dealer Wins");
    }
    if(dealerTotal>21){
        currentBalance = +currentBalance + +userBet;
        result("Player Wins");
    }     
}

function stand(){
    if(document.getElementById("dealerCardFlip")){
        document.getElementById("dealerCardFlip").innerHTML = dealercardholder; 
        document.getElementById("dealerCardFlip").id = "dealerCard"; 
    }
    document.getElementById("dealerTotal").innerHTML = dealerTotal;
    
    if(dealerTotal == 21 && playerTotal == 21){
        result("Draw");
    }else if (dealerTotal == playerTotal){
        result("Draw");
    }else if(playerTotal == 21){
        currentBalance = +currentBalance + +userBet;
        result("Player Wins");

    }else if(dealerTotal == 21){
        currentBalance = +currentBalance - +userBet;
        result("Dealer Wins");

    }else if(playerTotal > 21){
        currentBalance = +currentBalance - +userBet;
        result("Dealer Wins");

    }else if(dealerTotal > 21){        
        currentBalance = +currentBalance + +userBet;
        result("Player Wins");

    }else if(playerTotal>dealerTotal){
        currentBalance = +currentBalance + +userBet;
        result("Player Wins");
        console.log("ifstatement player");
    }else{
        currentBalance = +currentBalance - +userBet;
        result("Dealer Wins");
        console.log("ifstatement dealer");
    }
}


function hitme(){
    var card = deck.pop();
    playerHand.push(card);
    
    var divplayer = document.createElement('div');

    divplayer.id = "playerCard";

    divplayer.innerHTML = card.Value + card.Suit;

    document.getElementById("player").appendChild(divplayer);

    updateDeck();
    colourCard();
    checkHand();
}

function dealerHit(){
    dealerTotal=0;
    for(var i=0; i < dealerHand.length; i++){
        dealerTotal = dealerTotal + dealerHand[i].Weight;
    } 
    if(dealerTotal > 21){
        for(var i=0; i < dealerHand.length; i++){
           if(dealerHand[i].Value=="A"){
                dealerTotal = dealerTotal - dealerHand[i].Weight;
                dealerHand[i].Weight=1;
                dealerTotal = dealerTotal + dealerHand[i].Weight;
           }
        }
    }
    if(dealerTotal==21 || dealerTotal >= 17){
        stand();
    }
    if(dealerTotal < 17){
        dealerPickUp();
        console.log("check2");
    }
}

function dealerPickUp(){
    var card = deck.pop();
    dealerHand.push(card);
    
    var divdealer = document.createElement('div');

    divdealer.id = "dealerCard";

    divdealer.innerHTML = card.Value + card.Suit;

    document.getElementById("dealer").appendChild(divdealer);

    updateDeck();
    dealerHit();
    colourCard();
}

function toggleRestart(){
    document.getElementById("startbtn").style.display = 'none';
    document.getElementById("restartbtn").style.display = 'inline';
    document.getElementById("gameStartBtn").style.display = 'none';
    document.getElementById("gameResult").style.display = 'none';
}

function restartBlackJack(){
    dealerTotal=0;
    playerTotal=0;
    dealerHand = [];
    playerHand = [];

    document.getElementById("dealerTotal").innerHTML = "";
    document.getElementById("playerTotal").innerHTML = "";
    document.getElementById("deck").innerHTML = "";

    document.getElementById("dealer").innerHTML = "";
    document.getElementById("player").innerHTML = "";

    document.getElementById("gameResult").innerHTML = "";
    
    startBlackJack();
    document.getElementById("hitbtn").disabled = false;
    document.getElementById("standbtn").disabled = false;
}

function getPlayerTotal(){
    for(var i=0; i < playerHand.length; i++){
        playerTotal = playerTotal + playerHand[i].Weight;
    }
}

function getDealerTotal(){
    for(var i=0; i < dealerHand.length; i++){
        dealerTotal = dealerTotal + dealerHand[i].Weight;
    }
}

function result(str){
    playerTotal=0;
    dealerTotal=0;
    getPlayerTotal();
    getDealerTotal();
    if(document.getElementById("dealerCardFlip")){
        document.getElementById("dealerCardFlip").innerHTML = dealercardholder; 
        document.getElementById("dealerCardFlip").id = "dealerCard"; 
    }
    document.getElementById("gameResult").style.display = "block";
    document.getElementById("gameResult").innerHTML = str + '<br>' + "You Bet: $" + userBet + '<br>' + "Balance: $" + currentBalance;
    document.getElementById("playerTotal").innerHTML = playerTotal;
    document.getElementById("dealerTotal").innerHTML = dealerTotal;
    document.getElementById("hitbtn").display = true;
    document.getElementById("standbtn").disabled = true;
    document.getElementById("gameBtns").style.display = "none";
    document.getElementById("gameStartBtn").style.display = 'inline';
    document.getElementById("gameResult").style.display = 'block';
    colourCard();
    colourGameResult();
}

function colourGameResult(){
    console.log(document.getElementById("gameResult").innerText);
    if(document.getElementById("gameResult").innerText.includes('Dealer')){
        //document.getElementById("gameResult").style.color = "red";
        //document.getElementById("gameResult").style.border = "5px solid red";
        document.getElementById("gameResult").style.background = "red";
    }else if(document.getElementById("gameResult").innerText.includes('Player')){
        //document.getElementById("gameResult").style.color = "green";
        //document.getElementById("gameResult").style.border = "5px solid green";
        document.getElementById("gameResult").style.background = "green";
    }else{
        document.getElementById("gameResult").style.border = "5px solid black";
        document.getElementById("gameResult").style.background = "white";
    }
}

function colourCard(){
    var elems = document.querySelectorAll('[id=playerCard]');
    var elems2 = document.querySelectorAll('[id=dealerCard]');
    var length = elems.length; 
    var length2 = elems2.length; 
    for (var i=0 ; i < length; i++) {
        if(elems[i].innerHTML.includes("♣") || elems[i].innerHTML.includes("♠")){
            elems[i].style.border = "2px solid black";
            elems[i].style.color = "black";
        }
        if(elems[i].innerHTML.includes("♥") || elems[i].innerHTML.includes("♦")){
            elems[i].style.border = "2px solid red";
            elems[i].style.color = "red";
        }
    }
    for (var i=0 ; i < length2; i++) {
        if(elems2[i].innerHTML.includes("♣") || elems2[i].innerHTML.includes("♠")){
            elems2[i].style.border = "2px solid black";
            elems2[i].style.color = "black";
        }
        if(elems2[i].innerHTML.includes("♥") || elems2[i].innerHTML.includes("♦")){
            elems2[i].style.border = "2px solid red";
            elems2[i].style.color = "red";
        }
    }
}

function toggleTheme(str){
    if(str=="toggleDark"){
        document.getElementById("toggleDark").innerText = "Switch to Light";
        document.getElementById("toggleDark").id = "toggleLight";
        document.getElementById("thisisBody").style.background = "#444444";
        document.getElementById("blackjack").style.color = "white";
        document.getElementById("deckTitle").style.color = "white";
        document.getElementById("dealerTitle").style.color = "white";
        document.getElementById("playerTitle").style.color = "white";
        //document.getElementById("gameResult").style.color = "white";
    }
    if(str=="toggleLight"){
        document.getElementById("toggleLight").innerText = "Switch to Dark";
        document.getElementById("toggleLight").id = "toggleDark";
        document.getElementById("thisisBody").style.background = "white";
        document.getElementById("blackjack").style.color = "black";
        document.getElementById("deckTitle").style.color = "black";
        document.getElementById("dealerTitle").style.color = "black";
        document.getElementById("playerTitle").style.color = "black";
        //document.getElementById("gameResult").style.color = "black";
    }
}

function openBetMenu(){
    // Get the modal
    var modal = document.getElementById("myModal");
    document.getElementById("betBalance").innerText = "Balance: $" + currentBalance;
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    }
}

function checkInputBet(str){
    //console.log(/^\+?(0|[1-9]\d*)$/.test(str));
    return /^\+?(0|[1-9]\d*)$/.test(str);
}

function inputBet(){
    var modal = document.getElementById("myModal");
    var input = document.getElementById("input").value;
    document.getElementById("betStatus").innerText = "Insufficient fund!";
    if(checkInputBet(input)){
        if(input==""){
            userBet = 0;
        }else{
            userBet = input;
        }
        
        /*if(input<0){
            console.log("must be higher than 0");
        }else */
        if(input>currentBalance){
            document.getElementById("betStatus").style.display = "block";
        }else if(document.getElementById("restartbtn").style.display){
            modal.style.display = "none";
            document.getElementById("betStatus").style.display = "none";
            restartBlackJack();
        }else{
            modal.style.display = "none";
            document.getElementById("betStatus").style.display = "none";
            startBlackJack();
        }
    }else{
        document.getElementById("betStatus").style.display = "block";
        document.getElementById("betStatus").innerHTML = "*Invalid* <br> Must enter a positive full dollar value!";
    }
}
