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
    this._id = _id;
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

  _updateLikeStatus = () => {
    if (this._isLiked) {
      this._handleCardLikeClick({
        cardId: this._id,
        method: "DELETE",
        cardEl: this._cardElement,
        status: false,
        isLiked: this._isLiked,
        likeIcon: this._cardLikeIcon,
        card: this,
      });
    } else {
      this._handleCardLikeClick({
        cardId: this._id,
        method: "PUT",
        cardEl: this._cardElement,
        status: true,
        isLiked: this._isLiked,
        likeIcon: this._cardLikeIcon,
      });
    }
  };

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleCardImageClick();
    });
    this._cardDeleteIcon.addEventListener("click", () => {
      this._handleCardDeleteClick({ cardEl: this._cardElement, cardId: this._id });
    });
    this._cardLikeIcon.addEventListener("click", this._updateLikeStatus);
  }
}
