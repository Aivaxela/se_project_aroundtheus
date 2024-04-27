//import classes and objects
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import "../pages/index.css";
import {
  initialCards,
  closeConditions,
  validatorConfig,
  cardsListSection,
} from "../utils/constants.js";
//

//select elements
const modals = document.querySelectorAll(".modal");
const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileAddButton = profile.querySelector(".profile__add-button");
const profileName = profile.querySelector(".profile__title");
const profileJob = profile.querySelector(".profile__description");
const profileModal = document.querySelector(".profile-modal");
const profileModalForm = document.forms["profile-form"];
const profileModalNameInput = profileModalForm.querySelector(".profile-modal__name-input");
const profileModalDescInput = profileModalForm.querySelector(".profile-modal__desc-input");
const addModal = document.querySelector(".add-modal");
const addModalForm = document.forms["add-form"];
const addModalTitleInput = addModalForm.querySelector(".add-modal__title-input");
const addModalLinkInput = addModalForm.querySelector(".add-modal__link-input");
const imageModal = document.querySelector(".image-modal");
const imageModalImage = imageModal.querySelector(".image-modal__image");
const imageModalCaption = imageModal.querySelector(".image-modal__caption");
//

//render intial cards
const cardsList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card-template", handleCardImageClick);
      cardsList.placeItem(card.generateCardElement());
    },
  },
  cardsListSection
);
cardsList.renderItems();
//

//instantiate classes
const profileFormValidator = new FormValidator(validatorConfig, profileModalForm);
const addFormValidator = new FormValidator(validatorConfig, addModalForm);
profileFormValidator.enableValidation();
addFormValidator.enableValidation();
//

//add event listeners
profileEditButton.addEventListener("click", openProfileForm);
profileAddButton.addEventListener("click", openAddForm);
profileModalForm.addEventListener("submit", handleProfileFormSubmit);
addModalForm.addEventListener("submit", handleAddImageFormSubmit);
modals.forEach((modal) => {
  const currentModal = modal;
  modal.addEventListener("click", (evt) => {
    const event = evt;
    handleModalClose(currentModal, event);
  });
});
//

/////////////////////////////////////////

const newCardPopup = new PopupWithForm("#add-card-modal", () => {});
newCardPopup.handleFormSubmit();

/////////////////////////////////////////

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

function handleModalClose(modal, evt) {
  const eventClasses = [...evt.target.classList];
  const closeConditionMet = eventClasses.some((className) => {
    return Object.values(closeConditions).includes(className);
  });
  if (closeConditionMet) {
    closeModal(modal);
  }
}

function handleCardImageClick(cardName, cardLink) {
  openImageModal(cardName, cardLink);
}

function openImageModal(caption, image) {
  imageModalImage.alt = caption;
  imageModalImage.src = image;
  imageModalCaption.textContent = caption;
  openModal(imageModal);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  updateProfileTextElements();
  handleModalClose(profileModal, evt);
}

function handleAddImageFormSubmit(evt) {
  evt.preventDefault();
  cardsList.addItem;

  const card = new Card(
    { name: addModalTitleInput.value, link: addModalLinkInput.value },
    "#card-template",
    handleCardImageClick
  );
  cardsList.addItem(card.generateCardElement());
  evt.target.reset();
  addFormValidator.toggleButtonState();
  PopupWithForm.close();
}

function openProfileForm() {
  const profileForm = new PopupWithForm(profileModal, handleFormSubmit);
  profileForm.open();

  // profileModalNameInput.value = profileName.textContent;
  // profileModalDescInput.value = profileJob.textContent;
  // openModal(profileModal);
  // profileFormValidator.resetValidation();
  // profileFormValidator.toggleButtonState();
}

function openAddForm() {
  openModal(addModal);
}

function updateProfileTextElements() {
  profileName.textContent = profileModalNameInput.value;
  profileJob.textContent = profileModalDescInput.value;
}

// function addNewImageCard() {
//   const newCard = new Card(
//     { name: addModalTitleInput.value, link: addModalLinkInput.value },
//     "#card-template",
//     handleCardImageClick
//   );
//   cardsListSection.prepend(newCard);
// }
