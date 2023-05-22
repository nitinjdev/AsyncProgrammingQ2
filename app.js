var express = require("express");

var app = express();

var portNo = 5401;

var request = require("request");
var empUrl = `http://5c055de56b84ee00137d25a0.mockapi.io/api/v1/employees`;
app.set("view engine", "ejs");

function getEmployee(url) {
  var options = {
    url: empUrl,
    headers: {
      "User-Agent": "request",
    },
  };

  return new Promise(function (resolve, reject) {
    request.get(options, function (err, resp, body) {
      if (err) {
        reject(err);
      } else {
        resolve(body);
      }
    });
  });
}

app.get("/employeesData", (req, res) => {
  var dataFromAPI = getEmployee();
  console.log("OUTPUT", dataFromAPI);
  dataFromAPI.then(JSON.parse).then(function (result) {
    console.log("OUTPUT result", result);
    res.render("main", { result, title: "Employee details" });

    //res.send(result);
  });
});

app.listen(portNo, function (err) {
  if (err) {
    console.log("failed on server startup");
  } else {
    console.log("Server running on :", portNo);
  }
});
