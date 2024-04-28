import { closeConditions } from "../utils/constants";

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
