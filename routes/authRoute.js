'use strict';
import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('An error occurred.');
        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const token = jwt.sign(user, 'SECRET');

        return res.json({ token, user });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

export { router as authRoute };
