const express = require('express');
const router = express.Router();
const friendRequestController = require("./../controllers/friendRequestController");
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/friendRequest`;

    // defining routes.


    /**
    * @apiGroup friendRequest
    * @apiVersion  1.0.0
    * @api {post} /api/v1/friendRequest/sendFriendRequest/:authToken api for sending a new friend request.
    *
    * @apiParam {string} authToken authorization token of the user. (query params) (required)
    * @apiParam {string} requesterId Id of the requestor. (body params) (required)
    * @apiParam {string} requesterName Name of the requestor. (body params) (required)
    * @apiParam {string} recipientId Id of the recipient. (body params) (required)
    * @apiParam {string} recipientName name of the recipient. (body params) (required)
    *
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
        {
           "error": false,
           "me  ssage": "Friend request sent successfully",
           "status": 200,
           "data": {
               "__v": 0,
               "requesterId": "SMUBK4mjt",
               "recipientId": "pKLx9sQc1",
               "status": 1,
               "_id": "5d0d25418d5bd30bd45de68a",
               "recipientName": "Himanshu"
           }

       }
   */
    // params: authToken, requesterId, requesterName, recipientId
    app.post(`${baseUrl}/sendFriendRequest/:authToken`, auth.isAuthorized, friendRequestController.sendFriendRequest);


    /**
    * @apiGroup friendRequest
    * @apiVersion  1.0.0
    * @api {get} /api/v1/friendRequest/getAllFriendRequests api for getting all friend requests.
    *
    * @apiParam {string} authToken authorization token of the user. (query params) (required)
    * @apiParam {string} userId Id of the user. (query params) (required)
    *
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
        {
           "error": false,
           "message": "All requests found",
           "status": 200,
           "data": [
        {
            "requesterId": "SMUBK4mjt",
            "recipientId": "pKLx9sQc1",
            "status": 1,
            "requesterName": "Himanshu"
        }
    ]
       }
   */
    // params: authToken, userId
    app.get(`${baseUrl}/getAllFriendRequests/:authToken/:userId`, auth.isAuthorized, friendRequestController.getAllFriendRequests);


    /**
    * @apiGroup friendRequest
    * @apiVersion  1.0.0
    * @api {post} /api/v1/friendRequest/acceptFriendRequest/:authToken api for accepting friend requests.
    *
    * @apiParam {string} authToken authorization token of the user. (query params) (required)
    * @apiParam {string} userId Id of the user. (body params) (required)
    * @apiParam {string} userName name of the user. (body params) (required)
    * @apiParam {string} requesterId Id of the requestor. (body params) (required)
    * @apiParam {string} requesterName Name of the requestor. (body params) (required)
    *
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
        {
           "error": false,
           "message": "All requests found",
           "status": 200,
           "data": [
        {
             "friends": [
            {
                "_id": "5d0d35e19bc2ee2474161a11",
                "name": "Himanshu",
                "id": "SMUBK4mjt"
            }
        ],
        "userName": "Hulk",
        "createdOn": "2019-06-21T18:33:17.000Z",
        "countryCode": "+91",
        "mobileNumber": 8988778877,
        "email": "hulk@green.com",
        "password": "$2b$10$1FCymR2bZjsncGBKU.l6lezHhF7Ig4Uuw7JZnX1KVMfp8PjhpqqC2",
        "lastName": "Master",
        "firstName": "Hulk",
        "userId": "pKLx9sQc1"
    }
        }
    ]
       }
   */
    // params: firstName, lastName, email, mobileNumber, password
    app.post(`${baseUrl}/acceptFriendRequest/:authToken`, auth.isAuthorized, friendRequestController.acceptFriendRequest);


    /**
    * @apiGroup friendRequest
    * @apiVersion  1.0.0
    * @api {post} /api/v1/friendRequest/cancelFriendRequest api for rejecting a friend request.
    *
    * @apiParam {string} authToken authorization token of the user. (query params) (required)
    * @apiParam {string} userId Id of the user. (body params) (required)
    * @apiParam {string} requesterId Id of the requestor. (body params) (required)
    *
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
        {
           "error": false,
           "message": "Friend request rejected",
           "status": 200,
           "data": [
        {
            "requesterId": "SMUBK4mjt",
            "recipientId": "pKLx9sQc1",
            "status": 1,
            "requesterName": "Himanshu"
        }
    ]
       }
   */
    // params: authToken, userId
    app.post(`${baseUrl}/cancelFriendRequest/:authToken`, auth.isAuthorized, friendRequestController.cancelFriendRequest);

}