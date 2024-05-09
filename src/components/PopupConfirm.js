import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor(popupSelector, onConfirm) {
    super(popupSelector);
    this._onConfirm = onConfirm;
    this._submitButton = this._popupElement.querySelector(".modal__button");
  }

  open(data) {
    console.log(data);
    super.open();
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
    this._popupElement.addEventListener("submit", this._onPopupSubmit);
  }

  _onPopupSubmit = (evt) => {
    const event = evt;
    this._handleFormSubmit(this._getInputValues(), event);
    this.close();
  };
}
