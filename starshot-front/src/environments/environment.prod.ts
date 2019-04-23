export const environment = {
  production: true,
  url: function (url) {
    return `http://localhost:3333/${url}`
  }
};