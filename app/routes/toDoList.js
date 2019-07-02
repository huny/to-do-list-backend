const express = require('express');
const router = express.Router();
const toDoListController = require("./../controllers/toDoListController");
const appConfig = require("./../../config/appConfig")
const auth = require("./../middlewares/auth")

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/toDoList`;

    //defining routes

    /**
     * @apiGroup toDoList
     * @apiVersion  1.0.0
     * @api {post} /api/v1/toDoList/create/:authToken api for creating new to-do-list.
     *
     * @apiParam {string} authToken authorization token of the user. (query params) (required)
     * @apiParam {string} userId Id of the user. (body params) (required)
     * @apiParam {string} listName Name of the to-do-list (body params) (required)
     * @apiParam {string} loggedOnUser loggd on user (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "List created successfully",
            "status": 200,
            "data": {
               "__v": 0,
               "_id": "5d0bcdacc26de82830c8b506",
               "listItems": [],
               "listName": "My first to-do-list",
               "listId": "52Z-hlSjk",
               "userId": "SMUBK4mjt"
            }
        }
    */
    // params: authToken, userId, listName, loggedOnUser
    app.post(`${baseUrl}/create/:authToken`, auth.isAuthorized, toDoListController.createToDoList);


    /**
     * @apiGroup toDoList
     * @apiVersion  1.0.0
     * @api {post} /api/v1/toDoList/addItem/:authToken api for adding new to-do-item.
     *
     * @apiParam {string} authToken authorization token of the user. (query params) (required)
     * @apiParam {string} listId Id of the to-do-list. (body params) (required)
     * @apiParam {string} parentId Id of the parent item (body params) (required)
     * @apiParam {string} itemName Name of the to-do-item (body params) (required)
     * @apiParam {string} loggedOnUser logged on user (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Item Details Found",
            "status": 200,
            "data": {
              "listItems": [
            {
                "_id": "5d0bf572c67b0b0ff8bf7b40",
                "parentId": "JvCT_sVOv",
                "itemId": "0WdOsw85t",
                "itemName": "to-do-item",
                "isCompleted": false
            }
        ],
        "listName": "My first to-do-list",
        "listId": "JvCT_sVOv",
        "userId": "SMUBK4mjt"
            }
        }
    */
    // params: authToken, listId, parentId, itemName, loggedOnUser
    app.post(`${baseUrl}/addItem/:authToken`, auth.isAuthorized, toDoListController.addItemToList);


    /**
    * @apiGroup toDoList
    * @apiVersion  1.0.0
    * @api {post} /api/v1/toDoList/editItem/:authToken api for editing to-do-item.
    *
    * @apiParam {string} authToken authorization token of the user. (query params) (required)
    * @apiParam {string} itemId Id of the to-do-item (body params) (required)
    * @apiParam {string} itemName Name of the to-do-item (body params) (required)
    * @apiParam {string} loggedOnUser logged on user (body params) (required)
    *
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
        {
          "error": false,
           "message": "Item Details Found",
           "status": 200,
           "data": {
             "listItems": [
           {
               "_id": "5d0bf572c67b0b0ff8bf7b40",
               "parentId": "JvCT_sVOv",
               "itemId": "0WdOsw85t",
               "itemName": "to-do-item",
               "isCompleted": false
           }
       ],
       "listName": "My first to-do-list",
       "listId": "JvCT_sVOv",
       "userId": "SMUBK4mjt"
           }
       }
   */
    // params: authToken, itemId, itemName
    app.post(`${baseUrl}/editItem/:authToken`, auth.isAuthorized, toDoListController.editItem);


    /**
     * @apiGroup toDoList
     * @apiVersion  1.0.0
     * @api {post} /api/v1/toDoList/deleteItem/:authToken/:itemId/:loggedOnUser api for deleting to-do-item.
     *
     * @apiParam {string} authToken authorization token of the user. (query params) (required)
     * @apiParam {string} itemId Id of the to-do-item (body params) (required)
     * @apiParam {string} listId Id of the to-do-list (body params) (required)
     * @apiParam {string} loggedOnUser logged on user (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
             "error": false,
             "message": "Deleted the item successfully",
             "status": 200,
             "data": {
                 "n": 1,
                 "ok": 1
              } 
         }
    */
    // params: authToken, itemId, loggedOnUser
    app.post(`${baseUrl}/deleteItem/:authToken`, auth.isAuthorized, toDoListController.deleteItem);


    /**
    * @apiGroup toDoList
    * @apiVersion  1.0.0
    * @api {post} /api/v1/toDoList/changeStatusOfItem/:authToken api for change status of to-do-item.
    *
    * @apiParam {string} authToken authorization token of the user. (query params) (required)
    * @apiParam {string} itemId Id of the to-do-item (body params) (required)
    * @apiParam {string} isCompleted status of to-do-item (body params) (required)
    * @apiParam {string} loggedOnUser logged on user (body params) (required)
    *
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
        {
          "error": false,
           "message": "Item Details Found",
           "status": 200,
           "data": {
             "listItems": [
           {
               "_id": "5d0bf572c67b0b0ff8bf7b40",
               "parentId": "JvCT_sVOv",
               "itemId": "0WdOsw85t",
               "itemName": "to-do-item",
               "isCompleted": false
           }
       ],
       "listName": "My first to-do-list",
       "listId": "JvCT_sVOv",
       "userId": "SMUBK4mjt"
           }
       }
   */
    // params: authToken, itemId, isCompleted
    app.post(`${baseUrl}/changeStatusOfItem/:authToken`, auth.isAuthorized, toDoListController.changeStatusOfItem);


    /**
    * @apiGroup toDoList
    * @apiVersion  1.0.0
    * @api {get} /api/v1/toDoList/getAllLists/:authToken/:userId/:loggedOnUser api for getting all to-do-lists of a user.
    *
    * @apiParam {string} authToken authorization token of the user. (query params) (required)
    * @apiParam {string} userId Id of the user (query params) (required)
    * @apiParam {string} loggedOnUser logged on user (query params) (required)
    *
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
        {
          "error": false,
           "message": "Item Details Found",
           "status": 200,
           "data": {
             "listItems": [
           {
               "_id": "5d0bf572c67b0b0ff8bf7b40",
               "parentId": "JvCT_sVOv",
               "itemId": "0WdOsw85t",
               "itemName": "to-do-item",
               "isCompleted": false
           }
       ],
       "listName": "My first to-do-list",
       "listId": "JvCT_sVOv",
       "userId": "SMUBK4mjt"
           }
       }
   */
    // params: authToken, userId, loggedOnUser
    app.get(`${baseUrl}/getAllLists/:authToken/:userId/:loggedOnUser`, auth.isAuthorized, toDoListController.getAllLists);

    /**
    * @apiGroup toDoList
    * @apiVersion  1.0.0
    * @api {post} /api/v1/toDoList/delete/:authToken/:listId/:loggedOnUser api for deleting to-do-list.
    *
    * @apiParam {string} authToken authorization token of the user. (query params) (required)
    * @apiParam {string} listId of the to-do-list (body params) (required)
    * @apiParam {string} loggedOnUser logged on user (body params) (required)
    *
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
        {
          "error": false,
           "message": "Item Details Found",
           "status": 200,
           "data": {
             "listItems": [
           {
               "_id": "5d0bf572c67b0b0ff8bf7b40",
               "parentId": "JvCT_sVOv",
               "itemId": "0WdOsw85t",
               "itemName": "to-do-item",
               "isCompleted": false
           }
       ],
       "listName": "My first to-do-list",
       "listId": "JvCT_sVOv",
       "userId": "SMUBK4mjt"
           }
       }
   */
    // params: authToken, listId, loggedOnUser
    app.post(`${baseUrl}/delete/:authToken`, auth.isAuthorized, toDoListController.deleteToDoList);

    /**
    * @apiGroup toDoList
    * @apiVersion  1.0.0
    * @api {post} /api/v1/toDoList/undo/:authToken/:listId api for undo previos action.
    *
    * @apiParam {string} authToken authorization token of the user. (query params) (required)
    * @apiParam {string} listId of the to-do-list (query params) (required)
    *
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
        {
          "error": false,
           "message": "list Details Found",
           "status": 200,
           "data": {
             "listItems": [
           {
               "_id": "5d0bf572c67b0b0ff8bf7b40",
               "parentId": "JvCT_sVOv",
               "itemId": "0WdOsw85t",
               "itemName": "to-do-item",
               "isCompleted": false
           }
       ],
       "listName": "My first to-do-list",
       "listId": "JvCT_sVOv",
       "userId": "SMUBK4mjt"
           }
       }
   */
    // params: authToken, listId, loggedOnUser
    app.post(`${baseUrl}/undo/:authToken/:listId`, auth.isAuthorized, toDoListController.undoActions);



}