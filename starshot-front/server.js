require('dotenv').config()
const express = require('express');
const path = require('path');
const app = express();
app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, 'dist/starshot-front')));
// need to declare a "catch all" route on your express server 
// that captures all page requests and directs them to the client
// the react-router do the route part
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/starshot-front', 'index.html'));
});

const port = process.env.PORT || 5000

app.listen(
  port,
  function () {
    console.log(`Frontend start on http://localhost:${port}`)
  }
)