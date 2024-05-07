export default class Api {
  constructor({ url, method, headers, body }) {
    this._url = url;
    this._method = method;
    this._headers = headers;
    this._body = body;

    // this.getUserInfo();
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1", {
      headers: {
        authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getUserInfoApi() {
    return fetch(this._url, { headers: this._headers }).then((res) => res.json());
  }

  setUserInfoApi() {
    fetch(this._url, { method: this._method, headers: this._headers, body: this._body });
  }
}

// fetch("https://around-api.en.tripleten-services.com/v1/cards", {
//   headers: {
//     authorization: "1dcec495-7d71-4d31-8e01-7428d02e5e7d",
//   },
// })
//   .then((res) => res.json())
//   .then((result) => {
//     console.log(result);
//   });

authorization: "1dcec495-7d71-4d31-8e01-7428d02e5e7d";
