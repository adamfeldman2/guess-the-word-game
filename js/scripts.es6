// global variables
const categoryWrapper = document.querySelector('.category-wrapper');
const playingField = document.querySelector('.playing-field');
const categoryButtons = document.querySelectorAll('.category-wrapper li');
const guessesRemainingWrapper = document.querySelector('.guesses-remaining-wrapper');
const selectedCategoryWrapper = document.querySelector('.selected-category-wrapper');
const letterButtons = document.querySelectorAll('.letters-wrapper-inner span');

let selectedCategory;
let selectedCategoryTitle;
let selectedCategoryWords;
let randomWord;

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

      // fade .category-wrapper out
      categoryWrapper.classList.add('fadeOut'); // add class of .fadeOut
      setTimeout(function() { // add display: none after 500ms
        categoryWrapper.style.display = 'none';
      }, 500);
      
      // fade .playing-field in
      setTimeout(function() { // add display: block after 500ms
      		playingField.style.display = 'block';	
      	setTimeout(function() {
      		playingField.classList.add('fadeIn'); // add class of .fadeIn
      	}, 500);
      }, 500);
      
      useCategoryTitle(); // calls useCategoryTitle()
      useRandomWord(); // calls useRandomWord()
    });
  });
}

// displays the selectedCategoryTitle on the page
function useCategoryTitle() {
	selectedCategoryTitle = categories[selectedCategory].title;
	selectedCategoryWrapper.children[1].innerText = selectedCategoryTitle;
}

function useRandomWord() {
	selectedCategoryWords = categories[selectedCategory].words;
	// generate random number from 0 to number of indexes in array
	const randomNum = Math.floor(Math.random() * selectedCategoryWords.length);
	randomWord = selectedCategoryWords[randomNum];
}

chooseCategory();
