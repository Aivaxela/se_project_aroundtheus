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
const profileName = profile.querySelector(".profile__title");
const profileJob = profile.querySelector(".profile__description");
const modal = document.querySelector(".modal");
const modalForm = modal.querySelector(".modal__form");
const modalCloseButton = modal.querySelector(".modal__close");
const nameInput = modalForm.querySelector("input[name='title']");
const jobInput = modalForm.querySelector("input[name='description']");

for (let i = 0; i < initialCards.length; i++) {
  renderCard(initialCards[i]);
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

function renderCard(data) {
  const cardElement = getCardElement(data);
  document.querySelector(".cards__list").prepend(cardElement);
}

profileEditButton.addEventListener("click", openModal);
modalForm.addEventListener("submit", handleProfileFormSubmit);
modalCloseButton.addEventListener("click", closeModal);

function openModal() {
  modal.classList.add("modal_opened");
  populateProfileForm();
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  updateProfileTextElements();
  closeModal();
}

function closeModal() {
  modal.classList.remove("modal_opened");
}

function populateProfileForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function updateProfileTextElements() {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}
