// global variables
const categoryWrapper = document.querySelector('.category-wrapper');
const playingField = document.querySelector('.playing-field');
const categoryButtons = document.querySelectorAll('.category-wrapper li');
const guessesRemainingWrapper = document.querySelector('.guesses-remaining-wrapper');
const selectedCategoryWrapper = document.querySelector('.selected-category-wrapper');
const letterButtons = document.querySelectorAll('.letters-wrapper-inner span');
const linesForLettersWrapper = document.querySelector('.lines-for-letters-wrapper');
const winOrLose = document.querySelector('.win-or-lose-wrapper');

let guessesRemaining = 8;
let selectedCategory;
let selectedCategoryTitle;
let selectedCategoryWords;
let randomWord;
let numOfLetters;
let lettersGuessedCorrectly = 0;
let letterValue;

document.querySelector('button').addEventListener('click', function() {
  window.location.reload();
});

// categories
const categories = {
  capitalCities: {
    title: 'Capital Cities',
    words: ['Minsk', 'Havana', 'Santo Domingo', 'Addis Ababa', 'Helsinki', 'Budapest', 'Tel Aviv', 'Wellington', 'Quito', 'Pretoria', 'Port au Prince', 'New Delhi', 'Lisbon', 'Jakarta', 'Copenhagen', 'Buenos Aires', 'Belfast', 'Tripoli', 'Baghdad', 'Brussels']
  },
  musicalInstruments: {
    title: 'Musical Instruments',
    words: ['Vibraphone', 'Steelpan', 'Xylophone', 'Glockenspiel', 'Triangle', 'Saxophone', 'Harmonica', 'Bagpipe', 'Clarinet', 'Piccolo', 'Trombone', 'Ukelele', 'Mandolin', 'Cymbal', 'Tambourine', 'Turntable', 'Synthesizer', 'Bassoon', 'French Horn', 'Banjo']
  },
  languages: {
    title: 'Languages',
    words: ['Vietnamese', 'Hebrew', 'Portuguese', 'Punjabi', 'Sudanese', 'Tagalog', 'Romanian', 'Mandarin', 'Hindi', 'Tamil', 'Hungarian', 'Czech', 'Swedish', 'Belarusian', 'Arabic', 'Bengali', 'Urdu', 'Turkish', 'Persian', 'Ukrainian']
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

// sets selectedCategory and brings in the playing field
function chooseCategory() {
  // loop over category buttons add event listeners
  categoryButtons.forEach((button) => {
    button.addEventListener('click', function(e) {
      // update value of selectedCategory
      selectedCategory = e.target.attributes[0].nodeValue;

      fadeOutCategoryWrapper(); // calls fadeOutCategoryWrapper()

      fadeInPlayingField(); // calls fadeInPlayingField()

      setGuessesRemaining(); // calls setGuessesRemaining()
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
  const wordArr = randomWord.toUpperCase().split('');

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
    guessesRemainingWrapper.children[1].innerHTML = guessesRemaining;
  }
}

// display letter if guessed correctly
function searchForLetters(letter, wordArr) {
  const hiddenLetters = document.querySelectorAll('.lines-for-letters-wrapper span');

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

function winOrLoseGame() {
  // if user wins
  if(lettersGuessedCorrectly === numOfLetters) {
    disableAllLetters(); // calls disableAllLetters()
    setTimeout(function() {
      winOrLose.children[0].style.display = 'block';
    }, 250);
  }

  // if user loses
  if(guessesRemaining === 0) {
    disableAllLetters(); // calls disableAllLetters()
    displayWord(); // calls displayWord()
    winOrLose.children[1].style.display = 'block';
  }
}

// disable all the letters after game ends
function disableAllLetters() {
  letterButtons.forEach((letter) => {
      letter.classList.add('disabled');
    });
}

// display the entire word if user loses
function displayWord() {
  const hiddenLetters = document.querySelectorAll('.lines-for-letters-wrapper span');

  Array.from(hiddenLetters).forEach((letter) => {
    letter.style.opacity = 1;
  });
}

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
chooseCategory();
