const { MongoClient } = require('mongodb');

const uri = `mongodb+srv://bot:${process.env.DB_PASSWORD}@cluster0.1ipw1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

async function connectDb(collec) {
    const connection = await client.connect();
    const collection = connection.db("SpaceBot").collection(collec);  // Connect to MongoDb Atlas and retrieve a collection;
    return collection;
}

module.exports = { connectDb, client };