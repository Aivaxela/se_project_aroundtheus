import Card from "./Card.js";

export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._renderedItems.forEach((item) => this._renderer(item));
  }

  addItem(element) {
    this.placeItem(element);
  }

  placeItem(element) {
    this._container.prepend(element);
  }
}
