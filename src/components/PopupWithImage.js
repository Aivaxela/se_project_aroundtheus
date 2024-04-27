import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._caption = this._popupElement.querySelector(".image-modal__caption");
    this._image = this._popupElement.querySelector(".image-modal__image");
  }

  open(data) {
    this._image.alt = data._name;
    this._image.src = data._link;
    this._caption.textContent = data._name;
    super.open();
  }
}
