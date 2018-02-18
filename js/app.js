$(document).ready(function(){
	
  // Create a list that holds all of your cards
  
  const icons = ['diamond', 'leaf', 'bolt', 'bomb', 'plane', 'anchor', 'bicycle', 'diamond', 'bolt', 'cube', 'leaf', 'bicycle', 'plane', 'cube', 'bomb', 'anchor'];
  let move = 0;
  let match = 0;
  let totalSeconds = 0;
    
   function init_Game() 
    {
	    $('.stars').find('i').removeClass('fa-star-o').addClass('fa-star');
	    starCounter();
    }
    
    $('.deck').one('click', function startCounter(){	
    
    
    function Set_Time()
    {
        ++totalSeconds;
        document.getElementById("seconds").innerHTML= pad(totalSeconds % 60);
        document.getElementById("minutes").innerHTML= pad(parseInt(totalSeconds/60,10));
    }
    
    function pad(val)
    {
        let valString = val + "";
            
        if(valString.length < 2)
        {
           return "0" + valString;
        }
        else
        {
           return valString;
        }
    }
    
    setInterval(Set_Time, 1000);
    
    return totalSeconds;

  });


  function stop_counter()
  {
    clearInterval(Set_Time, 1000);
    
    return totalSeconds;
  }

  // Display the cards on the page
  //  - shuffle the list of cards using the provided "shuffle" method below
  shuffle(icons);
  
  //  - loop through each card and create its HTML
  let i=0;
  while(i<icons.length)
  {
  	 $('.deck').append('<li class="card"><i class="fa fa-' + icons[i] + '"></i></li>');  //  - add each card's HTML to the page
  	 i++;
  }
  
  // Shuffle function from http://stackoverflow.com/a/2450976
  function shuffle(array)
  {
    var currentIndex = array.length,temporaryValue, randomIndex;
    while (currentIndex !== 0)
    {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  //  set up the event listener for a card. If a card is clicked:
  $('.card').on('click', card_click);
  let opened_cards = [];
  //- add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
  function card_click(e)
  {
    if ($(this).hasClass('open'))
    {
      return;
    }
    e.preventDefault();
    let target = e.currentTarget;
    $(e.target).addClass('open show');
    opened_cards.push(target);
    check_match(opened_cards);
    return opened_cards;
  }

  //- if the list already has another card, check to see if the two cards match
  function check_match(array) 
  {
    let i=1;
    while(i<array.length)
    {
	  let icon1 = array[0];
      let icon2 = array[1];
      if (array.length > 1 && (icon1.lastChild.classList.value === icon2.lastChild.classList.value))
      {
        ifCards_match();
      }
     else
      {
        setTimeout(ifCards_dont_match, 500);
        return false;
      }
      i++;
	}
  }

  //+ if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)

  function ifCards_match()
  {
      opened_cards.forEach(function(icons){
      icons.className= icons.className + ' match';
      opened_cards= [];
      match++;
    });

    if (match === 16)
    {
      setTimeout(game_over, 1000);
    }
    increment_counter();
  }

  //+ if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)

  function ifCards_dont_match()
  {
    opened_cards = [];
    $('.card').removeClass('open show');
    increment_counter();
  }

  //+ increment the move counter and display it on the page (put this functionality in another function that you call from this one)
  function increment_counter()
  {
    move++;
    $(".moves").text(move);
    star_counter(move);
  }


  function star_counter(move)
  {
    if (move > 8)
    {
      $('.stars').find('i').eq(2).removeClass('fa-star').addClass('fa-star-o');
    }
    if (move > 15) 
    {
      $('.stars').find('i').eq(1).removeClass('fa-star').addClass('fa-star-o');
    }

  }


 //+ if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
  function game_over()
  {
  	
    var rating;
    $('.deck').hide();
    
    if(move <= 8 )
    {
      rating = 3;
    }
    if(move > 8 )
    {
      rating = 2;
    }
    if(move > 15 )
    {
      rating = 1;
    }
    
    let test = confirm('Congrats :) \n You Won The Game With :  ' + move + ' steps. \n in : ' + totalSeconds.toFixed() + ' seconds. \n Your Rating Is : ' + rating + '\n\n  Play Again ?');
    
    if(test==false)
    {
      $('.container').hide();
      alert("Thank you for playing");
    }
    else if(test==true)
    {
      location.reload();
    }
    
    stop_counter();
  }


  $('.restart').click(function(){
    location.reload();
  });
  
  init_Game();

});