import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { User } from "./entity/User";
import connectRedis from "connect-redis";
import session from "express-session";
import cors from "cors";
import path from "path";
import redis from "redis";
import express from "express";
import { __prod__ } from "./constants";
import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user";

const main = async () => {

  //dropSchema: true,

  await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "password",
    database: "test",
    migrations: [path.join(__dirname, "./migration/*")],
    entities: [User],
    synchronize: true,
    logging: false,
  })
    .then(() => {
      console.log("Database connected...");
    })
    .catch((error) => console.log(error));

  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

  app.use(
    session({
      name: "qid",
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
        disableTTL: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__,
      },
      saveUninitialized: false,
      secret: "supersecret",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res, redis }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log("Listening on port 4000...");
  });
};

main().catch((error) => console.log(error));
