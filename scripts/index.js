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
const cards = document.querySelector(".cards");

const profileModal = document.querySelector(".profile-modal");
const profileModalForm = profileModal.querySelector(".profile-modal__form");
const profileModalNameInput = profileModalForm.querySelector(
  ".profile-modal__name-input"
);
const profileModalDescInput = profileModalForm.querySelector(
  ".profile-modal__desc-input"
);
const profileModalHeader = profileModal.querySelector(
  ".profile-modal__heading"
);
const profileModalButton = profileModal.querySelector(".profile-modal__button");
const profileModalCloseButton = profileModal.querySelector(
  ".profile-modal__close"
);

const addModal = document.querySelector(".add-modal");
const addModalForm = addModal.querySelector(".add-modal__form");
const addModalTitleInput = addModalForm.querySelector(
  ".add-modal__title-input"
);
const addModalLinkInput = addModalForm.querySelector(".add-modal__link-input");
const addModalHeader = addModal.querySelector(".add-modal__heading");
const addModalButton = addModal.querySelector(".add-modal__button");
const addModalCloseButton = addModal.querySelector(".add-modal__close");

const imageModal = document.querySelector(".image-modal");
const imageModalImage = imageModal.querySelector(".image-modal__image");
const imageModalCaption = imageModal.querySelector(".image-modal__caption");
const imageModalCloseButton = imageModal.querySelector(".image-modal__close");
let currentModal;

initialCards.forEach((card) => renderCard(card));

function renderCard(card) {
  const cardElement = getCardElement(card);
  document.querySelector(".cards__list").prepend(cardElement);
}

function getCardElement(data) {
  const cardTemplate = document.querySelector("#card").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  cardTitle.textContent = data.name;
  cardImage.alt = data.name;
  cardImage.src = data.link;
  return cardElement;
}

profileEditButton.addEventListener("click", () => openModal("profile-edit"));
profileAddButton.addEventListener("click", () => openModal("profile-add"));
cards.addEventListener("click", handleCardElementsSelect);
profileModalForm.addEventListener("submit", handleFormSubmit);
profileModalCloseButton.addEventListener("click", closeModal);
addModalForm.addEventListener("submit", handleFormSubmit);
addModalCloseButton.addEventListener("click", closeModal);
imageModalCloseButton.addEventListener("click", closeModal);

function openModal(str) {
  if (str === "profile-edit") {
    profileModal.classList.add("modal_opened");
    populateProfileForm();
    currentModal = "profile-edit";
  } else if (str === "profile-add") {
    addModal.classList.add("modal_opened");
    populateAddForm();
    currentModal = "profile-add";
  }
}

function handleCardElementsSelect(evt) {
  let target = evt.target;

  if (target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_pressed");
  }
  if (target.classList.contains("card__delete-button")) {
    deleteImageCard(evt.target);
  }
  if (target.classList.contains("card__image")) {
    let image = target.src;
    let caption = target.alt;
    openImageModal(image, caption);
  }
}

function closeModal() {
  if (currentModal === "profile-edit") {
    profileModal.classList.remove("modal_opened");
  } else if (currentModal === "profile-add") {
    addModal.classList.remove("modal_opened");
  } else if (currentModal === "view-image") {
    imageModal.classList.remove("image-modal_opened");
  }
}

function openImageModal(image, caption) {
  imageModalImage.src = image;
  imageModalCaption.textContent = caption;
  imageModal.classList.add("image-modal_opened");
  currentModal = "view-image";
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  if (currentModal === "profile-edit") {
    updateProfileTextElements();
  } else if (currentModal === "profile-add") {
    addNewImageCard();
  }
  closeModal(currentModal);
}

function populateProfileForm() {
  profileModalNameInput.value = profileName.textContent;
  profileModalDescInput.value = profileJob.textContent;
}

function updateProfileTextElements() {
  profileName.textContent = profileModalNameInput.value;
  profileJob.textContent = profileModalDescInput.value;
}

function populateAddForm() {
  addModalTitleInput.value = "";
  addModalLinkInput.value = "";
}

function addNewImageCard() {
  let newCard = {
    name: addModalTitleInput.value,
    link: addModalLinkInput.value,
  };
  renderCard(newCard);
}

function deleteImageCard(card) {
  card.closest(".card").remove();
}
