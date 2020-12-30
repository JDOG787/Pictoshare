import { ApolloServer } from 'apollo-server-express';
import typeDefs from './graphql/type-defs';
import resolvers from './graphql/resolvers';
import * as express from 'express';
import * as expressJwt from 'express-jwt';
import * as config from './mongodb/config';
import * as dotenv from 'dotenv';

dotenv.config();
console.log(process.env.JWT_SECRET)
const app = express();
const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  context: ({ req }) => {
    const user = req.user || undefined;
    return { user };
  }
});
app.use(
  expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    credentialsRequired: false
  })
);
server.applyMiddleware({ app });


async function main() {
  await config.connect()
  
  
  
  app.listen({ port: 8080 }, () =>
    console.log(`🚀 Server ready at http://localhost:8080${server.graphqlPath}`)
  )
}

main()