export default class Card {
  constructor({ name, link }, cardSelector, handleCardImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardImageClick = handleCardImageClick;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardDeleteIcon = this._cardElement.querySelector(".card__delete-button");
    this._cardLikeIcon = this._cardElement.querySelector(".card__like-button");
    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;

    this._setEventListeners();

    return this._cardElement;
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleCardImageClick(this._name, this._link);
    });
    this._cardDeleteIcon.addEventListener("click", () => {
      this._handleCardDelete();
    });
    this._cardLikeIcon.addEventListener("click", this._handleCardLike);
  }

  _handleCardDelete() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleCardLike() {
    this.classList.toggle("card__like-button_pressed");
  }
}
