'use strict';
import passport from 'passport';
import localStrategy from 'passport-local';
const Strategy = localStrategy.Strategy;
import User from '../models/user.js';
import passportJWT from 'passport-jwt';
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
import bcrypt from 'bcrypt';

passport.use(
  new Strategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        console.log('Local strategy', user); 
        if (user === undefined) {
          return done(null, false, { message: 'Incorrect username' });
        }
        if (!(await bcrypt.compare(password, user.password))) {
          return done(null, false, { message: 'Incorrect cretendials' });
        }
        return done(null, user.toJSON(), { message: 'Login Successful' }); 
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'SECRET',
    },
    async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload._id);
        if (user == null) {
          return done(null, false, { message: 'User not found' });
        }

        return done(null, user, { message: 'Login Successful' });
      } catch (err) {
        return done(err);
      }
    }
  )
);

export default passport;
