import Api from "./Api.js";

export default class UserInfo {
  constructor(nameEl, aboutEl) {
    this.name = nameEl;
    this.about = aboutEl;
  }

  getUserInfo() {
    const userInfoApiGet = new Api({
      url: "https://around-api.en.tripleten-services.com/v1/users/me",
      headers: {
        authorization: "1dcec495-7d71-4d31-8e01-7428d02e5e7d",
        "Content-Type": "application/json",
      },
    });
    userInfoApiGet.getUserInfoApi().then(({ name, about }) => {
      this.name.textContent = name;
      this.about.textContent = about;
    });
  }

  setUserInfo({ name, desc }) {
    const userInfoApiSet = new Api({
      url: "https://around-api.en.tripleten-services.com/v1/users/me",
      method: "PATCH",
      headers: {
        authorization: "1dcec495-7d71-4d31-8e01-7428d02e5e7d",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: desc,
      }),
    });
    userInfoApiSet.setUserInfoApi();
    this.name.textContent = name;
    this.about.textContent = desc;
  }
}
