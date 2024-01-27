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
    // Playlist Collection
    const playlistCollection = client.db('studyWithAnis').collection('playlist');
    // Playlist Collection
    const messageCollection = client.db('studyWithAnis').collection('messages');
    // Subscriber Collection
    const subscriberCollection = client.db('studyWithAnis').collection('subscribers');
    
    // Client Get Playlist Api
    app.get('/playlist', async(req, res) =>{
        const query = {};
        const playlist = await playlistCollection.find(query).toArray();
        res.send(playlist);
    })

    // Client Post Subscriber Api
    app.post('/subscribers', async(req, res) =>{
        const subscriber = req.body;
        const query = {
            email: subscriber.email
        }
        const alreadySubscriber = await subscriberCollection.find(query).toArray();
        if (alreadySubscriber.length) {
            const message = `You are already as a subscriber ${subscriber.email}`;
            return res.send({acknowledged: false, message});
        } 
        const result = await subscriberCollection.insertOne(subscriber);
        res.send(result);
    })

    // Client Post Messages Api
    app.post('/messages', async(req, res) =>{
        const message = req.body;
        const result = await messageCollection.insertOne(message);
        res.send(result);
    })
    
    // Client Get Messages Api
    app.get('/messages', async(req, res) =>{
        let query = {};
        const result = await messageCollection.find(query).toArray();
        res.send(result);
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