export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._renderedItems.forEach((item) => this._renderer(item));
  }

  placeItem(element) {
    this._container.prepend(element);
  }

  addItem(element) {
    this.placeItem(element);
  }

  _addNewImageCard() {
    const newCard = new Card(
      { name: addModalTitleInput.value, link: addModalLinkInput.value },
      "#card-template",
      handleCardImageClick
    );
    this._container.prepend(newCard);
  }
}
