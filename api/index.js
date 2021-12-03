const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const PostGresDataSource = require("./datasources/postgres");
const cors = require("cors");

let knexConfig;
let postGresDataSource;

knexConfig = {
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "password",
    database: "trackerdb",
  },
};

postGresDataSource = new PostGresDataSource(knexConfig);

const typeDefs = gql`
  scalar Date

  type Query {
    metrics(weight: String, entry_date: Date, user_id: Int): [Metric]
  }

  type Mutation {
    createMetric(
      weight: String!
      entry_date: String!
      user_id: Int!
    ): MetricEntry
  }

  type Metric {
    weight: String!
    entry_date: Date
    user_id: Int
  }

  type MetricEntry {
    id: Int
  }
`;

const resolvers = {
  Query: {
    metrics: async (source, args, context) => {
      let metrics;
      if (args.weight) {
        try {
          metrics =
            await context.dataSources.postGresDataSource.getMetricsByWeight(
              args
            );
          return metrics;
        } catch (e) {
          console.log(e.message);
        }
      }
      if (args.user_id) {
        try {
          metrics = await context.dataSources.postGresDataSource.getMetricsByID(
            args
          );
          return metrics;
        } catch (e) {
          console.log(e.message);
        }
      } else {
        try {
          metrics =
            await context.dataSources.postGresDataSource.getAllMetrics();
          return metrics;
        } catch (e) {
          console.log(e.message);
        }
      }
    },
  },
  Mutation: {
    createMetric: async (source, args, context) => {
      try {
        const metricData =
          await context.dataSources.postGresDataSource.createMetricEntry({
            weight: args.weight,
            entry_date: args.entry_date,
            user_id: args.user_id,
          });
        return metricData;
      } catch (e) {
        console.log(e.message);
      }
    },
  },
};

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

app.get("/", function test(req, res) {
  res.send(
    "Please go to http://localhost:4000/graphql to see the graphql server"
  );
});

app.use(cors({ credentials: true, origin: "*" }));

server.start().then((res) => {
  server.applyMiddleware({ app, cors: false });
  app.listen({ port }, () =>
    console.log(`server listening on port ${port}` + server.graphqlPath)
  );
});
