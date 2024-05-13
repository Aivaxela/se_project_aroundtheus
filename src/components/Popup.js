export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._listenForEsc);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._listenForEsc);
  }

  setEventListeners() {
    this._popupElement.addEventListener("click", this._handleOutsideClickClose);
  }

  _handleOutsideClickClose = (evt) => {
    const targetClasses = [...evt.target.classList];
    if (targetClasses.includes("modal") || targetClasses.includes("modal__close")) {
      this.close();
    }
  };

  _listenForEsc = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };
}
