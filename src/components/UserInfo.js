import Api from "./Api.js";

export default class UserInfo {
  constructor({ name, about, avatar, apiHeaders, apiUser }) {
    this.name = name;
    this.about = about;
    this.avatar = avatar;
    this._headers = apiHeaders;
    this._endpoint = apiUser;
  }

  getUserInfo() {
    const userInfoApiGet = new Api({
      url: this._endpoint,
      headers: this._headers,
    });
    userInfoApiGet.handleFetch().then(({ name, about, avatar }) => {
      this.name.textContent = name;
      this.about.textContent = about;
      this.avatar.src = avatar;
    });
  }

  setUserInfo({ name, desc }, popup) {
    const userInfoApiSet = new Api({
      url: this._endpoint,
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: desc,
      }),
    });
    userInfoApiSet.handleFetch().then(() => popup.closeAfterSubmit());
    this.name.textContent = name;
    this.about.textContent = desc;
  }
}
