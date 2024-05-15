export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleCardImageClick,
    handleCardDeleteClick,
    handleCardLikeClick
  ) {
    this._name = name;
    this._link = link;
    this.id = _id;
    this._isLiked = isLiked;
    this._cardSelector = cardSelector;
    this._handleCardImageClick = handleCardImageClick;
    this._handleCardDeleteClick = handleCardDeleteClick;
    this._handleCardLikeClick = handleCardLikeClick;
  }

  generateCardElement() {
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
    this._setInitialLikeStatus();

    return this._cardElement;
  }

  _setInitialLikeStatus() {
    if (this._isLiked) {
      this._cardLikeIcon.classList.add("card__like-button_pressed");
    }
  }
  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleCardImageClick();
    });
    this._cardDeleteIcon.addEventListener("click", () => {
      this._handleCardDeleteClick({ cardEl: this._cardElement, cardId: this.id });
    });
    this._cardLikeIcon.addEventListener("click", () => {
      if (this._isLiked) {
        this._handleCardLikeClick(this, "DELETE");
      } else {
        this._handleCardLikeClick(this, "PUT");
      }
    });
  }

  toggleCardLike(isLiked) {
    if (isLiked) {
      this._cardLikeIcon.classList.add("card__like-button_pressed");
      this._isLiked = true;
    } else {
      this._cardLikeIcon.classList.remove("card__like-button_pressed");
      this._isLiked = false;
    }
  }
}
