import "dotenv/config";
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './graphql/type-defs';
import resolvers from './graphql/resolvers';
import * as express from 'express';
import * as config from './mongodb/config';
import { isAuth } from './middleware/isAuth';
import * as cookieParser from 'cookie-parser';
import { verify } from 'jsonwebtoken'
import User from "./mongodb/models/User";
import { createAccessToken, createRefreshToken } from "./auth";
import { sendRefreshToken } from "./sendRefreshToken";


async function main() {
  const app = express();
  const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: ({ req, res }) => ({ req, res })
  });
  await config.connect()
  
  app.use(cookieParser())
  app.use(isAuth)
  server.applyMiddleware({ app });
  app.post("/refresh_token", async (req, res) => {
    const token: string = req.cookies.jid;

    if (!token) {
      return res.send({ ok: false, accessToken: "" });
    }

    let payload: any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: "" });
    }

    const user = await User.findById(payload.userId );

    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: "" });
    }

    sendRefreshToken(res, createRefreshToken(user))

    return res.send({ ok: true, accessToken: createAccessToken(user) })
  });
  
  
  app.listen({ port: 8080 }, () =>
    console.log(`🚀 Server ready at http://localhost:8080${server.graphqlPath}`)
  )
}

main()