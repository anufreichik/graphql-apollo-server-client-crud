import express from 'express';
import {ApolloServer, gql} from "apollo-server-express";
import typeDefs from "./typeDefs.js";
import resolvers from "./resolvers.js";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv'
async function initServer() {
    const app = express();
    app.use(cors());
    dotenv.config();
    const apolloServer = new ApolloServer({typeDefs, resolvers});

    await apolloServer.start();
    apolloServer.applyMiddleware({app});
    app.use((req, res) => {
        res.send('Server Start successfully');
    })
    const PORT = process.env.PORT || 5000;
    try{
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            autoIndex: false,
        });
        console.log('mongo db connected')
    }
    catch (err){
        console.log(err)
    }



    app.listen(PORT, () => console.log(`Express server is running on port ${PORT}`))
}

initServer();
