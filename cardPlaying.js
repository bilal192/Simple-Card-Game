let combinations = {
    suits : ["spades", "diamonds", "clubs", "hearts"],
    values : [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
    // suits : ["♠", "♥", "♣", "♦"]"
}

function getSymbol(a){
    switch(a){
        case "spades":
            return "♠"
        case "diamonds":
            return "♦"
        case "clubs":
            return "♣"
        case "hearts": 
            return "♥"
    }
}

function getValueOf(a){
    switch (a) {
        case 11:
            return "J"
        case 12:
            return "Q"
        case 13:
            return "K"
        case 14:
            return "A"
        default:
            return a
    }
}

function getDeck(){
    let deck = Array();
    for(let i = 0; i < combinations.suits.length; i++){
        for(let j =0; j < combinations.values.length; j++){
            let  card = {
                Value : combinations.values[j], 
                Suit : combinations.suits[i]
            };
            deck.push(card);
        }
    }
    return deck;
}

function shuffle(deck){
    for(let i =0; i < 104; i++){
        let l1 = Math.floor((Math.random() * 52));
        let l2 = Math.floor((Math.random() * 52));
        let temp = deck[l1];
        deck[l1] = deck[l2];
        deck[l2] = temp;
    }
    return deck
}

let players_data = {
    deckOfPlayer : shuffle(getDeck()),
    deckOfComputer : shuffle(getDeck()),
    score_Player : 0,
    score_computer : 0,
    topScors : 5,
    winner : ''
}
function showCards(){
    document.getElementById("wrapper").style.display = ''
}


let getCard = document.getElementById("getCards_btn");
getCard.addEventListener('click', ()=> {
    
    let player_card = players_data.deckOfPlayer[Math.floor(Math.random() *  players_data.deckOfPlayer.length)];
    let computer_card = players_data.deckOfComputer[Math.floor(Math.random() * players_data.deckOfComputer.length)];

    let c = document.getElementById("computerCard_id").innerHTML = `${getValueOf(computer_card.Value)}${getSymbol(computer_card.Suit)}`; 
    let p = document.getElementById("playerCard_id").innerHTML = `${getValueOf(player_card.Value)}${getSymbol(player_card.Suit)}`;  

    if(players_data.score_Player < players_data.topScors && players_data.score_computer < players_data.topScors){
        if(player_card.Value > computer_card.Value){
            document.getElementById("winner").innerHTML = "You Won!!"
            players_data.score_Player++;
            document.getElementById("score_Player").innerHTML = `Player Score: 5/${players_data.score_Player}`;
        } 
        else if(player_card.Value < computer_card.Value){
            document.getElementById("winner").innerHTML = "The computer Won!!"
            players_data.score_computer++;
            document.getElementById("score_computer").innerHTML = `Computer Score: 5:/${players_data.score_computer}`;
        } 
        else document.getElementById("winner").innerHTML = "No one won!!"
    }

    if(players_data.score_computer == 5 || players_data.score_Player == 5){
        players_data.score_Player > players_data.score_computer ? window.confirm("Congratulations, You Won The Game! \nPlay Again") : window.confirm("This Is Awkward The Computer Wooon!! Try Again")

    
        document.getElementById("score_Player").innerHTML = "Player Score: 5/0";
        document.getElementById("score_computer").innerHTML = "Computer Score: 5:/0";   
        window.location.reload();                                          
    }
    
})
