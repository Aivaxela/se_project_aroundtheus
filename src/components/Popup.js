export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {}

  close() {}

  _listenForEsc() {}

  _setEventListeners() {}
}
