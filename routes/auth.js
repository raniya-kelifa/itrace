var express = require('express');
var authController = require('../controllers/functions');
var router = express.Router();

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
 *   get:
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
router.get('/facebookFeed',authController.facebookApi);
/**
 * @swagger
 *
 * /facebookFeed/ad:
 *   get:
 *     description: facebook feed ad
 *     responses:
 *       201:
 *         description: response
 */
router.get('/facebookFeed/ad',authController.facebookad);
/**
 * @swagger
 *
 * /youTube:
 *   get:
 *     description: YouTube user
 *     responses:
 *       201:
 *         description: response
 */
router.get('/youTube',authController.youTube)
/**
 * @swagger
 *
 * /youTube/channel:
 *   get:
 *     description: YouTube channel
 *     responses:
 *       201:
 *         description: response
 */

router.get('/youTube/channel',authController.ytChannel)
/**
 * @swagger
 *
 * /forgetPassowrd:
 *   post:
 *     description: will send link to email address
 *     parameters:
 *       - name: email
 *         description: email to use for signin.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: login
 */
router.post('/fogetPassword',authController.forgetPasswordAction)
/**
 * @swagger
 *
 * /Home:
 *   pget:
 *     description: will send link to email address
 *     responses:
 *       201:
 *         description: login
 */
router.get('/Home',(req,res)=>{
  res.send('<a href= "http://localhost:4242/signup" </a> <a>href= "http://localhost:4242/login" </a> ')
})



module.exports = router;