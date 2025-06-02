const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
var cors = require('cors')

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json());

const uri = "mongodb+srv://StudentResultManagement:tQztwC7VG3o3ImIt@analytics-dev.sfhjnki.mongodb.net/?retryWrites=true&w=majority&appName=analytics-dev";

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
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const myCollection = client.db('student-db').collection('result');

        //database e send krtese khn create user krtese
        app.post('/', async (req, res) => {
            const newStudent = req.body;
            const result = await myCollection.insertOne(newStudent);
            res.send(result);
        })

        //server e send krtese db theke
        app.get('/students', async (req, res) => {
            const finddata = myCollection.find();
            const result = await finddata.toArray();
            res.send(result);
        })

        //update field e data get krtese
        app.get('/students/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await myCollection.findOne(query);
            res.send(result);
        })

        //update krtese
        app.put('/students/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updateStudent = req.body;
            const student = {
                $set: {
                    id: updateStudent.id,
                    name: updateStudent.name,
                    class: updateStudent.cls,
                    result: updateStudent.result,
                },
            };
            const result = await myCollection.updateOne(filter, student, options);
            res.send(result);
        })

        app.delete('/students/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await myCollection.deleteOne(query);
            res.send(result);
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        //await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Mongo Connected.')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})