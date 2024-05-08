//import classes and objects
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import "../pages/index.css";
import { initialCards, validatorConfig, cardsListSelector, apiData } from "../utils/constants.js";

//select elements
const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileAddButton = profile.querySelector(".profile__add-button");
const profileNameEl = profile.querySelector(".profile__title");
const profileAboutEl = profile.querySelector(".profile__description");
const profileModalForm = document.forms["profile-form"];
const profileModalNameInput = profileModalForm.querySelector(".profile-modal__name-input");
const profileModalDescInput = profileModalForm.querySelector(".profile-modal__desc-input");
const addModalForm = document.forms["add-form"];

//instantiate classes
const userInfo = new UserInfo(profileNameEl, profileAboutEl, apiData.headers, apiData.currentUser);
userInfo.getUserInfo();

const initialCardsApi = new Api({
  url: apiData.cards,
  headers: apiData.headers,
});
const cardsList = initialCardsApi.getInitialCardsApi().then((res) => {
  renderInitalCards(res);
});

function renderInitalCards(cards) {
  const cardListSection = new Section(
    {
      data: cards,
      renderer: (item) => {
        cardListSection.addItem(createCard(item));
      },
    },
    cardsListSelector
  );
  cardListSection.renderItems();
}

// const cardsList = new Section(
//   {
//     data: cards,
//     renderer: (item) => {
//       createCard(item);
//     },
//   },
//   cardsListSection
// );
// cards.forEach((card) => createCard(card));

const profileFormValidator = new FormValidator(validatorConfig, profileModalForm);
const addFormValidator = new FormValidator(validatorConfig, addModalForm);
profileFormValidator.enableValidation();
addFormValidator.enableValidation();

const profilePopup = new PopupWithForm(
  "#profile-modal",
  (inputFieldValues, evt) => {
    evt.preventDefault();
    userInfo.setUserInfo(inputFieldValues);
  },
  profileFormValidator
);
profilePopup.setEventListeners();

const addImagePopup = new PopupWithForm(
  "#add-modal",
  (inputFieldValues, evt) => {
    evt.preventDefault();
    const { Link: link, Title: title } = inputFieldValues;
    createCard({ name: title, link: link });
  },
  addFormValidator
);
addImagePopup.setEventListeners();

const imagePopup = new PopupWithImage("#image-modal");
imagePopup.setEventListeners();

// const cardsList = new Section(
//   {
//     data: initialCards,
//     renderer: (item) => {
//       createCard(item);
//     },
//   },
//   cardsListSection
// );
// cardsList.renderItems();

//add event listeners
profileEditButton.addEventListener("click", openProfileForm);
profileAddButton.addEventListener("click", openAddForm);

//event listener callbacks
function openProfileForm() {
  profilePopup.open();
  profileModalNameInput.value = userInfo.name.textContent;
  profileModalDescInput.value = userInfo.about.textContent;
  profileFormValidator.resetValidation();
  profileFormValidator.toggleButtonState();
}

function openAddForm() {
  addImagePopup.open();
}

function createCard(card) {
  const newCard = new Card(card, "#card-template", () => {
    imagePopup.open(newCard);
  });
  return newCard.generateCardElement();
  // cardsList.addItem(newCard.generateCardElement());

  // const postCardApi = new Api({
  //   url: apiData.cards,
  //   method: "POST",
  //   headers: apiData.headers,
  //   body: JSON.stringify({
  //     name: card.name,
  //     link: card.link,
  //   }),
  // });
  // postCardApi.postCard();
}

//uncomment incase of accidental mass card duplication:

// fetch("https://around-api.en.tripleten-services.com/v1/cards", {
//   headers: {
//     authorization: "1dcec495-7d71-4d31-8e01-xxxxxxxxxx",
//     "Content-Type": "application/json",
//   },
// })
//   .then((res) => res.json())
//   .then((res) => {
//     const cards = [];
//     res.forEach((card) => {
//       cards.push(card);
//     });
//     return cards;
//   })
//   .then((cards) => deleteZeDupes(cards));

// function deleteZeDupes(cards) {
//   cards.forEach((card) => {
//     fetch(`https://around-api.en.tripleten-services.com/v1/cards/${card._id}`, {
//       method: "DELETE",
//       headers: {
//         authorization: "1dcec495-7d71-4d31-8e01-xxxxxxxxxx",
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => res.json())
//       .then((res) => console.log(res));
//   });
// }
