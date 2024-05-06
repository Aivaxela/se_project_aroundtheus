export default class UserInfo {
  constructor() {
    // this._name = nameElement;
    // this._title = titleElement;
  }

  getUserInfo() {}

  setUserInfo({ Desc, Name }) {
    this._name.textContent = Name;
    this._title.textContent = Desc;
  }
}
