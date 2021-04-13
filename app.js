var express = require("express")
var app = express()
var cors = require("cors")

app.use(cors())

app.get("/records/:id", function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for all origins!" + req })
})

app.get("/", function (req, res) {
  res.send("Hello world!")
})
app.get("/records", function (req, res) {
  res.send([{ id: "1", timestamp: 1618228109367, cash: 5000, jio: 5000, bank: 5000, credit: "", profit: 78, total: 35 }])
})
const port = process.env.PORT || 4000
app.listen(port)
