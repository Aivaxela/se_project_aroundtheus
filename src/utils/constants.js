export const initialCards = [
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

export const closeConditions = {
  modal: "modal",
  modalCloseButton: "modal__close",
};

export const validatorConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_inactive",
  errorClass: "modal__input-error",
};

export const cardsListSelector = ".cards__list";

export const apiData = {
  currentUser: "https://around-api.en.tripleten-services.com/v1/users/me",
  currentUserAvatar: "https://around-api.en.tripleten-services.com/v1/users/me/avatar",
  cards: "https://around-api.en.tripleten-services.com/v1/cards",
  headers: {
    authorization: "1dcec495-7d71-4d31-8e01-7428d02e5e7d",
    "Content-Type": "application/json",
  },
};
