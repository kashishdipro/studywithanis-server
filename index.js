const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

//Middle wares
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kdtr5cm.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, { 
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function run() {
  try {
    const playlistCollection = client.db('studyWithAnis').collection('playlist');
    
    // Client Get Playlist Api
    app.get('/playlist', async(req, res) =>{
        const query = {};
        const cursor = playlistCollection.find(query);
        const playlist = await cursor.toArray();
        res.send(playlist);
    })
  } finally {
  }
}
run().catch(err => console.error(err));

app.get('/', (req, res) =>{
    res.send('Study with Anis is running')
})

app.listen(port, () =>{
    console.log(`Study with Anis server running on ${port}`);
})