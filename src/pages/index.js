//import classes and objects
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import "../pages/index.css";
import { initialCards, validatorConfig, cardsListSection } from "../utils/constants.js";

//select elements
const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileAddButton = profile.querySelector(".profile__add-button");
const profileName = profile.querySelector(".profile__title");
const profileJob = profile.querySelector(".profile__description");
const profileModalForm = document.forms["profile-form"];
const profileModalNameInput = profileModalForm.querySelector(".profile-modal__name-input");
const profileModalDescInput = profileModalForm.querySelector(".profile-modal__desc-input");
const addModalForm = document.forms["add-form"];

//instantiate classes
const userInfo = new UserInfo(profileName, profileJob);
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

const cardsList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      createCard(item);
    },
  },
  cardsListSection
);
cardsList.renderItems();

//add event listeners
profileEditButton.addEventListener("click", openProfileForm);
profileAddButton.addEventListener("click", openAddForm);

//event listener callbacks
function openProfileForm() {
  profilePopup.open();
  const { name, title } = userInfo.getUserInfo();
  profileModalNameInput.value = name;
  profileModalDescInput.value = title;
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
  cardsList.addItem(newCard.generateCardElement());
}
