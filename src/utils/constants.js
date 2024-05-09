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
