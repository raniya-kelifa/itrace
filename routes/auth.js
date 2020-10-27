var express = require('express');
var authController = require('../controllers/auth');
var router = express.Router();
var localStrategy = require('passport-local').Strategy;
var passport=require('passport');

var router = express.Router();
/**
 * @swagger
 *
 * /login:
 *   post:
 *     description: Login to the itrace
 *     parameters:
 *       - name: username
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */
router.post('/login',
   authController.loginAction

);
/**
 * @swagger
 *
 * /signup:
 *   post:
 *     description: register to itrace
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         description: User's email address.
 *         in: formData
 *         required: true
 *         type: string
 *      - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *      - name: confirm password
 *         description: re-enter user's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: registerd
 */
router.post( '/signup', authController.signupAction)
/**
 * @swagger
 *
 * /resetpassword:
 *   post:
 *     description: send email address if it is found in DB password reset link will be sent
 *     parameters:
 *       - name: email
 *         description: email address fot he password link to be seny
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: email will be sent
 */
router.post('/resetpassword', authController.forgetPasswordAction);
/**
 * @swagger
 *
 * /reseetpassword link:
 *   post:
 *     description: The user will reset their password
 *     parameters:
 *       - name: email 
 *         description: users email address
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: confirm password
 *         description: confirm user's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: update password
 */
router.post('/resetpasswordlink',authController.replaceLink);
/**
 * @swagger
 *
 * /auth/google:
 *   get:
 *     description: Use passport.authenticate() as route middleware to authenticate the request.  The first step in Google authentication will involve redirecting the user to google.com.  After authorization, Google will redirect the user   back to this application at /auth/google/callback
 *     responses:
 *       200:
 *         description: Google auth
 */
  

router.get('/auth/google',
  passport.authenticate('google', { scope: 'https://www.google.com/m8/feeds' }))

/**
 * @swagger
 *
 * /auth/google/callback:
 *   get:
 *     description: Use passport.authenticate() as route middleware to authenticate the  request.  If authentication fails, the user will be redirected back to the  login page.  Otherwise, the primary route function function will be called, which, in this example, will redirect the user to the home page.
 *     responses:
 *       200:
 *         description:  Google auth
 */
  
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

module.exports = (router);