const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { url } = require("inspector");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.firname;
  const lastName = req.body.lasname;
  const emaill = req.body.email;

  const data = {
    members: [
      {
        email_address: emaill,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us6.api.mailchimp.com/3.0/lists/a111e3dba2";
  const options = {
    method: "POST",
    auth: "dhanush1:defd4268a91119e5fb5786bc70f6030b-us6",
  };
  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});
app.listen(process.env.PORT || 3000, function () {
  console.log("server is on");
});

// apikey: defd4268a91119e5fb5786bc70f6030b-us6
// listid:  a111e3dba2
