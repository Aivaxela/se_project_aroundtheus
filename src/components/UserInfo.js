export default class UserInfo {
  constructor({ name, about, avatar }) {
    this.name = name;
    this.about = about;
    this.avatar = avatar;
  }

  getUserInfo() {
    return { name: this.name.textContent, about: this.about.textContent };
  }

  setUserInfo({ name, about, avatar }) {
    this.name.textContent = name;
    this.about.textContent = about;
    this.avatar.src = avatar;
  }
}
