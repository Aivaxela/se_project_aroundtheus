import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputFieldValues = {};
    this._inputFields = this._popupForm.querySelectorAll(".modal__input");
    this._inputFields.forEach((field) => {
      inputFieldValues[field.name] = field.value;
    });

    return inputFieldValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this._onPopupSubmit);
  }

  _onPopupSubmit = (evt) => {
    const event = evt;
    this._handleFormSubmit(this._getInputValues(), event);
    this._popupForm.removeEventListener("submit", this._onPopupSubmit);
    this._popupForm.reset();
    this.close();
  };
}
