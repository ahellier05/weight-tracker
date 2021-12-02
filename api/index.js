const express = require('express');
import { ApolloServer, gql } from 'apollo-server-express';



const typeDefs = `
    scalar Date;
    
    type Query {
        metrics(weight:String,
                entry_date:Date,
                user_id:Int
                ) : [Metric]
        
    type Metric {
        weight:String!
        entry_date:Date,
        user_id:Int
    }

    type MetricEntry {
        id: Int
    }

}`

const app = express();
const port = 4000;

app.get('/', function test(req, res) {
    res.send('Hello World');
});

app.listen({ port }, () => 
    console.log(`server listening on port ${ port }`)
 );

