import Api from "./Api.js";

export default class UserInfo {
  constructor(nameEl, aboutEl, userAuth, userApiEndpoint) {
    this.name = nameEl;
    this.about = aboutEl;
    this._auth = userAuth;
    this._endpoint = userApiEndpoint;
  }

  getUserInfo() {
    const userInfoApiGet = new Api({
      url: this._endpoint,
      headers: {
        authorization: this._auth,
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
      url: this._endpoint,
      method: "PATCH",
      headers: {
        authorization: this._auth,
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
