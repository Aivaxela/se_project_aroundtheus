export default class Api {
  constructor(options) {
    this._link = options.link;
    this._headers = options.headers;

    console.log(this._headers);

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

  getUserInfo() {
    fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      headers: {
        authorization: "1dcec495-7d71-4d31-8e01-7428d02e5e7d",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        this._userInfo = result;
      });
  }
}

// const api = new Api({
//   baseUrl: "https://around-api.en.tripleten-services.com/v1",
//   headers: {
//     authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
//     "Content-Type": "application/json",
//   },
// });

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
