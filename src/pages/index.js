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
const confirmModal = document.querySelector("#confirm-modal");

//instantiate classes
const userInfo = new UserInfo(profileNameEl, profileAboutEl, apiData.headers, apiData.currentUser);
userInfo.getUserInfo();

const initialCardsApi = new Api({
  url: apiData.cards,
  headers: apiData.headers,
});
initialCardsApi.retrieveData().then((res) => {
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
  const newCard = new Card(card, "#card-template", () => {
    imagePopup.open(newCard);
  });
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
  uploadCardApi.sendData();
}
