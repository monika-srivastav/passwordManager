const express = require('express')
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv')
const cors = require("cors")
const bodyparser = require("body-parser")
dotenv.config()
// console.log(process.env.MONGO_URI) // remove this after you've confirmed it is working
// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);


// Database Name
const dbName = 'passOp';

const app = express()
const port = 3000
app.use(bodyparser.json())
app.use(cors())
 client.connect();
 
 ////GET ALL THE PASSWORD
 app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

////SAVE A PASSWORD
 app.post('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(password);
  res.send({success:true,result:findResult})
})

////DELETE A PASSWORD
 app.delete('/', async (req, res) => {
  const password = req.body

  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne(password);
  res.send({success:true,result:findResult})
})

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})