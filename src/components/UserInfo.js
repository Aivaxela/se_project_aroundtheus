export default class UserInfo {
  constructor(nameElement, titleElement) {
    this._name = nameElement.textContent;
    this._title = titleElement.textContent;
  }

  getUserInfo() {
    return { name: this._name, title: this._title };
  }

  setUserInfo({ Desc, Name }) {
    this._name = Name;
    this._title = Desc;
  }
}
