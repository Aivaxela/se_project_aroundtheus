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
const modal = document.querySelector(".modal");
const modalForm = modal.querySelector(".modal__form");
const modalHeader = modal.querySelector(".modal__heading");
const modalButton = modal.querySelector(".modal__button");
const modalCloseButton = modal.querySelector(".modal__close");
const modalInput1 = modalForm.querySelector("input[name='input1']");
const modalInput2 = modalForm.querySelector("input[name='input2']");
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
modalForm.addEventListener("submit", handleProfileFormSubmit);
modalCloseButton.addEventListener("click", closeModal);

function openModal(str) {
  modal.classList.add("modal_opened");
  if (str === "profile-edit") {
    populateProfileEditForm();
    currentModal = "profile-edit";
  } else if (str === "profile-add") {
    populateProfileAddForm();
    currentModal = "profile-add";
  }
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  if (currentModal === "profile-edit") {
    updateProfileTextElements();
  } else if (currentModal === "profile-add") {
    addNewImageCard();
    console.log("submitted new image");
  }
  closeModal();
}

function closeModal() {
  modal.classList.remove("modal_opened");
}

function populateProfileEditForm() {
  modalHeader.textContent = "Edit Profile";
  modalInput1.placeholder = "Name";
  modalInput2.placeholder = "Description";
  modalButton.textContent = "Save";
  modalInput1.value = profileName.textContent;
  modalInput2.value = profileJob.textContent;
}

function populateProfileAddForm() {
  modalHeader.textContent = "New place";
  modalInput1.placeholder = "Title";
  modalInput2.placeholder = "Image link";
  modalButton.textContent = "Create";
  modalInput1.value = "";
  modalInput2.value = "";
}

function updateProfileTextElements() {
  profileName.textContent = modalInput1.value;
  profileJob.textContent = modalInput2.value;
}

function addNewImageCard() {
  let newCard = {
    name: modalInput1.value,
    link: modalInput2.value,
  };
  initialCards.unshift(newCard);
  renderCard(newCard);
}
