// global variables
const categoryWrapper = document.querySelector('.category-wrapper');
const playingField = document.querySelector('.playing-field');
const categoryButtons = document.querySelectorAll('.category-wrapper li');
const guessesRemainingWrapper = document.querySelector('.guesses-remaining-wrapper');
const selectedCategoryWrapper = document.querySelector('.selected-category-wrapper');
const letterButtons = document.querySelectorAll('.letters-wrapper-inner span');
const linesForLettersWrapper = document.querySelector('.lines-for-letters-wrapper');

let guessesRemaining = 8;
let selectedCategory;
let selectedCategoryTitle;
let selectedCategoryWords;
let randomWord;
let numOfLetters;

// categories
const categories = {
  capitalCities: {
    title: 'Capital Cities',
    words: ['Minsk', 'Havana', 'Santo Domingo', 'Addis Ababa', 'Helsinki', 'Budapest']
  },
  astronomy: {
    title: 'Astronomy',
    words: ['Neptune', 'Constellation', 'Exosphere', 'Milky Way', 'Supernova']
  },
  languages: {
    title: 'Languages',
    words: ['Vietnamese', 'Hebrew', 'Portuguese', 'Punjabi', 'Sundanese', 'Tagalog', 'Romanian']
  },
  greenThings: {
    title: 'Green Things',
    words: ['Zucchini', 'Chrysalis', 'Iguana', 'Pistachio', 'Asparagus']
  },
  dogBreeds: {
    title: 'Dog Breeds',
    words: ['Border Terrier', 'Rottweiler', 'Dalmatian', 'German Shepherd', 'Shih Tzu']
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
	// randomWord = selectedCategoryWords[randomNum];
	randomWord = 'Milky Way';

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

function updateGuessesRemaining(number) {
  guessesRemainingWrapper.children[1].innerHTML = number;
}

// on click of letters
function clickLetters() {
  letterButtons.forEach((letter) => {
    letter.addEventListener('click', function() {
      // decrement one from guessesRemaining and run updateGuessesRemaining()
      guessesRemaining -= 1;
      updateGuessesRemaining(guessesRemaining);

      // add .disabled to clicked letter
      this.classList.add('disabled');
    });
  });
}

chooseCategory();
