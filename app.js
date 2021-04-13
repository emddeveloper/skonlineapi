var express = require("express")
var app = express()
var cors = require("cors")

const mysql = require("mysql")
const bodyParser = require("body-parser")

app.use(cors())
app.options("*", cors()) // include before other routes

const pool = mysql.createPool({
  host: "sql328.main-hosting.eu",
  user: "u769955481_mybalance",
  password: "mybalance@123",
  database: "u769955481_mybalance"
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

const port = process.env.PORT || 4000
app.listen(port)
