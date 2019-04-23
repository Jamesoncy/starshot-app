export const environment = {
  production: true,
  url: function (url) {
    return `http://ec2-3-82-223-237.compute-1.amazonaws.com:3333/${url}`
  }
};