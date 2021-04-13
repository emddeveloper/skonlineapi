var express = require("express")
var app = express()
var cors = require("cors")

const mysql = require("mysql")
const bodyParser = require("body-parser")

app.use(cors())

const connection = mysql.createConnection({
  host: "sql328.main-hosting.eu",
  user: "u769955481_mybalance",
  password: "mybalance@123",
  database: "u769955481_mybalance"
})
connection.connect(function (error) {
  if (!!error) console.log(error)
  else console.log("Database Connected!")
})
app.get("/records/:id", function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for all origins!" + req })
})

//Creating GET Router to fetch all the learner details from the MySQL Database
app.get("/", (req, res) => {
  connection.query("SELECT * FROM skonlinedb", (err, rows, fields) => {
    if (!err) res.send(rows)
    else console.log(err)
  })
})
app.get("/latetrecords", (req, res) => {
  connection.query("SELECT * FROM skonlinedb ORDER BY id DESC LIMIT 1", (err, rows, fields) => {
    if (!err) res.send(rows)
    else console.log(err)
  })
})
app.get("/records", function (req, res) {
  res.send([{ id: "1", timestamp: 1618228109367, cash: 5000, jio: 5000, bank: 5000, credit: "", profit: 78, total: 35 }])
})

const port = process.env.PORT || 4000
app.listen(port)
