/*
 * Create a list that holds all of your cards
 */
 let counter = 0;
 let timer = 0;
 let timerId = 0;
 const oneStar = '<li><i class="fa fa-star"></i></li>';
 const twoStars = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
 const threeStars = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';

 $(document).ready(function() {

    let cards = $(".card"); //jQuery list of cards
    let cardsArray = cards.toArray(); //JS array of cards

    for (const card of cards){        //looping over jQuery list of card to perform on click
        $(card).on("click", displayCard);

    };

    $(".restart").click(function(e){ //refresh game
        e.preventDefault()
        reset();
        startTimer();
        for (const card of cards){
            $(card).remove();
        };
        shuffledCardsArray = shuffle(cardsArray);     //use shuffle function
                                                    // take JS array and shuffle- return new array
        for (const shuffledCardFromArray of shuffledCardsArray){ //loop thru JS array
            $(shuffledCardFromArray).removeClass("open");
            $(shuffledCardFromArray).removeClass("show");
            $(shuffledCardFromArray).removeClass("match");
            $(".deck").append(shuffledCardFromArray);
            $(shuffledCardFromArray).on("click", displayCard);
        };
    });

    $("#close").click(function(e){ // if the user clicks on play again
        e.preventDefault();
        $(".restart").click();
    });

    $(".restart").click();
});

function displayCard(){ //when a card is clicked, this should happen
    $(this).addClass("open");
    $(this).addClass("show");
    checkScore();
    matchMaker();
};

function checkWin(){  //to check to see if a win happens and if it does do this
    if ($(".match").length===16){
        $("#winnerChickenDinner").modal("show");
        stopTimer();
        let starryNight = checkScore();
        let rating = 0;
        if (starryNight === 1){
            rating = oneStar;
        }else if (starryNight === 2){
            rating = twoStars;
        }else if (starryNight === 3){
            rating = threeStars;
        }
        $("#winnerChickenDinner .modal-body").html(`<p>Congratulations!</p><p>You won in ${counter} moves and ${timer} seconds! You're rated: <ul class="stars pad"> ${rating} </ul></p>`);
    }
};

function stopTimer(){  //stop the timer
    clearInterval(timerId);
    timerId = 0;
};

function reset(){ //reset the game
    counter = 0;
    $(".moves").text(counter);
    timer = 0;
    $(".timer").text(timer);
    $(".stars li").remove();
    $(".stars").append(threeStars);
};

function incrementCounter(){ //increment the Counter
    counter++;
    $(".moves").text(counter);
}

function checkScore(){  //Give a player rating on the page
    $(".stars li").remove();
    if (counter <= 15){
        $(".stars").append(threeStars);
        return 3;
    }else if (counter <= 30){
        $(".stars").append(twoStars);
        return 2;
    }else{
        $(".stars").append(oneStar);
        return 1;
    }
}

function startTimer(){  //start the timer
    if (timerId === 0){
        timerId = setInterval(function(){
            timer++;
            $(".timer").text(timer);
        }, 1000)
    }
};

function matchMaker(){ //determine if a two cards are open and if a match is made

    if($(".open").length == 2){
        incrementCounter();
        let firstIcon = $(".open").first().find("i");
        let lastIcon = $(".open").last().find("i");
        if(firstIcon.hasClass(lastIcon.attr("class"))){
            $(".open").addClass("match");
            $(".open").removeClass("show");
            $(".open").removeClass("open");
            checkWin();
        }else {
             reHide();
        }
    }else if ($(".open").length == 1){
        console.log("first card");
    }else if ($(".open").length > 2){
        $(".open").removeClass("show");
        $(".open").removeClass("open");
    }
};

function reHide(){ //rehide if a match isn't made
    const id = setInterval(function(){
        $(".open").removeClass("show");
        $(".open").removeClass("open");
        clearInterval(id);
    }, 500)
};


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(cardsArray) {
    var currentIndex = cardsArray.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cardsArray[currentIndex];
        cardsArray[currentIndex] = cardsArray[randomIndex];
        cardsArray[randomIndex] = temporaryValue;
    }

    return cardsArray;
}
