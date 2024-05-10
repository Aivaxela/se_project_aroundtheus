import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor(popupSelector, onConfirm) {
    super(popupSelector);
    this._onConfirm = onConfirm;
    this._submitButton = this._popupElement.querySelector(".modal__button");
  }

  open(data) {
    super.open();
    this._data = data;
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
    this._submitButton.addEventListener("click", this._submitPressed);
  }

  _submitPressed = (evt) => {
    const event = evt;
    this._onConfirm(this._data, event);
    this.close();
  };
}
