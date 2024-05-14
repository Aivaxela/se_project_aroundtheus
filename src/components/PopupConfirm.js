import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor(popupSelector, onConfirm) {
    super(popupSelector);
    this._onConfirm = onConfirm;
    this._submitButton = this._popupElement.querySelector(".modal__button");
    this._submitButtonText = this._submitButton.textContent;
  }

  open(data) {
    super.open();
    this._data = data;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener("click", this._submitPressed);
  }

  _submitPressed = (evt) => {
    const event = evt;
    this._submitButton.textContent = "Saving...";
    this._onConfirm(this._data, event, this._submitButton, this._submitButtonText);
  };

  resetButtonText() {
    this._submitButton.textContent = this._submitButtonText;
  }
}
