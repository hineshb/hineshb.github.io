var suits = ["♠", "♥", "♦", "♣"];
var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
var deck = new Array();
var playerTotal = 0;
var dealerTotal = 0;
var playerHand = new Array();
var dealerHand = new Array();

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
    document.getElementById("dealer").lastChild.id = "dealerCardFlip";
    //document.getElementById("playerTotal").innerHTML = playerTotal;
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
        result("Dealer Wins");
    }
    if(dealerTotal>21){
        result("Player Wins");
    }     
}

function stand(){
    if(document.getElementById("dealerCardFlip")){
        document.getElementById("dealerCardFlip").id = "dealerCard"; 
    }
    document.getElementById("dealerTotal").innerHTML = dealerTotal;
    
    if(dealerTotal == 21 && playerTotal == 21){
        result("Draw");
    }else if (dealerTotal == playerTotal){
        result("Draw");
    }else if(playerTotal == 21){
        result("Player Wins");

    }else if(dealerTotal == 21){
        result("Dealer Wins");

    }else if(playerTotal > 21){
        result("Dealer Wins");

    }else if(dealerTotal > 21){
        result("Player Wins");

    }else if(playerTotal>dealerTotal){
        result("Player Wins");
        console.log("ifstatement player");
    }else{
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
        document.getElementById("dealerCardFlip").id = "dealerCard"; 
    }
    document.getElementById("gameResult").style.display = "block";
    document.getElementById("gameResult").innerHTML = str;
    document.getElementById("playerTotal").innerHTML = playerTotal;
    document.getElementById("dealerTotal").innerHTML = dealerTotal;
    document.getElementById("hitbtn").disabled = true;
    document.getElementById("standbtn").disabled = true;
    colourCard();
}

function colourCard(){
    var elems = document.querySelectorAll('[id=playerCard]');
    var elems2 = document.querySelectorAll('[id=dealerCard]');
    var length = elems.length; 
    var length2 = elems2.length; 
    for (var i=0 ; i < length; i++) {
        if(elems[i].innerHTML.includes("♣") || elems[i].innerHTML.includes("♠")){
            elems[i].style.border = "2px solid black";
        }
        if(elems[i].innerHTML.includes("♥") || elems[i].innerHTML.includes("♦")){
            elems[i].style.border = "2px solid red";
        }
    }
    for (var i=0 ; i < length2; i++) {
        if(elems2[i].innerHTML.includes("♣") || elems2[i].innerHTML.includes("♠")){
            elems2[i].style.border = "2px solid black";
        }
        if(elems2[i].innerHTML.includes("♥") || elems2[i].innerHTML.includes("♦")){
            elems2[i].style.border = "2px solid red";
        }
    }
}
