export default class UserInfo {
  constructor({ name, about, avatar }) {
    this.name = name;
    this.about = about;
    this.avatar = avatar;
  }

  getUserInfo(apiData) {
    this.name.textContent = apiData.name;
    this.about.textContent = apiData.about;
    this.avatar.src = apiData.avatar;
  }

  setUserInfo({ name, about, avatar }) {
    this.name.textContent = name;
    this.about.textContent = about;
    this.avatar.src = avatar;
  }
}
