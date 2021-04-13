var express = require("express")
var app = express()
var cors = require("cors")

const mysql = require("mysql")
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(cors())
app.options("*", cors()) // include before other routes

app.use(express.json())

const pool = mysql.createPool({
  host: "sql328.main-hosting.eu",
  user: "u769955481_mybalance",
  password: "mybalance@123",
  database: "u769955481_mybalance",
  connectionLimit: 10
})

app.get("/records", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err
    console.log("connected as id " + connection.threadId)
    connection.query("SELECT * FROM skonlinedb", (err, rows) => {
      connection.release() // return the connection to pool
      if (err) throw err
      res.send(rows)
    })
  })
})
app.get("/latest", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err
    console.log("connected as id " + connection.threadId)
    connection.query("SELECT * FROM skonlinedb ORDER BY id DESC LIMIT 1", (err, rows) => {
      connection.release() // return the connection to pool
      if (err) throw err
      res.send(rows)
    })
  })
})
//Post a record or insert a record
app.post("/addrecord", (req, res) => {
  var reqData = []
  reqData.push(req.body.cash)
  reqData.push(req.body.jio)
  reqData.push(req.body.bank)
  reqData.push(req.body.credit)
  reqData.push(req.body.total)
  reqData.push(req.body.profit)
  reqData.push(req.body.timestamp)
  pool.getConnection((err, connection) => {
    if (err) throw err
    console.log("connected as id " + connection.threadId)
    var sql = "INSERT INTO skonlinedb (cash,jio,bank,credit,total,profit,timestamp) VALUES (?,?,?,?,?,?,?)"
    connection.query(sql, reqData, (err, rows) => {
      connection.release() // return the connection to pool
      if (err) throw err
      res.send(rows)
    })
  })
})
const port = process.env.PORT || 4000
app.listen(port)
