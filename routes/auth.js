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
 *     description: login
 *     parameters:
 *       - name: username
 *         description: Username to use for signin.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: login
 */
router.post('/login', authController.loginAction);
/**
 * @swagger
 *
 * /signup:
 *   post:
 *     description: admin registration
 *     parameters:
 *       - name: username
 *         description: Username to use for signin.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         description: email to use for signin.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: registered
 */
router.post('/signup', authController.signupAction);
/**
 * @swagger
 *
 * /facebookFeed:
 *   post:
 *     description: facebook feed
 *     parameters:
 *       - name: email
 *         description: Username to use for signin.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: response
 */
router.post('/facebookFeed',authController.facebookApi);
/**
 * @swagger
 *
 * /facebookFeed/ad:
 *   post:
 *     description: facebook feed ad
 *     parameters:
 *       - name: email
 *         description: Username to use for signin.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: response
 */
router.post('/facebookFeed/ad',authController.facebookad);
/**
 * @swagger
 *
 * /youTube:
 *   post:
 *     description: YouTube user
 *     parameters:
 *       - name: username
 *         description: Username to use for signin.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: response
 */
router.post('/youTube',authController.youTube)
/**
 * @swagger
 *
 * /youTube/channel:
 *   post:
 *     description: YouTube user
 *     parameters:
 *       - name: username
 *         description: Username to use for signin.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: response
 */

router.post('/youTube/channel',authController.ytChannel)


module.exports = router;