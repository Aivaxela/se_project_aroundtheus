export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return this._request(`cards`, {}).then((res) => this._checkResponse(res));
  }

  getUserInfo() {
    return this._request(`users/me`, {}).then((res) => this._checkResponse(res));
  }

  setUserInfo({ name, desc }) {
    return this._request(`users/me`, {
      method: "PATCH",
      body: JSON.stringify({ name: name, about: desc }),
    }).then((res) => this._checkResponse(res));
  }

  setUserAvatar(link) {
    return this._request(`users/me/avatar`, {
      method: "PATCH",
      body: JSON.stringify({ avatar: link }),
    }).then((res) => this._checkResponse(res));
  }

  uploadCard({ Title, Link }) {
    return this._request(`cards`, {
      method: "POST",
      body: JSON.stringify({
        name: Title,
        link: Link,
      }),
    }).then((res) => this._checkResponse(res));
  }

  deleteCard(id) {
    return this._request(`cards/${id}`, {
      method: "DELETE",
    }).then((res) => this._checkResponse(res));
  }

  updateCardLike(id, method) {
    return this._request(`cards/${id}/likes`, {
      method: method,
    }).then((res) => this._checkResponse(res));
  }

  _request(endpoint, { method, body }) {
    return fetch(`${this._baseUrl}${endpoint}`, {
      headers: this._headers,
      method: method,
      body: body,
    });
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }
}
