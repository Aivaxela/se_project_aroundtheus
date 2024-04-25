export default class Popup {
  constructor({ popupSelector }) {
    this._popupSelector = document.querySelector(popupSelector);
  }

  open() {}

  close() {}

  _listenForEsc() {}

  _setEventListeners() {}
}
