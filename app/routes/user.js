const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const appConfig = require("./../../config/appConfig")
const auth = require('./../../app/middlewares/auth')

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/users`;

    // defining routes.


    /**
    * @apiGroup users
    * @apiVersion  1.0.0
    * @api {post} /api/v1/users/signup api for user signup.
    *
    * @apiParam {string} firstName first name of the user. (body params) (required)
    * @apiParam {string} lastName last name of the user. (body params) (required)
    * @apiParam {string} email email of the user. (body params) (required)
    * @apiParam {string} mobileNumber mobile number of the user. (body params) (required)
    * @apiParam {string} password password of the user. (body params) (required)
    * @apiParam {string} countryCode countryCode of the user. (body params) (required)
    *
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
        {
           "error": false,
           "message": "User created",
           "status": 200,
           "data": {
                "friends": [],
                "userName": "Hulk",
                "mobileNumber": 8988778877,
                "email": "hulk@green.com",
                "lastName": "Master",
                "firstName": "Hulk",
                "userId": "pKLx9sQc1"
           }

       }
   */
    // params: firstName, lastName, email, mobileNumber, password
    app.post(`${baseUrl}/signup`, userController.signUpFunction);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/login api for user login.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Login Successful",
            "status": 200,
            "data": {
                "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6ImZRTzI5MTlVYSIsImlhdCI6MTU1ODczMDM4MzE1MywiZXhwIjoxNTU4ODE2NzgzLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJJZCI6IktwWnF4X3JsZCIsImZpcnN0TmFtZSI6ImhpbWFuc2h1IiwibGFzdE5hbWUiOiJhcm9yYSIsImVtYWlsIjoiaGltYW5zaC5hcm9yYTcxNkBnbWFpbC5jb20iLCJtb2JpbGVOdW1iZXIiOjkwOTA5MDkwOTA5MCwiY291bnRyeUNvZGUiOjkxfX0.ixnjNKg9tXnqwaTAYKHXS7-5KKp8RlKo2zdcHXP7uTo",
        "userDetails": {
            "userId": "KpZqx_rld",
            "firstName": "himanshu",
            "lastName": "arora",
            "email": "someemail@example.com",
            "mobileNumber": 909090909090,
            "countryCode": 91
        }

        }
    */

    // params: email, password.
    app.post(`${baseUrl}/login`, userController.loginFunction);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/logout to logout user.
     *
     * @apiParam {string} authToken authorization token of the user. (auth headers) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Logged Out Successfully",
            "status": 200,
            "data": null

        }
    */

    // auth token params: authToken.
    app.post(`${baseUrl}/logout`, auth.isAuthorized, userController.logout);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/forgotPassword to reset password.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Mail sent successfully",
            "status": 200,
            "data": 'someemail@example.com'

        }
    */

    // auth token params: email.
    app.post(`${baseUrl}/forgotPassword`, userController.forgotPassword);

    /**
 * @apiGroup users
 * @apiVersion  1.0.0
 * @api {get} /api/v1/users/forgotPassword to reset password.
 *
 * @apiParam {string} token reset password token of the user. (query params) (required)
 *
 * @apiSuccess {object} myResponse shows error status, message, http status code, result.
 * 
 * @apiSuccessExample {object} Success-Response:
     {
        "error": false,
        "message": "successsfully validate user",
        "status": 200,
        "data": 'c136937c5749f6b51349d669831cd06229fbd4f6'

    }
*/

    // auth token params: email.
    app.get(`${baseUrl}/reset/:token`, userController.goToResetPassword);

    /**
 * @apiGroup users
 * @apiVersion  1.0.0
 * @api {post} /api/v1/users/reset/:token to reset password.
 *
 * @apiParam {string} token reset password token of the user. (query params) (required)
 * @apiParam {string} password password of the user. (body params) (required)
 * @apiParam {string} confirmPassword confirm password of the user. (body params) (required)
 *
 * @apiSuccess {object} myResponse shows error status, message, http status code, result.
 * 
 * @apiSuccessExample {object} Success-Response:
     {
        "error": false,
        "message": "Pssword reset successfully",
        "status": 200,
        "data": null
    }
*/

    app.post(`${baseUrl}/reset/:token`, userController.resetPassword);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {get} /api/v1/users/users/all to get all user details
     *
     * @apiParam {string} authToken authorization token of the user. (query params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "All user details found",
            "status": 200,
            "data": [{
                "userId": "-E9zxTYA8"
                "firstName": "Alex",
                "lastName": "Yadav",  
                "email": "someone@mail.com",                          
                "mobileNumber": 2234435524,
                "isAdmin": true,
                "userName": "Alex-admin"
            }]

        }
    */

    app.get(`${baseUrl}/all/:authToken`, auth.isAuthorized, userController.getAllUsers);


    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {get} /api/v1/users/getUserById/:authToken/:userId to get all user details
     *
     * @apiParam {string} authToken authorization token of the user. (query params) (required)
     * @apiParam {string} userId Id of the user. (query params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "All user details found",
            "status": 200,
            "data": {
                "userId": "-E9zxTYA8"
                "firstName": "Alex",
                "lastName": "Yadav",  
                "email": "someone@mail.com",                          
                "mobileNumber": 2234435524,
                "userName": "Alex-admin"
            }

        }
    */

    app.get(`${baseUrl}/getUserById/:authToken/:userId`, auth.isAuthorized, userController.getUserById);

    /**
  * @apiGroup users
  * @apiVersion  1.0.0
  * @api {get} /api/v1/users/getUserById/:authToken/:userId to get all user details
  *
  * @apiParam {string} authToken authorization token of the user. (query params) (required)
  * @apiParam {string} userId Id of the user. (query params) (required)
  *
  * @apiSuccess {object} myResponse shows error status, message, http status code, result.
  * 
  * @apiSuccessExample {object} Success-Response:
      {
         "error": false,
         "message": "All user details found",
         "status": 200,
         "data": [{
             "userId": "-E9zxTYA8"
             "firstName": "Alex",
             "lastName": "Yadav",  
             "email": "someone@mail.com",                          
             "mobileNumber": 2234435524,
             "userName": "Alex-admin"
         }]

     }
 */

    app.get(`${baseUrl}/getPeopleYouMayKnow/:authToken/:userId`, auth.isAuthorized, userController.getPeopleYouMayKnow);

}
