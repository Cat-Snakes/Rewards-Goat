// Import the users object
// import db from "../models/models.js"
import { pool } from '../models/models.js';
import { supabase } from '../server.js';

const userController = {};

// TODO NOTE FOR RACHEL: REMEMBER THE REQ.HEADERS THING (put in handleClick header "loggedUser": "username" and you can have access to it and pass it as a param to the backend)

// This middleware will be used to login the user (could be customer or business)
userController.loginUser = (req, res, next) => {
  console.log('Customer login middleware reached');
  const data = [req.body.phone, req.body.password];
  console.log('customer login data: ', data);
  // res.locals.currentUser = req.body;
  const existingCust =
    'SELECT name, user_type FROM accounts WHERE phone=$1 AND password=$2';
  // automatically assumes the login wll not work
  res.locals.loginSuccessful = false;
  try {
    //logic for customer login attempts

    // check if phone # exists first
    pool.query(existingCust, data, (error, results) => {
      console.log('results', results.rows);
      res.locals.currentUser = {
        username: results.rows[0].name,
        phone: req.body.phone,
      };
      // ^ this prints [ { name: 'rachel' } ]

      if (results.rowCount === 1) {
        // user is now logged in
        res.locals.loginSuccessful = true;
        // user's name is saved (for the "welcome, [user] message")
        res.locals.user = {
          username: results.rows[0].name,
          usertype: results.rows[0].user_type.toLowerCase(),
        };
        return next();
      } else if (results.rowCount === 0) {
        return next({
          log: 'log: No user found',
          message: 'Message: No user found',
        });
      }
    });
    // res.redirect(`http://localhost:5173/business`)
    // check whether they're a business or customer (userType column in the database)
    // check if the password matches the phone # given
  } catch (err) {
    // error handling
    return next({
      log: 'log: Error getting users',
      message: 'Message: Error getting users',
    });
  }
};

userController.register = async (req, res, next) => {
  console.log('FULL REQ BODY: ', req.body);

  const { username, phone, password, user_type } = req.body;
  console.log('REQBODYUSER_TYPE: ', req.body.user_type);

  res.locals.currentUser = req.body;
  console.log('currentUser: ', res.locals.currentUser);

  try {
    // logic for registration attempts
    // check if the phone # already exists
    console.log('TRY BLOCK ENTERED ALKDJFALSKDJF');
    const text = `SELECT EXISTS (SELECT 1 FROM accounts WHERE phone = $1) AS exists;`;
    // return { "exists": true } if exists
    const result = await pool.query(text, [phone]);
    console.log('RES HERE: ', result);
    if (result.rows[0].exists) {
      return next({
        log: 'Phone number exists in database.',
        status: 400,
        message: { err: 'The phone number is already registered.' },
      });
    }
    const text1 = `INSERT INTO accounts (name, phone, password, user_type) VALUES ($1, $2, $3, $4)`;
    try {
      const results1 = await pool.query(text1, [
        username,
        phone,
        password,
        user_type,
      ]);
      if (!results1 || results1.rowCount === 0) {
        return next({
          log: 'Insert failed.',
          status: 500,
          message: { err: 'User registration failed.' },
        });
      }
    } catch (err) {
      console.error('Query Error:', err);
      return next({
        log: 'Database insert error.',
        status: 500,
        message: { err: 'Error inserting user into database.' },
      });
    }

    res.locals.user = { username, user_type };
    console.log('res.locals.user: ', res.locals.user);
    // res.status(201).json({ message: 'Registration successful!' });
    return next();
    // if it does, return an error
    // if it doesn't, log them in and add a new row in business_name Table
  } catch (err) {
    return next({
      log: `Internal server error during registering: ${err}`,
      status: 500,
      message: { err: 'Error in Register.' },
    });
  }
  // after registration should redirect to dashboard
};

// THIS IS THE ONLY MIDDLEWARE THAT IS *ONLY* FOR CUSTOMERS
userController.getDash = (req, res, next) => {
  try {
    //logic for customer dashboard getting(?)
    const data = [req.cookies.phone];
    console.log('getDash data: ', data);
    console.log('req.body:', req.body);
    const custDash = `SELECT * FROM (SELECT b.business_name, b.num_of_visits, b.phone, b.customer_name 
        FROM business_info b 
           RIGHT JOIN accounts a ON b.phone = a.phone) AS U WHERE U.phone = $1;`;

    pool.query(custDash, data, (error, results) => {
      res.locals.dashboard = results;
      // res.locals.dashboard = results.rows;
      console.log(res.locals.dashboard);
      return next();
    });

    // get names of all the businesses they're a rewards member at, the number of times they've visited each business, and the customer's name
    // display it (aka feed it to the front end):D
  } catch (err) {
    // error handling
    return next({
      log: 'log: Error getting customer dashboard',
      message: 'Message: Error getting customer dashboard',
    });
  }
};

userController.isLoggedIn = (req, res, next) => {
  const { phone, username } = req.cookies;
  console.log('phone, ', phone);
  console.log('username, ', username);

  //SQL query to make sure that the ID and username match an ID and username in the database
  const text = 'SELECT * FROM accounts WHERE phone=$1 AND name=$2';
  const values = [phone, username];
  pool.query(text, values).then((response) => {
    if (response) return next();
    else {
      res.redirect('/');
    }
  });
};

userController.setCookie = (req, res, next) => {
  try {
    const currentUser = res.locals.currentUser;
    console.log('setCookie currentUser: ', currentUser);
    //
    if (!currentUser || !currentUser.phone || !currentUser.username) {
      return next({
        log: 'Error: Missing user data in setCookie',
        status: 500,
        message: { err: 'User data missing for setting cookies.' },
      });
    }
    //
    res.cookie('phone', currentUser.phone);
    res.cookie('username', currentUser.username);
    // console.log('res.locals.user: ', res.locals.user);
    console.log('cookies set for ', currentUser);
    // console.log('res object: ', res._headers['set-cookie']);
    return next();
  } catch (err) {
    return next(err);
  }
};

export { userController };
