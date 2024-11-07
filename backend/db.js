const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/cloudbook'

const connectToMongo = async () =>
{
    try{
        await mongoose.connect(mongoURI,);
        console.log("Connected to mongoose successfully.");
    }
    catch(error)
    {
        console.log("Failed to connect to mongoose.");
    }
}

module.exports = connectToMongo;