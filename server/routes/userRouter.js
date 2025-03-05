//   <<Imports>>
import express from 'express';
import { userController } from '../controllers/userController.js';

// Create a new router
const userRouter = express.Router();

// User Login
userRouter.post(
  '/login',
  userController.loginUser,
  userController.setCookie,
  (req, res) => {
    console.log('🐣 User Login Processed.');
    return res.status(200).json(res.locals.user);
  }
);

// User Registration
userRouter.post(
  '/register',
  userController.register,
  userController.setCookie,
  (req, res) => {
    console.log('REGISTER ROUTER REACHED');
    console.log('RESLOCALS.USER for REGISTER: ', res.locals.user);
    return res.status(200).json(res.locals.user);
  }
);

// Client Dashboard
userRouter.get(
  '/dashboard',
  userController.isLoggedIn,
  userController.getDash,
  (req, res) => {
    return res.status(200).json(res.locals.dashboard);
  }
);

userRouter.get('/logout', (req, res) => {
  res.cookie('logout phone', '');
  res.cookie('logout username', '');
  console.log('logout res object: ', res._headers['set-cookie']);
  res.status(200).send('logged out!');
});

export { userRouter };
