const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.port || 10000;

const app = express()

app.use(cors());
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hztcgza.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
 try {
  const collection = client.db('telegramBot').collection("botCollections")

  app.get("/botCollectionsData", async (req, res) => {
   const query = {};
   const data = await collection.find(query).toArray();
   res.send(data);
  })
 }
 finally {

 }
}
run().catch(console.log)


app.get("/", (req, res) => {
 res.send('Hello from Telegram Bot')
});

app.listen(port, () => {
 console.log(`server running on port: ${port}`);
})