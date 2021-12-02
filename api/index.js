const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const PostGresDataSource = require('./datasources/postgres');

let knexConfig;
let postGresDataSource;


knexConfig = {
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: 5432,
        user: 'postgres',
        password: 'password',
        database: 'trackerdb'
    },
};


postGresDataSource = new PostGresDataSource(knexConfig);

const typeDefs = gql`
    scalar Date
    
    type Query {
        metrics(weight:String,
                entry_date:Date,
                user_id:Int
                ) : [Metric]
        
    }

    type Metric {
        weight:String!
        entry_date:Date,
        user_id:Int
    }

    type MetricEntry {
        id: Int
    }

`;

const resolvers = {
    Query: {
        metrics: async (source, args, context) => {
            let metrics;
            if(args.weight) {
                console.log("into weight");
                try {
                    metrics = await context.dataSources.postGresDataSource.getMetricsByWeight(
                        args
                    );
                    return metrics;
                } catch(e) {
                    console.log(e.message);
                }
            }
            if (args.user_id) {
                console.log("into user_id");
                try {
                    metrics = await context.dataSources.postGresDataSource.getMetricsByID(
                        args
                    );
                    return metrics;
                } catch(e) {
                    console.log(e.message);                }
            } else {
                console.log("into no params");
                try {
                    metrics = await context.dataSources.postGresDataSource.getAllMetrics();
                    return metrics;

                } catch(e) {
                    console.log(e.message);
                }
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
        return {
            postGresDataSource,
        };

    },
});

const app = express();
const port = 4000;

app.get('/', function test(req, res) {
    res.send('Hello World');
});

server.start().then(res => {
    server.applyMiddleware({ app });
    app.listen({ port }, () => 
console.log(`server listening on port ${ port }` + server.graphqlPath)
);

})


