// global variables
const categoryWrapper = document.querySelector('.category-wrapper');
const categoryButtons = document.querySelectorAll('.category-wrapper li');
const guessesRemainingWrapper = document.querySelector('.guesses-remaining-wrapper');
const selectedCategoryWrapper = document.querySelector('.selected-category-wrapper');
const letterButtons = document.querySelectorAll('.letters-wrapper-inner span');

let selectedCategory;
let selectedCategoryTitle;
let selectedCategoryWords;

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

function chooseCategory() {
  // loop over category buttons add event listeners
  categoryButtons.forEach((button) => {
    button.addEventListener('click', function(e) {
      // update value of selectedCategory
      selectedCategory = e.target.attributes[0].nodeValue;
      categoryWrapper.classList.add('fadeOut'); // add class of .fadeOut
      setTimeout(function() { // add display: none after 500ms
        categoryWrapper.style.display = 'none';
      }, 500);
      useCategoryTitle(); // calls useCategoryTitle()
    });
  });
}

function useCategoryTitle() {
  selectedCategoryTitle = categories[selectedCategory].title;
  selectedCategoryWrapper.children[1].innerText = selectedCategoryTitle;
}

// function pickWord() {
//   console.log(categories[selectedCategory]);
// }

chooseCategory();
