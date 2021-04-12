const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');

const uri =
  "mongodb+srv://rian:01939773554op5t@cluster0.67gey.mongodb.net/doctor?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const port = 5000;

client.connect((err) => {
  const appointmentCollection = client.db("doctor").collection("bookings");
  app.post('/addAppointment',(req, res) => {
      const appointment=req.body;
      console.log(appointment);
      appointmentCollection.insertOne(appointment)
      .then(result => {
          res.send(result.insertedCount > 0)
      })
  })
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port || process.env.PORT);
