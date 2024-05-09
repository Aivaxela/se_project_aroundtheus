import Api from "./Api.js";

export default class UserInfo {
  constructor(nameEl, aboutEl, headers, userApiEndpoint) {
    this.name = nameEl;
    this.about = aboutEl;
    this._headers = headers;
    this._endpoint = userApiEndpoint;
  }

  getUserInfo() {
    const userInfoApiGet = new Api({
      url: this._endpoint,
      headers: this._headers,
    });
    userInfoApiGet.retrieveData().then(({ name, about }) => {
      this.name.textContent = name;
      this.about.textContent = about;
    });
  }

  setUserInfo({ name, desc }) {
    const userInfoApiSet = new Api({
      url: this._endpoint,
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: desc,
      }),
    });
    userInfoApiSet.sendData();
    this.name.textContent = name;
    this.about.textContent = desc;
  }
}
