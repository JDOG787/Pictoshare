import "dotenv/config";
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './graphql/type-defs';
import resolvers from './graphql/resolvers';
import * as express from 'express';
import * as config from './mongodb/config';
import { isAuth } from './middleware/isAuth';
import * as session from 'express-session';
import * as cors from 'cors';


async function main() {
  const app = express();
  const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: ({ req, res }) => ({ req, res })
  });
  await config.connect()
  
  app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
  }))
  app.use(
    session({
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7
      }
    })
  )
  app.use(isAuth)
  server.applyMiddleware({ app, cors: false });
  
  
  app.listen({ port: 8080 }, () =>
    console.log(`🚀 Server ready at http://localhost:8080${server.graphqlPath}`)
  )
}

main()