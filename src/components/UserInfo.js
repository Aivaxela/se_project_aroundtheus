export default class UserInfo {
  constructor(nameElement, titleElement) {
    this._name = nameElement;
    this._title = titleElement;
  }

  getUserInfo() {
    return { name: this._name.textContent, title: this._title.textContent };
  }

  setUserInfo({ Desc, Name }) {
    this._name.textContent = Name;
    this._title.textContent = Desc;
  }
}
