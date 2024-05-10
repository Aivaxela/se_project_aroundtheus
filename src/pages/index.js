//import classes and objects
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import "../pages/index.css";
import { validatorConfig, cardsListSelector, apiData } from "../utils/constants.js";
import PopupConfirm from "../components/PopupConfirm.js";

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
initialCardsApi.handleFetch().then((res) => {
  cardsListSection.renderItems(res, true);
});

const cardsListSection = new Section((item, firstRender) => {
  cardsListSection.addItem(createCard(item), firstRender);
}, cardsListSelector);

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
    cardsListSection.addItem(createCard({ name: title, link: link }), false);
    uploadCardToApi(link, title);
  },
  addFormValidator
);
addImagePopup.setEventListeners();

const imagePopup = new PopupWithImage("#image-modal");
imagePopup.setEventListeners();

const confirmPopup = new PopupConfirm("#confirm-modal", (cardData, evt) => {
  evt.preventDefault();
  const deleteCardApi = new Api({
    url: `${apiData.cards}/${cardData.cardId}`,
    method: "DELETE",
    headers: apiData.headers,
  });
  deleteCardApi.handleFetch();
  cardData.cardEl.remove();
  cardData.cardEl = null;
});
confirmPopup.setEventListeners();

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

//functions
function openAddForm() {
  addImagePopup.open();
}

function createCard(card) {
  const newCard = new Card(
    card,
    "#card-template",
    () => {
      imagePopup.open(newCard);
    },
    (cardData) => {
      confirmPopup.open(cardData);
    },
    (cardData) => {
      const handleCardLikeApi = new Api({
        url: `${apiData.cards}/${cardData.cardId}/likes`,
        method: cardData.method,
        headers: apiData.headers,
      });
      handleCardLikeApi.handleFetch();
      console.log(cardData.cardEl);
      cardData.cardEl.classList.toggle("card__like-button_pressed");
      console.log(`${apiData.cards}/${cardData.cardId}/likes`);
    }
  );
  return newCard.generateCardElement();
}

function uploadCardToApi(link, title) {
  const uploadCardApi = new Api({
    url: apiData.cards,
    method: "POST",
    headers: apiData.headers,
    body: JSON.stringify({
      name: title,
      link: link,
    }),
  });
  uploadCardApi.handleFetch();
}
