//import classes and objects
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupConfirm from "../components/PopupConfirm.js";
import { validatorConfig, cardsListSelector } from "../utils/constants.js";
import "../pages/index.css";

//select elements
const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileAddButton = profile.querySelector(".profile__add-button");
const profileNameEl = profile.querySelector(".profile__title");
const profileAboutEl = profile.querySelector(".profile__description");
const profileAvatar = profile.querySelector(".profile__image");
const profileAvatarEdit = profile.querySelector(".profile__image-edit");
const profileModalForm = document.forms["profile-form"];
const profileModalNameInput = profileModalForm.querySelector(".profile-modal__name-input");
const profileModalDescInput = profileModalForm.querySelector(".profile-modal__desc-input");
const addModalForm = document.forms["add-form"];
const avatarEditForm = document.forms["avatar-edit-form"];

//instantiate classes
const profileFormValidator = new FormValidator(validatorConfig, profileModalForm);
const addFormValidator = new FormValidator(validatorConfig, addModalForm);
const avatarEditFormValidator = new FormValidator(validatorConfig, avatarEditForm);
profileFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarEditFormValidator.enableValidation();

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1/",
  headers: {
    authorization: "1dcec495-7d71-4d31-8e01-7428d02e5e7d",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  name: profileNameEl,
  about: profileAboutEl,
  avatar: profileAvatar,
});

const cardsListSection = new Section((item, firstRender) => {
  cardsListSection.addItem(createCard(item), firstRender);
}, cardsListSelector);

const profilePopup = new PopupWithForm(
  "#profile-modal",
  (inputFieldValues, evt) => {
    evt.preventDefault();
    api
      .setUserInfo(inputFieldValues)
      .then((res) => {
        userInfo.setUserInfo(res);
        profilePopup.closeAfterSubmit();
      })
      .catch((err) => alert(err))
      .finally(() => profilePopup.resetButtonText());
  },
  profileFormValidator
);
profilePopup.setEventListeners();

const avatarEditPopup = new PopupWithForm(
  "#avatar-edit-modal",
  (inputFieldValue, evt) => {
    evt.preventDefault();
    api
      .setUserAvatar(inputFieldValue.Link)
      .then((res) => {
        userInfo.setUserInfo(res);
        avatarEditPopup.closeAfterSubmit();
      })
      .catch((err) => alert(err))
      .finally(() => avatarEditPopup.resetButtonText());
  },
  avatarEditFormValidator
);
avatarEditPopup.setEventListeners();

const addCardPopup = new PopupWithForm(
  "#add-modal",
  (inputFieldValues, evt) => {
    evt.preventDefault();
    api
      .uploadCard(inputFieldValues)
      .then((res) => {
        cardsListSection.addItem(
          createCard({ name: inputFieldValues.Title, link: inputFieldValues.Link, _id: res._id }),
          false
        );
        addCardPopup.closeAfterSubmit();
      })
      .catch((err) => alert(err))
      .finally(() => addCardPopup.resetButtonText());
  },
  addFormValidator
);
addCardPopup.setEventListeners();

api
  .getInitialCards()
  .then((res) => cardsListSection.renderItems(res, true))
  .catch((err) => alert(err));

api
  .getUserInfo()
  .then((res) => userInfo.setUserInfo(res))
  .catch((err) => alert(err));

const imagePopup = new PopupWithImage("#image-modal");
imagePopup.setEventListeners();

const confirmPopup = new PopupConfirm("#confirm-modal", (cardData, evt) => {
  evt.preventDefault();
  api
    .deleteCard(cardData.cardId)
    .then(() => {
      cardData.cardEl.remove();
      cardData.cardEl = null;
      confirmPopup.close();
    })
    .catch((err) => alert(err))
    .finally(() => confirmPopup.resetButtonText());
});
confirmPopup.setEventListeners();

//add event listeners
profileEditButton.addEventListener("click", () => {
  profilePopup.open();
  const { name, about } = userInfo.getUserInfo();
  profileModalNameInput.value = name;
  profileModalDescInput.value = about;
  profileFormValidator.resetValidation();
  profileFormValidator.toggleButtonState();
});
profileAddButton.addEventListener("click", () => addCardPopup.open());
profileAvatarEdit.addEventListener("click", () => avatarEditPopup.open());

//functions
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
    (card, method) => {
      api
        .updateCardLike(card.id, method)
        .then((res) => card.toggleCardLike(res.isLiked))
        .catch((err) => alert(err));
    }
  );
  return newCard.generateCardElement();
}
