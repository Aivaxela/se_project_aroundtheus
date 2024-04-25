import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Gaming",
    link: "https://images.unsplash.com/photo-1586182987320-4f376d39d787?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "GTI",
    link: "https://images.unsplash.com/photo-1629885389996-c149c822392f?q=80&w=3176&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Pizza",
    link: "https://images.unsplash.com/photo-1544982503-9f984c14501a?q=80&w=2667&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Mountains",
    link: "https://images.unsplash.com/photo-1434394354979-a235cd36269d?q=80&w=3251&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Redwing Blackbird",
    link: "https://images.unsplash.com/photo-1691024305743-9376816b6a92?q=80&w=3271&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Space",
    link: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=3313&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const createCard = (cardData) => {
  const card = new Card(cardData, "#card-template", handleCardImageClick);
  return card.getView();
};

const cardsList = document.querySelector(".cards__list");
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  cardsList.prepend(cardElement);
  createCard(cardElement);
});

const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileAddButton = profile.querySelector(".profile__add-button");
const profileName = profile.querySelector(".profile__title");
const profileJob = profile.querySelector(".profile__description");
const modals = document.querySelectorAll(".modal");
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
const closeConditions = {
  modal: "modal",
  modalCloseButton: "modal__close",
  modalSubmitButton: "modal__button",
};
const validatorConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_inactive",
  errorClass: "modal__input-error",
};
const profileFormValidator = new FormValidator(validatorConfig, profileModalForm);
const addFormValidator = new FormValidator(validatorConfig, addModalForm);
profileFormValidator.enableValidation();
addFormValidator.enableValidation();

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
  addNewImageCard();
  evt.target.reset();
  handleModalClose(addModal, evt);
  addFormValidator.toggleButtonState();
}

function openProfileForm() {
  profileModalNameInput.value = profileName.textContent;
  profileModalDescInput.value = profileJob.textContent;
  openModal(profileModal);
  profileFormValidator.resetValidation();
  profileFormValidator.toggleButtonState();
}

function openAddForm() {
  openModal(addModal);
}

function updateProfileTextElements() {
  profileName.textContent = profileModalNameInput.value;
  profileJob.textContent = profileModalDescInput.value;
}

function addNewImageCard() {
  const newCard = createCard({ name: addModalTitleInput.value, link: addModalLinkInput.value });
  cardsList.prepend(newCard);
}
