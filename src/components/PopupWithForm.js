import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, formValidator) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputFields = this._popupForm.querySelectorAll(".modal__input");
    this._submitButton = this._popupForm.querySelector(".modal__button");
    this._submitButtonText = this._submitButton.textContent;
    this._formValidator = formValidator;
  }

  _getInputValues() {
    const inputFieldValues = {};
    this._inputFields.forEach((field) => {
      inputFieldValues[field.name] = field.value;
    });

    return inputFieldValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this._onPopupSubmit);
  }

  closeAfterSubmit() {
    this._popupForm.reset();
    this._submitButton.textContent = this._submitButtonText;
    this._formValidator.toggleButtonState();
    this.close();
  }

  _onPopupSubmit = (evt) => {
    const event = evt;
    this._submitButton.textContent = "Saving...";
    this._handleFormSubmit(this._getInputValues(), event);
  };
}
