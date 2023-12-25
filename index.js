const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

//Middle wares
app.use(cors());
app.use(express.json());

app.get('/', (req, res) =>{
    res.send('Study with Anis is running')
})

app.listen(port, () =>{
    console.log(`Study with Anis server running on ${port}`);
})