// export or require
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

// create app
const app = express();

// create port
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// connection with mongodb server
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8grpiox.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const toysCollection = client.db("toyGalaxyDB").collection("alltoys");
    // Load All Toys Data
    app.get("/alltoys", async (req, res) => {
      const result = await toysCollection.find().toArray();
      res.send(result);
    });

    // Insert a document
    app.post("/alltoys", async (req, res) => {
      const toyData = req.body;
      console.log("ToyData", toyData);
      const result = await toysCollection.insertOne(toyData);
      res.send(result);
    });

    // Load Specific Toys data
    app.get("/alltoys/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await toysCollection.findOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// get app
app.get("/", (req, res) => {
  res.send("Toy-Galaxy Server is Running");
});

// listen to the Port
app.listen(port, () => {
  console.log(`Toy-Galaxy Server running on port: ${port}`);
});
