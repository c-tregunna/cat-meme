// import {catsData} from "./data.js"; Need to sue if importing

const emotionsRadio = document.getElementById("emotion-radios");
const getImageBtn = document.getElementById("get-image-btn");
const animatedGifCheck = document.getElementById("gifs-only-option");
const memeModalInner = document.getElementById("meme-modal-inner");
const memeModal = document.getElementById("meme-modal");
const closeModalBtn = document.getElementById("meme-modal-close-btn");

// EVENT LISTENERS
emotionsRadio.addEventListener("change", highlightCheckedOption);

closeModalBtn.addEventListener("click", closeModal);

getImageBtn.addEventListener("click", renderCat);

//  EVENT LISTER FUNCTIONS

function highlightCheckedOption(e) {
  //e will be the radio button
  const radioArray = document.getElementsByClassName("radio");
  for (let radio of radioArray) {
    radio.classList.remove("highlight");
  }
  document.getElementById(e.target.id).parentElement.classList.add("highlight");
}

function closeModal() {
  memeModal.style.display = "none";
}

// Function will use the cat object provided by getSingleCatObject to create html sting to render to the dom (page)
function renderCat() {
  const catObject = getSingleCatObject();

  memeModalInner.innerHTML = `
        <img class="cat-img" src="./images/${catObject.image}" alt="${catObject.alt}">
    `;
  memeModal.style.display = "flex";
}

// FUNCTIONS
// Function return a single cat object select from the array provided by the getMatchingCatsArray
function getSingleCatObject() {
  const catsArray = getMatchingCatsArray();
  if (catsArray.length === 1) {
    //if only one cat in the array, just retunr the object at 1st index
    return catsArray[0];
  } else {
    //if more than 1 cat, select a random object and return that
    const randomCat = Math.floor(Math.random() * catsArray.length);
    return catsArray[randomCat];
  }
}

// Fuction returns an array of cat objects that matches a users choice
function getMatchingCatsArray() {
  const isGif = animatedGifCheck.checked;
  // console.log(isAnimated);
  if (document.querySelector('input[type="radio"]:checked')) {
    //checking that somethng that is a radio button is checked
    const selectedEmotion = document.querySelector(
      'input[type="radio"]:checked'
    ).value;
    // console.log(selectedEmotion)
    const matchingCats = catsData.filter(function (cats) {
      //filters out cats with the selected emotion
      if (isGif) {
        return cats.emotionTags.includes(selectedEmotion) && cats.isGif;
      } else {
        return cats.emotionTags.includes(selectedEmotion);
      }
    });
    return matchingCats;
    // console.log(matchingCats);
  }
}

//** This function create the Emotions array from the cat data **//
function getEmotionsArray(cats) {
  const emotionsArray = [];
  for (let cat of cats) {
    // grabs each cat from all the cats
    for (let emotion of cat.emotionTags) {
      // grab each emotion from the indiviudal cat and their emotion tag
      if (!emotionsArray.includes(emotion)) {
        emotionsArray.push(emotion); //pushs each individual emotion ot the emotions array
      }
    }
  }
  return emotionsArray; //this function now creates this array and provides it so we can call this function whenever we need the array
}

//** This function renders the emotions to the html **//
function renderEmotionsRadios(cats) {
  const emotions = getEmotionsArray(cats); //get access to the array created in the getEmotionsArray
  let catEmotions = ``;
  for (let emotion of emotions) {
    catEmotions += `<div class="radio">
                            <label for="${emotion}">${emotion}</label>
                            <input type="radio" id="${emotion}" value="${emotion}" name="emotion-choices">
                       </div>`;
  }
  emotionsRadio.innerHTML = catEmotions;
}
renderEmotionsRadios(catsData);
