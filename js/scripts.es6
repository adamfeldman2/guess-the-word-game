// global constant variables
const difficultyWrapper = document.querySelector('.difficulty-wrapper');
const categoryWrapper = document.querySelector('.category-wrapper');
const playingField = document.querySelector('.playing-field');
const difficultyButtons = document.querySelectorAll('.difficulty-wrapper li');
const categoryButtons = document.querySelectorAll('.category-wrapper li');
const guessesRemainingWrapper = document.querySelector('.guesses-remaining-wrapper');
const selectedCategoryWrapper = document.querySelector('.selected-category-wrapper');
const letterButtons = document.querySelectorAll('.letters-wrapper-inner span');
const linesForLettersWrapper = document.querySelector('.lines-for-letters-wrapper');
const winOrLose = document.querySelector('.win-or-lose-wrapper');

// global update-able variables
let selectedDifficulty;
let guessesRemaining = 8;
let selectedCategory;
let selectedCategoryTitle;
let selectedCategoryWords;
let randomWord;
let numOfLetters;
let lettersGuessedCorrectly = 0;
let letterValue;

// onClick of "play again" button, reload the game
document.querySelector('button').addEventListener('click', function() {
  window.location.reload();
});

// categories
const categories = {
  capitalCities: {
    title: 'Capital Cities',
    words: ['Minsk', 'Havana', 'Santo Domingo', 'Helsinki', 'Budapest', 'Tel Aviv', 'Wellington', 'Quito', 'Pretoria', 'New Delhi', 'Lisbon', 'Jakarta', 'Copenhagen', 'Buenos Aires', 'Belfast', 'Tripoli', 'Baghdad', 'Brussels', 'Bangkok', 'Beijing', 'Dublin', 'Kingston', 'Madrid', 'Prague', 'Santiago', 'Singapore', 'Amsterdam', 'Vatican City', 'Vienna']
  },
  musicalInstruments: {
    title: 'Musical Instruments',
    words: ['Vibraphone', 'Steelpan', 'Xylophone', 'Glockenspiel', 'Triangle', 'Saxophone', 'Harmonica', 'Bagpipe', 'Clarinet', 'Piccolo', 'Trombone', 'Ukelele', 'Mandolin', 'Cymbal', 'Tambourine', 'Turntable', 'Synthesizer', 'Bassoon', 'French Horn', 'Banjo']
  },
  languages: {
    title: 'Languages',
    words: ['Vietnamese', 'Hebrew', 'Portuguese', 'Punjabi', 'Sudanese', 'Tagalog', 'Romanian', 'Mandarin', 'Hindi', 'Tamil', 'Hungarian', 'Czech', 'Swedish', 'Belarusian', 'Arabic', 'Bengali', 'Urdu', 'Turkish', 'Persian', 'Ukrainian', 'Italian', 'Japanese', 'Polish']
  },
  movieTitles: {
    title: 'Movie Titles',
    words: ['Avatar', 'Jurassic Park', 'Harry Potter', 'Toy Story', 'Iron Man', 'James Bond', 'Lion King', 'Finding Nemo', 'Spider Man', 'Jungle Book', 'Hunger Games', 'Star Wars', 'The Exorcist', 'The Godfather', 'Goodfellas', 'The Shining', 'Pulp Fiction', 'Gladiator', 'Citizen Kane', 'Mary Poppins', 'Casablanca', 'Shawshank Redemption', 'Forrest Gump', 'Rain Man', '']
  },
  greenThings: {
    title: 'Green Things',
    words: ['Zucchini', 'Chrysalis', 'Iguana', 'Pistachio', 'Asparagus', 'Alligator', 'Cactus', 'Broccoli', 'Leprechaun', 'Turtle', 'Parsley', 'Pepper', 'Emerald', 'Avocado', 'Guacamole', 'Godzilla', 'Spinach', 'Shrek', 'Boston Celtics', 'Peter Pan']
  },
  dogBreeds: {
    title: 'Dog Breeds',
    words: ['Border Terrier', 'Rottweiler', 'Dalmatian', 'German Shepherd', 'Shih Tzu', 'Husky', 'Beagle', 'Chihuahua', 'Great Dane', 'Maltese', 'Pomeranian', 'Greyhound', 'Golden Retriever', 'Border Collie', 'Pit Bull', 'Bloodhound', 'Sheepdog', 'Cocker Spaniel', 'Schnauzer', 'Yorkie']
  }
}

//sets the game's difficulty
function chooseDifficulty() {
  // loop over difficulty buttons add event listeners
  difficultyButtons.forEach((button) => {
    button.addEventListener('click', function(e) {
      // update value of selectedDifficulty
      selectedDifficulty = e.target.attributes[0].nodeValue;
      // update guessesRemaining based on difficulty desired
      if(selectedDifficulty === 'level-easy') {
        guessesRemaining = 9;
      } else if(selectedDifficulty === 'level-medium') {
        guessesRemaining = 7;
      } else {
        guessesRemaining = 5;
      }

      fadeOutDifficultyWrapper(); // calls fadeOutDifficultyWrapper()
      fadeInCategoryWrapper(); // calls fadeInCategoryWrapper()
      setGuessesRemaining(); // calls setGuessesRemaining()
      chooseCategory(); // calls chooseCategory()
    });
  });
}

// fade .difficulty-wrapper out
function fadeOutDifficultyWrapper() {
  difficultyWrapper.classList.add('fadeOut'); // add class of .fadeOut
	  setTimeout(function() { // add display: none after 500ms
	    difficultyWrapper.style.display = 'none';
	  }, 500);
}

// fade .category-wrapper in
function fadeInCategoryWrapper() {
    setTimeout(function() { // add display: flex after 500ms
    		categoryWrapper.style.display = 'flex';
    	setTimeout(function() {
    		categoryWrapper.classList.add('fadeIn'); // add class of .fadeIn
    	}, 500);
    }, 500);
}

// sets selectedCategory and brings in the playing field
function chooseCategory() {
  // loop over category buttons add event listeners
  categoryButtons.forEach((button) => {
    button.addEventListener('click', function(e) {
      // update value of selectedCategory
      selectedCategory = e.target.attributes[0].nodeValue;

      fadeOutCategoryWrapper(); // calls fadeOutCategoryWrapper()

      fadeInPlayingField(); // calls fadeInPlayingField()

      useCategoryTitle(); // calls useCategoryTitle()
      useRandomWord(); // calls useRandomWord()
    });
  });
}

// fade .category-wrapper out
function fadeOutCategoryWrapper() {
	categoryWrapper.classList.add('fadeOut'); // add class of .fadeOut
	  setTimeout(function() { // add display: none after 500ms
	    categoryWrapper.style.display = 'none';
	  }, 500);
}

// fade .playing-field in
function fadeInPlayingField() {
  setTimeout(function() { // add display: block after 500ms
  		playingField.style.display = 'block';
  	setTimeout(function() {
  		playingField.classList.add('fadeIn'); // add class of .fadeIn
  	}, 500);
  }, 500);
}

// sets guesses remaining
function setGuessesRemaining() {
	guessesRemainingWrapper.children[1].innerHTML = guessesRemaining;
}

// displays the selectedCategoryTitle on the page
function useCategoryTitle() {
	selectedCategoryTitle = categories[selectedCategory].title;
	selectedCategoryWrapper.children[1].innerText = selectedCategoryTitle;
}

// generate word to be used in game
function useRandomWord() {
	selectedCategoryWords = categories[selectedCategory].words;
	// generate random number from 0 to number of indexes in array
	const randomNum = Math.floor(Math.random() * selectedCategoryWords.length);
	randomWord = selectedCategoryWords[randomNum];

	buildWordLines(); // calls buildWordLines()
}

// build the markup for the letter spaces using randomWord variable
function buildWordLines() {
	// build HTML for word
	const wordMarkup = randomWord.split('').reduce((markup, letter) => {
		// add empty div as markup if empty string
		return letter === ' ' ? markup + `<div></div>` : markup + `<div><span>${letter}</span></div>`;
	}, '');

	// add word HTML to .lines-for-letters-wrapper
	linesForLettersWrapper.innerHTML = wordMarkup;

	numberOfLetters() // calls numberOfLetters()
}

// check how many letters the word is
function numberOfLetters() {
	numOfLetters = document.querySelectorAll('.lines-for-letters-wrapper span').length;

  clickLetters() // calls clickLetters()
}

// on click of letters
function clickLetters() {
  const wordArr = randomWord.toUpperCase().split(''); // build array by spliting each letter of randomWord

  // loop through all letterButtons
  letterButtons.forEach((letter) => {
    letter.addEventListener('click', function() {
      updateGuessesRemaining(letter, wordArr); //calls updateGuessesRemaining()
      searchForLetters(letter, wordArr); // calls searchForLetters()

      // add .disabled to clicked letter
      this.classList.add('disabled');
    });
  });
}

// if clicked letter is not in the word, decrement guesses remaining
function updateGuessesRemaining(letter, wordArr) {
  if(wordArr.indexOf(letter.innerText) === -1) {
    guessesRemaining -= 1;
    guessesRemainingWrapper.children[1].innerHTML = guessesRemaining; // display updated guessesRemaining on page
  }
}

// display letter if guessed correctly
function searchForLetters(letter, wordArr) {
  const hiddenLetters = document.querySelectorAll('.lines-for-letters-wrapper span');

  // loop through the wordArr
  wordArr.forEach((clickedLetter, i) => {
    if(letter.innerText === clickedLetter) {
      // update lettersGuessedCorreclty based on number of letters found in word
      lettersGuessedCorrectly += 1;
      Array.from(hiddenLetters).forEach((hiddenLetter) => {
        if(clickedLetter === hiddenLetter.innerText) {
          hiddenLetter.style.opacity = 1;
        }
      });
    }
  });
  winOrLoseGame(); // calls winOrLoseGame()
  warningGuessesRemaining(); // calls warningGuessesRemaining()
}

// either display winning prompt or losing prompt
function winOrLoseGame() {
  // if user wins
  if(lettersGuessedCorrectly === numOfLetters) {
    disableAllLetters(); // calls disableAllLetters()
    setTimeout(function() {
      winOrLose.children[0].style.display = 'block'; // adds display: block to "YOU WIN"
    }, 250);
  }

  // if user loses
  if(guessesRemaining === 0) {
    disableAllLetters(); // calls disableAllLetters()
    displayWord(); // calls displayWord()
    winOrLose.children[1].style.display = 'block'; // adds display: block to "YOU LOSE"
  }
}

// disable all the letters after game ends
function disableAllLetters() {
  // loop through all letter buttons and add .disabled
  letterButtons.forEach((letter) => {
      letter.classList.add('disabled');
    });
}

// display the entire word if user loses
function displayWord() {
  const hiddenLetters = document.querySelectorAll('.lines-for-letters-wrapper span');

  // turn hiddenLetters nodeList into an actual array
  Array.from(hiddenLetters).forEach((letter) => {
    letter.style.opacity = 1;
  });
}

// adds the .warning class to the guessesRemaining number to warn user that lives are almost up
function warningGuessesRemaining() {
  const guessesRemainingClassList = guessesRemainingWrapper.children[1].classList;
  if(guessesRemaining <= 3) {
    guessesRemainingClassList.add('warning');
  }

  if(guessesRemaining === 0) {
    guessesRemainingClassList.remove('warning');
  }
  console.log('guessesRemaining: ', guessesRemaining);
}

// calls the first function which gets the app started
chooseDifficulty();
