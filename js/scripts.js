'use strict';

// global variables
var categoryWrapper = document.querySelector('.category-wrapper');
var playingField = document.querySelector('.playing-field');
var categoryButtons = document.querySelectorAll('.category-wrapper li');
var guessesRemainingWrapper = document.querySelector('.guesses-remaining-wrapper');
var selectedCategoryWrapper = document.querySelector('.selected-category-wrapper');
var letterButtons = document.querySelectorAll('.letters-wrapper-inner span');
var linesForLettersWrapper = document.querySelector('.lines-for-letters-wrapper');
var winOrLose = document.querySelector('.win-or-lose-wrapper');

var guessesRemaining = 8;
var selectedCategory = void 0;
var selectedCategoryTitle = void 0;
var selectedCategoryWords = void 0;
var randomWord = void 0;
var numOfLetters = void 0;
var lettersGuessedCorrectly = 0;
var letterValue = void 0;

document.querySelector('button').addEventListener('click', function () {
  window.location.reload();
});

// categories
var categories = {
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
};

// sets selectedCategory and brings in the playing field
function chooseCategory() {
  // loop over category buttons add event listeners
  categoryButtons.forEach(function (button) {
    button.addEventListener('click', function (e) {
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
  setTimeout(function () {
    // add display: none after 500ms
    categoryWrapper.style.display = 'none';
  }, 500);
}

// fade .playing-field in
function fadeInPlayingField() {
  setTimeout(function () {
    // add display: block after 500ms
    playingField.style.display = 'block';
    setTimeout(function () {
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
  var randomNum = Math.floor(Math.random() * selectedCategoryWords.length);
  randomWord = selectedCategoryWords[randomNum];

  buildWordLines(); // calls buildWordLines()
}

// build the markup for the letter spaces using randomWord variable
function buildWordLines() {
  // build HTML for word
  var wordMarkup = randomWord.split('').reduce(function (markup, letter) {
    // add empty div as markup if empty string
    return letter === ' ' ? markup + '<div></div>' : markup + ('<div><span>' + letter + '</span></div>');
  }, '');

  // add word HTML to .lines-for-letters-wrapper
  linesForLettersWrapper.innerHTML = wordMarkup;

  numberOfLetters(); // calls numberOfLetters()
}

// check how many letters the word is
function numberOfLetters() {
  numOfLetters = document.querySelectorAll('.lines-for-letters-wrapper span').length;

  clickLetters(); // calls clickLetters()
}

// on click of letters
function clickLetters() {
  var wordArr = randomWord.toUpperCase().split('');

  letterButtons.forEach(function (letter) {
    letter.addEventListener('click', function () {
      updateGuessesRemaining(letter, wordArr); //calls updateGuessesRemaining()
      searchForLetters(letter, wordArr); // calls searchForLetters()

      // add .disabled to clicked letter
      this.classList.add('disabled');
    });
  });
}

// if clicked letter is not in the word, decrement guesses remaining 
function updateGuessesRemaining(letter, wordArr) {
  if (wordArr.indexOf(letter.innerText) === -1) {
    guessesRemaining -= 1;
    guessesRemainingWrapper.children[1].innerHTML = guessesRemaining;
  }
}

// display letter if guessed correctly
function searchForLetters(letter, wordArr) {
  var hiddenLetters = document.querySelectorAll('.lines-for-letters-wrapper span');

  wordArr.forEach(function (clickedLetter, i) {
    if (letter.innerText === clickedLetter) {
      // update lettersGuessedCorreclty based on number of letters found in word
      lettersGuessedCorrectly += 1;
      Array.from(hiddenLetters).forEach(function (hiddenLetter) {
        if (clickedLetter === hiddenLetter.innerText) {
          hiddenLetter.style.opacity = 1;
        }
      });
    }
  });
  winOrLoseGame(); // calls winOrLoseGame()
}

function winOrLoseGame() {
  // if user wins
  if (lettersGuessedCorrectly === numOfLetters) {
    disableAllLetters(); // calls disableAllLetters()
    setTimeout(function () {
      winOrLose.children[0].style.display = 'block';
    }, 500);
  }

  // if user loses
  if (guessesRemaining === 0) {
    disableAllLetters(); // calls disableAllLetters()
    displayWord(); // calls displayWord()
    winOrLose.children[1].style.display = 'block';
  }
}

function disableAllLetters() {
  letterButtons.forEach(function (letter) {
    letter.classList.add('disabled');
  });
}

function displayWord() {
  var hiddenLetters = document.querySelectorAll('.lines-for-letters-wrapper span');

  Array.from(hiddenLetters).forEach(function (letter) {
    letter.style.opacity = 1;
  });
}

chooseCategory();