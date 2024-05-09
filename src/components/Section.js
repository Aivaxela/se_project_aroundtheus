export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(data, firstRender) {
    data.forEach((item) => this._renderer(item, firstRender));
  }

  addItem(element, renderingInitials) {
    if (renderingInitials) {
      this._container.append(element);
      return;
    }
    this._container.prepend(element);
  }
}
