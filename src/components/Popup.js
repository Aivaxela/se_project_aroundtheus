import { closeConditions } from "../utils/constants";

export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    this._popupElement.removeEventListener("click", this._handleOutsideClickClose);
    document.removeEventListener("keydown", this._listenForEsc);
  }

  setEventListeners() {
    this._popupElement.addEventListener("click", this._handleOutsideClickClose);
    document.addEventListener("keydown", this._listenForEsc);
  }

  _handleOutsideClickClose = (evt) => {
    const eventClasses = [...evt.target.classList];
    const closeConditionMet = eventClasses.some((className) => {
      return Object.values(closeConditions).includes(className);
    });
    if (closeConditionMet) {
      this.close();
    }
  };

  _listenForEsc = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };
}
