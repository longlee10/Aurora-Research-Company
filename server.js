/*******************************
File Name: server.js
Description: Create an expressjs server to get the Angular's index.html file.
Web app name: Aurora Research Company
Team name: A-Star
Team Members:
  Kuo, Yi-Cheng (301181514)
  Yeung, Lok Ki (301252535)
  Lam, Hing Yu (301257216)
  Chung, Ting Hin (301287013)
  Le, Hoang Long (301236235)
********************************/

const express = require("express");
const app = express();
const distPath = __dirname + "/dist/frontend";

app.use(express.static(distPath));

app.get("/*", (req, res) => {
    res.sendFile(distPath + "/index.html");
})

app.listen(process.env.PORT || 3100);