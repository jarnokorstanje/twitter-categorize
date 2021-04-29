import { ApolloServer } from 'apollo-server-express';
import schemas from './schemas/index.js';
import resolvers from './resolvers/index.js';
import express from 'express';
import dotenv from 'dotenv';
import db from './database/db.js';
import { authRoute } from './routes/authRoute.js';
import { userRoute } from './routes/userRoute.js';
import passport from './helpers/pass.js';
import helmet from 'helmet';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
   helmet({
      ieNoOpen: false,
      contentSecurityPolicy: false,
   })
);

app.use('/login', authRoute);
app.use('/register', userRoute);

const checkAuth = (req, res) => {
   try {
      return new Promise((resolve, reject) => {
         passport.authenticate(
            'jwt',
            {
               session: false,
            },
            (err, user, info) => {
               if (!user) {
                  resolve(false);
               }
               resolve(user);
            }
         )(req, res);
      });
   } catch (err) {
      throw err;
   }
};


(async () => {
   try {
      const conn = await db();
      if (conn) {
         console.log('Connected successfully.');
      }

      const server = new ApolloServer({
         typeDefs: schemas,
         resolvers,
         context: async ({ req, res }) => {
            if (req) {
               const user = await checkAuth(req, res);
               return {
                  req,
                  res,
                  user,
               };
            }
         },
      });

      server.applyMiddleware({ app });

      process.env.NODE_ENV = process.env.NODE_ENV || 'development';
      if (process.env.NODE_ENV === 'production') {
         console.log('launch on production');
         const { default: production } = await import('./security/production.js');
         production(app, 3000);
      } else {
         console.log('launch on local');
         const { default: localhost } = await import('./security/localhost.js');
         localhost(app, 8000, 3000);
      }

      // app.listen({ port: 3000 }, () =>
      //    console.log(
      //       `🚀 Server ready at http://localhost:3000${server.graphqlPath}`
      //    )
      // );
   } catch (e) {
      console.log('server error: ' + e.message);
   }
})();