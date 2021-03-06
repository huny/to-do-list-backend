define({ "api": [
  {
    "group": "friendRequest",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/friendRequest/getAllFriendRequests",
    "title": "api for getting all friend requests.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authorization token of the user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>Id of the user. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    {\n       \"error\": false,\n       \"message\": \"All requests found\",\n       \"status\": 200,\n       \"data\": [\n    {\n        \"requesterId\": \"SMUBK4mjt\",\n        \"recipientId\": \"pKLx9sQc1\",\n        \"status\": 1,\n        \"requesterName\": \"Himanshu\"\n    }\n]\n   }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/friendRequest.js",
    "groupTitle": "friendRequest",
    "name": "GetApiV1FriendrequestGetallfriendrequests"
  },
  {
    "group": "friendRequest",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/friendRequest/acceptFriendRequest/:authToken",
    "title": "api for accepting friend requests.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authorization token of the user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>Id of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userName",
            "description": "<p>name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "requesterId",
            "description": "<p>Id of the requestor. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "requesterName",
            "description": "<p>Name of the requestor. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    {\n       \"error\": false,\n       \"message\": \"All requests found\",\n       \"status\": 200,\n       \"data\": [\n    {\n         \"friends\": [\n        {\n            \"_id\": \"5d0d35e19bc2ee2474161a11\",\n            \"name\": \"Himanshu\",\n            \"id\": \"SMUBK4mjt\"\n        }\n    ],\n    \"userName\": \"Hulk\",\n    \"createdOn\": \"2019-06-21T18:33:17.000Z\",\n    \"countryCode\": \"+91\",\n    \"mobileNumber\": 8988778877,\n    \"email\": \"hulk@green.com\",\n    \"password\": \"$2b$10$1FCymR2bZjsncGBKU.l6lezHhF7Ig4Uuw7JZnX1KVMfp8PjhpqqC2\",\n    \"lastName\": \"Master\",\n    \"firstName\": \"Hulk\",\n    \"userId\": \"pKLx9sQc1\"\n}\n    }\n]\n   }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/friendRequest.js",
    "groupTitle": "friendRequest",
    "name": "PostApiV1FriendrequestAcceptfriendrequestAuthtoken"
  },
  {
    "group": "friendRequest",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/friendRequest/cancelFriendRequest",
    "title": "api for rejecting a friend request.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authorization token of the user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>Id of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "requesterId",
            "description": "<p>Id of the requestor. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    {\n       \"error\": false,\n       \"message\": \"Friend request rejected\",\n       \"status\": 200,\n       \"data\": [\n    {\n        \"requesterId\": \"SMUBK4mjt\",\n        \"recipientId\": \"pKLx9sQc1\",\n        \"status\": 1,\n        \"requesterName\": \"Himanshu\"\n    }\n]\n   }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/friendRequest.js",
    "groupTitle": "friendRequest",
    "name": "PostApiV1FriendrequestCancelfriendrequest"
  },
  {
    "group": "friendRequest",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/friendRequest/sendFriendRequest/:authToken",
    "title": "api for sending a new friend request.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authorization token of the user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "requesterId",
            "description": "<p>Id of the requestor. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "requesterName",
            "description": "<p>Name of the requestor. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "recipientId",
            "description": "<p>Id of the recipient. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "recipientName",
            "description": "<p>name of the recipient. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"me  ssage\": \"Friend request sent successfully\",\n    \"status\": 200,\n    \"data\": {\n        \"__v\": 0,\n        \"requesterId\": \"SMUBK4mjt\",\n        \"recipientId\": \"pKLx9sQc1\",\n        \"status\": 1,\n        \"_id\": \"5d0d25418d5bd30bd45de68a\",\n        \"recipientName\": \"Himanshu\"\n    }\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/friendRequest.js",
    "groupTitle": "friendRequest",
    "name": "PostApiV1FriendrequestSendfriendrequestAuthtoken"
  },
  {
    "group": "toDoList",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/toDoList/getAllLists/:authToken/:userId/:loggedOnUser",
    "title": "api for getting all to-do-lists of a user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authorization token of the user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>Id of the user (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "loggedOnUser",
            "description": "<p>logged on user (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n   \"error\": false,\n    \"message\": \"Item Details Found\",\n    \"status\": 200,\n    \"data\": {\n      \"listItems\": [\n    {\n        \"_id\": \"5d0bf572c67b0b0ff8bf7b40\",\n        \"parentId\": \"JvCT_sVOv\",\n        \"itemId\": \"0WdOsw85t\",\n        \"itemName\": \"to-do-item\",\n        \"isCompleted\": false\n    }\n],\n\"listName\": \"My first to-do-list\",\n\"listId\": \"JvCT_sVOv\",\n\"userId\": \"SMUBK4mjt\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/toDoList.js",
    "groupTitle": "toDoList",
    "name": "GetApiV1TodolistGetalllistsAuthtokenUseridLoggedonuser"
  },
  {
    "group": "toDoList",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/toDoList/addItem/:authToken",
    "title": "api for adding new to-do-item.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authorization token of the user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>Id of the to-do-list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "parentId",
            "description": "<p>Id of the parent item (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemName",
            "description": "<p>Name of the to-do-item (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "loggedOnUser",
            "description": "<p>logged on user (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Item Details Found\",\n    \"status\": 200,\n    \"data\": {\n      \"listItems\": [\n    {\n        \"_id\": \"5d0bf572c67b0b0ff8bf7b40\",\n        \"parentId\": \"JvCT_sVOv\",\n        \"itemId\": \"0WdOsw85t\",\n        \"itemName\": \"to-do-item\",\n        \"isCompleted\": false\n    }\n],\n\"listName\": \"My first to-do-list\",\n\"listId\": \"JvCT_sVOv\",\n\"userId\": \"SMUBK4mjt\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/toDoList.js",
    "groupTitle": "toDoList",
    "name": "PostApiV1TodolistAdditemAuthtoken"
  },
  {
    "group": "toDoList",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/toDoList/changeStatusOfItem/:authToken",
    "title": "api for change status of to-do-item.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authorization token of the user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>Id of the to-do-item (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "isCompleted",
            "description": "<p>status of to-do-item (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "loggedOnUser",
            "description": "<p>logged on user (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n   \"error\": false,\n    \"message\": \"Item Details Found\",\n    \"status\": 200,\n    \"data\": {\n      \"listItems\": [\n    {\n        \"_id\": \"5d0bf572c67b0b0ff8bf7b40\",\n        \"parentId\": \"JvCT_sVOv\",\n        \"itemId\": \"0WdOsw85t\",\n        \"itemName\": \"to-do-item\",\n        \"isCompleted\": false\n    }\n],\n\"listName\": \"My first to-do-list\",\n\"listId\": \"JvCT_sVOv\",\n\"userId\": \"SMUBK4mjt\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/toDoList.js",
    "groupTitle": "toDoList",
    "name": "PostApiV1TodolistChangestatusofitemAuthtoken"
  },
  {
    "group": "toDoList",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/toDoList/create/:authToken",
    "title": "api for creating new to-do-list.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authorization token of the user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>Id of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listName",
            "description": "<p>Name of the to-do-list (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "loggedOnUser",
            "description": "<p>loggd on user (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"List created successfully\",\n    \"status\": 200,\n    \"data\": {\n       \"__v\": 0,\n       \"_id\": \"5d0bcdacc26de82830c8b506\",\n       \"listItems\": [],\n       \"listName\": \"My first to-do-list\",\n       \"listId\": \"52Z-hlSjk\",\n       \"userId\": \"SMUBK4mjt\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/toDoList.js",
    "groupTitle": "toDoList",
    "name": "PostApiV1TodolistCreateAuthtoken"
  },
  {
    "group": "toDoList",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/toDoList/delete/:authToken/:listId/:loggedOnUser",
    "title": "api for deleting to-do-list.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authorization token of the user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>of the to-do-list (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "loggedOnUser",
            "description": "<p>logged on user (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n   \"error\": false,\n    \"message\": \"Item Details Found\",\n    \"status\": 200,\n    \"data\": {\n      \"listItems\": [\n    {\n        \"_id\": \"5d0bf572c67b0b0ff8bf7b40\",\n        \"parentId\": \"JvCT_sVOv\",\n        \"itemId\": \"0WdOsw85t\",\n        \"itemName\": \"to-do-item\",\n        \"isCompleted\": false\n    }\n],\n\"listName\": \"My first to-do-list\",\n\"listId\": \"JvCT_sVOv\",\n\"userId\": \"SMUBK4mjt\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/toDoList.js",
    "groupTitle": "toDoList",
    "name": "PostApiV1TodolistDeleteAuthtokenListidLoggedonuser"
  },
  {
    "group": "toDoList",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/toDoList/deleteItem/:authToken/:itemId/:loggedOnUser",
    "title": "api for deleting to-do-item.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authorization token of the user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>Id of the to-do-item (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>Id of the to-do-list (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "loggedOnUser",
            "description": "<p>logged on user (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Deleted the item successfully\",\n    \"status\": 200,\n    \"data\": {\n        \"n\": 1,\n        \"ok\": 1\n     } \n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/toDoList.js",
    "groupTitle": "toDoList",
    "name": "PostApiV1TodolistDeleteitemAuthtokenItemidLoggedonuser"
  },
  {
    "group": "toDoList",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/toDoList/editItem/:authToken",
    "title": "api for editing to-do-item.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authorization token of the user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>Id of the to-do-item (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemName",
            "description": "<p>Name of the to-do-item (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "loggedOnUser",
            "description": "<p>logged on user (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n   \"error\": false,\n    \"message\": \"Item Details Found\",\n    \"status\": 200,\n    \"data\": {\n      \"listItems\": [\n    {\n        \"_id\": \"5d0bf572c67b0b0ff8bf7b40\",\n        \"parentId\": \"JvCT_sVOv\",\n        \"itemId\": \"0WdOsw85t\",\n        \"itemName\": \"to-do-item\",\n        \"isCompleted\": false\n    }\n],\n\"listName\": \"My first to-do-list\",\n\"listId\": \"JvCT_sVOv\",\n\"userId\": \"SMUBK4mjt\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/toDoList.js",
    "groupTitle": "toDoList",
    "name": "PostApiV1TodolistEdititemAuthtoken"
  },
  {
    "group": "toDoList",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/toDoList/undo/:authToken/:listId",
    "title": "api for undo previos action.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authorization token of the user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>of the to-do-list (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n   \"error\": false,\n    \"message\": \"list Details Found\",\n    \"status\": 200,\n    \"data\": {\n      \"listItems\": [\n    {\n        \"_id\": \"5d0bf572c67b0b0ff8bf7b40\",\n        \"parentId\": \"JvCT_sVOv\",\n        \"itemId\": \"0WdOsw85t\",\n        \"itemName\": \"to-do-item\",\n        \"isCompleted\": false\n    }\n],\n\"listName\": \"My first to-do-list\",\n\"listId\": \"JvCT_sVOv\",\n\"userId\": \"SMUBK4mjt\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/toDoList.js",
    "groupTitle": "toDoList",
    "name": "PostApiV1TodolistUndoAuthtokenListid"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/forgotPassword",
    "title": "to reset password.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>reset password token of the user. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"successsfully validate user\",\n    \"status\": 200,\n    \"data\": 'c136937c5749f6b51349d669831cd06229fbd4f6'\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "GetApiV1UsersForgotpassword"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/getUserById/:authToken/:userId",
    "title": "to get all user details",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authorization token of the user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>Id of the user. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"All user details found\",\n    \"status\": 200,\n    \"data\": [{\n        \"userId\": \"-E9zxTYA8\"\n        \"firstName\": \"Alex\",\n        \"lastName\": \"Yadav\",  \n        \"email\": \"someone@mail.com\",                          \n        \"mobileNumber\": 2234435524,\n        \"userName\": \"Alex-admin\"\n    }]\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "GetApiV1UsersGetuserbyidAuthtokenUserid"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/getUserById/:authToken/:userId",
    "title": "to get all user details",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authorization token of the user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>Id of the user. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"All user details found\",\n    \"status\": 200,\n    \"data\": {\n        \"userId\": \"-E9zxTYA8\"\n        \"firstName\": \"Alex\",\n        \"lastName\": \"Yadav\",  \n        \"email\": \"someone@mail.com\",                          \n        \"mobileNumber\": 2234435524,\n        \"userName\": \"Alex-admin\"\n    }\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "GetApiV1UsersGetuserbyidAuthtokenUserid"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/users/all",
    "title": "to get all user details",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authorization token of the user. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"All user details found\",\n    \"status\": 200,\n    \"data\": [{\n        \"userId\": \"-E9zxTYA8\"\n        \"firstName\": \"Alex\",\n        \"lastName\": \"Yadav\",  \n        \"email\": \"someone@mail.com\",                          \n        \"mobileNumber\": 2234435524,\n        \"isAdmin\": true,\n        \"userName\": \"Alex-admin\"\n    }]\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "GetApiV1UsersUsersAll"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/forgotPassword",
    "title": "to reset password.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Mail sent successfully\",\n    \"status\": 200,\n    \"data\": 'someemail@example.com'\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersForgotpassword"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "api for user login.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Login Successful\",\n    \"status\": 200,\n    \"data\": {\n        \"authToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6ImZRTzI5MTlVYSIsImlhdCI6MTU1ODczMDM4MzE1MywiZXhwIjoxNTU4ODE2NzgzLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJJZCI6IktwWnF4X3JsZCIsImZpcnN0TmFtZSI6ImhpbWFuc2h1IiwibGFzdE5hbWUiOiJhcm9yYSIsImVtYWlsIjoiaGltYW5zaC5hcm9yYTcxNkBnbWFpbC5jb20iLCJtb2JpbGVOdW1iZXIiOjkwOTA5MDkwOTA5MCwiY291bnRyeUNvZGUiOjkxfX0.ixnjNKg9tXnqwaTAYKHXS7-5KKp8RlKo2zdcHXP7uTo\",\n\"userDetails\": {\n    \"userId\": \"KpZqx_rld\",\n    \"firstName\": \"himanshu\",\n    \"lastName\": \"arora\",\n    \"email\": \"someemail@example.com\",\n    \"mobileNumber\": 909090909090,\n    \"countryCode\": 91\n}\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogin"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/logout",
    "title": "to logout user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authorization token of the user. (auth headers) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Logged Out Successfully\",\n    \"status\": 200,\n    \"data\": null\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogout"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/reset/:token",
    "title": "to reset password.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>reset password token of the user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "confirmPassword",
            "description": "<p>confirm password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Pssword reset successfully\",\n    \"status\": 200,\n    \"data\": null\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersResetToken"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/signup",
    "title": "api for user signup.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>first name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": "<p>last name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>mobile number of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "countryCode",
            "description": "<p>countryCode of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"User created\",\n    \"status\": 200,\n    \"data\": {\n         \"friends\": [],\n         \"userName\": \"Hulk\",\n         \"mobileNumber\": 8988778877,\n         \"email\": \"hulk@green.com\",\n         \"lastName\": \"Master\",\n         \"firstName\": \"Hulk\",\n         \"userId\": \"pKLx9sQc1\"\n    }\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersSignup"
  }
] });
