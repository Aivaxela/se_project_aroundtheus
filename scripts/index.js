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
const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileAddButton = profile.querySelector(".profile__add-button");
const profileName = profile.querySelector(".profile__title");
const profileJob = profile.querySelector(".profile__description");
const cardsList = document.querySelector(".cards__list");
const closeButtons = document.querySelectorAll(".modal__close");

const profileModal = document.querySelector(".profile-modal");
const profileModalForm = document.forms["profile-form"];
const profileModalNameInput = profileModalForm.querySelector(".profile-modal__name-input");
const profileModalDescInput = profileModalForm.querySelector(".profile-modal__desc-input");
const profileModalButton = profileModal.querySelector(".profile-modal__button");

const addModal = document.querySelector(".add-modal");
const addModalForm = document.forms["add-form"];
const addModalTitleInput = addModalForm.querySelector(".add-modal__title-input");
const addModalLinkInput = addModalForm.querySelector(".add-modal__link-input");

const imageModal = document.querySelector(".image-modal");
const imageModalImage = imageModal.querySelector(".image-modal__image");
const imageModalCaption = imageModal.querySelector(".image-modal__caption");

initialCards.forEach(renderCard);

function renderCard(card) {
  cardsList.prepend(getCardElement(card));
}

function getCardElement(data) {
  const cardTemplate = document.querySelector("#card").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardDeleteIcon = cardElement.querySelector(".card__delete-button");
  const cardLikeIcon = cardElement.querySelector(".card__like-button");
  cardImage.addEventListener("click", handleCardImageClick);
  cardDeleteIcon.addEventListener("click", handleCardDelete);
  cardLikeIcon.addEventListener("click", handleCardLike);
  cardTitle.textContent = data.name;
  cardImage.alt = data.name;
  cardImage.src = data.link;
  return cardElement;
}

profileEditButton.addEventListener("click", populateProfileForm);
profileEditButton.addEventListener("click", () => openModal(profileModal));
profileAddButton.addEventListener("click", () => openModal(addModal));
profileModalForm.addEventListener("submit", handleProfileFormSubmit);
addModalForm.addEventListener("submit", handleAddImageFormSubmit);
closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

function openModal(modal) {
  modal.classList.add("modal_opened");

  const formList = modal.querySelectorAll(".modal__form");
  formList.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(".modal__input"));
    const buttonElement = formElement.querySelector('.modal__button[type="submit"]');
    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      toggleButtonState(inputList, buttonElement);
      toggleInputValidityErrors(formElement, inputElement);
    });
  });
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function handleCardImageClick(evt) {
  const image = evt.target.src;
  const caption = evt.target.alt;
  openImageModal(image, caption);
}

function handleCardDelete(evt) {
  deleteImageCard(evt.target);
}

function handleCardLike(evt) {
  evt.target.classList.toggle("card__like-button_pressed");
}

function openImageModal(image, caption) {
  imageModalImage.src = image;
  imageModalImage.alt = caption;
  imageModalCaption.textContent = caption;
  openModal(imageModal);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  updateProfileTextElements();
  closeModal(profileModal);
}

function handleAddImageFormSubmit(evt) {
  evt.preventDefault();
  addNewImageCard();
  resetAddForm();
  closeModal(addModal);
}

function populateProfileForm() {
  profileModalNameInput.value = profileName.textContent;
  profileModalDescInput.value = profileJob.textContent;
}

function updateProfileTextElements() {
  profileName.textContent = profileModalNameInput.value;
  profileJob.textContent = profileModalDescInput.value;
}

function resetAddForm() {
  addModalTitleInput.value = "";
  addModalLinkInput.value = "";
}

function addNewImageCard() {
  const newCard = {
    name: addModalTitleInput.value,
    link: addModalLinkInput.value,
  };
  renderCard(newCard);
}

function deleteImageCard(card) {
  card.closest(".card").remove();
}

enableValidation();

function enableValidation() {
  const formList = Array.from(document.forms);
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".modal__input"));
  const buttonElement = formElement.querySelector('.modal__button[type="submit"]');
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      toggleButtonState(inputList, buttonElement);
      toggleInputValidityErrors(formElement, inputElement);
    });
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("modal__button_inactive");
  } else {
    buttonElement.classList.remove("modal__button_inactive");
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleInputValidityErrors(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
  inputElement.classList.add("form__input_type_error");
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = "";
  errorElement.classList.remove("form__input-error_active");
  inputElement.classList.remove("form__input_type_error");
}
