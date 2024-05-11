//import classes and objects
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupConfirm from "../components/PopupConfirm.js";
import { validatorConfig, cardsListSelector, apiData } from "../utils/constants.js";
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
const userInfo = new UserInfo({
  name: profileNameEl,
  about: profileAboutEl,
  avatar: profileAvatar,
  apiHeaders: apiData.headers,
  apiUser: apiData.currentUser,
});
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
const avatarEditFormValidator = new FormValidator(validatorConfig, avatarEditForm);
profileFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarEditFormValidator.enableValidation();

const profilePopup = new PopupWithForm(
  "#profile-modal",
  (inputFieldValues, evt) => {
    evt.preventDefault();
    userInfo.setUserInfo(inputFieldValues, profilePopup);
  },
  profileFormValidator
);
profilePopup.setEventListeners();

const avatarEditPopup = new PopupWithForm(
  "#avatar-edit-modal",
  (inputValue, evt) => {
    evt.preventDefault();
    profileAvatar.src = inputValue.Link;
    // evt.submitter.textContent = "Saving...";
    updateAvatar(profileAvatar.src);
  },
  avatarEditFormValidator
);
avatarEditPopup.setEventListeners();

const addImagePopup = new PopupWithForm(
  "#add-modal",
  (inputFieldValues, evt) => {
    evt.preventDefault();
    uploadCard(inputFieldValues);
  },
  addFormValidator
);
addImagePopup.setEventListeners();

const imagePopup = new PopupWithImage("#image-modal");
imagePopup.setEventListeners();

const confirmPopup = new PopupConfirm("#confirm-modal", (cardData, evt) => {
  evt.preventDefault();
  deleteCard(cardData);
});
confirmPopup.setEventListeners();

//add event listeners
profileEditButton.addEventListener("click", () => {
  profilePopup.open();
  profileModalNameInput.value = userInfo.name.textContent;
  profileModalDescInput.value = userInfo.about.textContent;
  profileFormValidator.resetValidation();
  profileFormValidator.toggleButtonState();
});
profileAddButton.addEventListener("click", () => addImagePopup.open());
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
    (cardData) => {
      updateCardLike(cardData);
    }
  );
  return newCard.generateCardElement();
}

function deleteCard(cardData) {
  const deleteCardApi = new Api({
    url: `${apiData.cards}/${cardData.cardId}`,
    method: "DELETE",
    headers: apiData.headers,
  });
  deleteCardApi.handleFetch();
  cardData.cardEl.remove();
  cardData.cardEl = null;
}

function updateAvatar(newAvatar) {
  const uploadAvatarImgApi = new Api({
    url: apiData.currentUserAvatar,
    method: "PATCH",
    headers: apiData.headers,
    body: JSON.stringify({
      avatar: newAvatar,
    }),
  });
  uploadAvatarImgApi.handleFetch().then(() => avatarEditPopup.closeAfterSubmit());
}

function uploadCard(inputValues) {
  const { Link: link, Title: title } = inputValues;
  const uploadCardApi = new Api({
    url: apiData.cards,
    method: "POST",
    headers: apiData.headers,
    body: JSON.stringify({
      name: title,
      link: link,
    }),
  });
  uploadCardApi
    .handleFetch()
    .then((res) => {
      cardsListSection.addItem(createCard({ name: title, link: link, _id: res._id }), false);
    })
    .then(() => addImagePopup.closeAfterSubmit());
}

function updateCardLike(cardData) {
  const handleCardLikeApi = new Api({
    url: `${apiData.cards}/${cardData.cardId}/likes`,
    method: cardData.method,
    headers: apiData.headers,
  });
  handleCardLikeApi.handleFetch();
}
