import Api from "./Api.js";

export default class UserInfo {
  constructor(name, about) {
    this._name = name;
    this._about = about;
  }

  updateUserInfoFromApi() {
    const userInfoEndpoint = new Api({
      link: "https://around-api.en.tripleten-services.com/v1/users/me",
      headers: {
        authorization: "1dcec495-7d71-4d31-8e01-7428d02e5e7d",
        "Content-Type": "application/json",
      },
    });
    userInfoEndpoint.getUserInfo().then(({ name, about }) => {
      this._name.textContent = name;
      this._about.textContent = about;
    });
  }

  setUserInfo({ Desc, Name }) {
    this._name.textContent = Name;
    this._about.textContent = Desc;
  }
}
