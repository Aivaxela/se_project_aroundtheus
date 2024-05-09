export default class Api {
  constructor({ url, method, headers, body }) {
    this._url = url;
    this._method = method || "GET";
    this._headers = headers;
    this._body = body;
  }

  handleFetch() {
    return fetch(this._url, {
      method: this._method,
      headers: this._headers,
      body: this._body,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
