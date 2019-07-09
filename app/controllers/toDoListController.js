const mongoose = require('mongoose');
const shortid = require('shortid');
const response = require('./../libs/responseLib');
const logger = require('./../libs/loggerLib');
const check = require('./../libs/checkLib');
const stateManagement = require('./../libs/stateManagementLib')

/* Models */
const ToDoListModel = mongoose.model('ToDoList')
const UserModel = mongoose.model('User')
const ToDoListHistoryModel = mongoose.model('ToDoListHistory')

//create a new ToDolist
let createToDoList = (req, res) => {
    if (check.isEmpty(req.body.userId) || check.isEmpty(req.body.listName)) {
        let apiResponse = response.generate(true, 'One or more required parameters are missing', 403, null)
        res.send(apiResponse)
    } else {
        let listId = shortid.generate();

        let newList = new ToDoListModel({
            listId: listId,
            userId: req.body.userId,
            listName: req.body.listName,
            createdBy: req.body.loggedOnUser
        }) // end new toDoList model

        newList.save((err, listDetails) => {
            if (err) {
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'List created successfully', 200, listDetails)
                res.send(apiResponse)
            }
        }) // end new list save
    }
}//end create toDoList

//add toDoitems to List
let addItemToList = (req, res) => {
    if (check.isEmpty(req.body.listId) || check.isEmpty(req.body.parentId) || check.isEmpty(req.body.itemName)) {
        let apiResponse = response.generate(true, 'One or more required parameters are missing', 403, null)
        res.send(apiResponse)
    } else {
        ToDoListModel.findOne({ 'listId': req.body.listId }, (err, result) => {
            if (err) {
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                let apiResponse = response.generate(true, 'List Not Found', 202, null)
                res.send(apiResponse)
            } else {
                let toDoItems = {
                    parentId: req.body.parentId,
                    itemId: shortid.generate(),
                    itemName: req.body.itemName,
                    lastModifiedBy: req.body.loggedOnUser
                }
                if (req.body.listId === req.body.parentId) {
                    ToDoListModel.update({ listId: req.body.listId }, { $push: { listItems: toDoItems } }).exec((err, result) => {
                        if (err) {
                            logger.error(err.message, 'toDoList Controller:addItems', 10)
                            let apiResponse = response.generate(true, 'Failed To add to-do-items', 500, null)
                            res.send(apiResponse)
                        } else if (check.isEmpty(result)) {
                            logger.info('No list Found', 'toDoList Controller: addItems')
                            let apiResponse = response.generate(true, 'No List Found', 202, null)
                            res.send(apiResponse)
                        } else {
                            ToDoListModel.findOne({ 'listId': req.body.listId, 'listItems.parentId': req.body.parentId })
                                .select('-__v -_id')
                                .lean()
                                .exec((err, listDetails) => {
                                    if (err) {
                                        logger.error(err.message, 'toDoList Controller:addItems', 10)
                                        let apiResponse = response.generate(true, 'Failed To Find item Details', 500, null)
                                        res.send(apiResponse)
                                    } else {
                                        let result = {
                                            modifiedBy: req.body.loggedOnUser,
                                            listDetails: listDetails
                                        }
                                        let apiResponse = response.generate(false, 'Item Details Found', 200, result)
                                        res.send(apiResponse)
                                    }
                                })
                        }
                    })

                } else {
                    ToDoListModel.update(
                        { listId: req.body.listId, 'listItems.itemId': req.body.parentId },
                        { $push: { listItems: toDoItems } }).exec((err, result) => {
                            if (err) {
                                logger.error(err.message, 'toDoList Controller:addItems', 10)
                                let apiResponse = response.generate(true, 'Failed To add to-do-items', 500, null)
                                res.send(apiResponse)
                            } else if (check.isEmpty(result)) {
                                logger.info('No list Found', 'toDoList Controller: addItems')
                                let apiResponse = response.generate(true, 'No List Found', 202, null)
                                res.send(apiResponse)
                            } else {
                                ToDoListModel.findOne({ 'listId': req.body.listId })
                                    .select('-__v -_id')
                                    .lean()
                                    .exec((err, listDetails) => {
                                        if (err) {
                                            logger.error(err.message, 'toDoList Controller:addItems', 10)
                                            let apiResponse = response.generate(true, 'Failed To Find item Details', 500, null)
                                            res.send(apiResponse)
                                        } else {
                                            let result = {
                                                modifiedBy: req.body.loggedOnUser,
                                                listDetails: listDetails
                                            }
                                            let apiResponse = response.generate(false, 'Item Details Found', 200, result)
                                            res.send(apiResponse)
                                        }
                                    })
                            }
                        })

                }
            }
        })
    }
}//end add items to list

//edit to-do-item
let editItem = (req, res) => {
    if (check.isEmpty(req.body.itemId) || check.isEmpty(req.body.itemName)) {
        let apiResponse = response.generate(true, 'One or more required parameters are missing', 403, null)
        res.send(apiResponse)
    } else {
        ToDoListModel.update(
            { 'listItems.itemId': req.body.itemId },
            { $set: { 'listItems.$.itemName': req.body.itemName, 'listItems.$.lastModifiedBy': req.body.loggedOnUser } })
            .exec((err, result) => {
                if (err) {
                    logger.error(err.message, 'toDoList Controller:editItem', 10)
                    let apiResponse = response.generate(true, 'Failed To update to-do-item', 500, null)
                    res.send(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('No list Found', 'toDoList Controller: editItem')
                    let apiResponse = response.generate(true, 'No List Found', 202, null)
                    res.send(apiResponse)
                } else {
                    ToDoListModel.findOne({ 'listItems.itemId': req.body.itemId })
                        .select('-__v -_id')
                        .lean()
                        .exec((err, listDetails) => {
                            if (err) {
                                logger.error(err.message, 'toDoList Controller:editItem', 10)
                                let apiResponse = response.generate(true, 'Failed To Find item Details', 500, null)
                                res.send(apiResponse)
                            } else {
                                let result = {
                                    modifiedBy: req.body.loggedOnUser,
                                    listDetails: listDetails
                                }
                                let apiResponse = response.generate(false, 'Item Details Found', 200, result)
                                res.send(apiResponse)
                            }
                        })
                }
            })
    }
}//end edit item

//delete to-do-item
let deleteItem = (req, res) => {
    if (check.isEmpty(req.body.itemId)) {
        let apiResponse = response.generate(true, 'One or more required parameters are missing', 403, null)
        res.send(apiResponse)
    } else {
        ToDoListModel.update(
            { 'listItems.itemId': req.body.itemId, },
            { $pull: { listItems: { itemId: req.body.itemId } } },
            { $pull: { listItems: { parentId: req.body.itemId } } }
        ).exec((err, result) => {
            if (err) {
                logger.error(err.message, 'toDoList Controller: deleteItem', 10)
                let apiResponse = response.generate(true, 'Failed To delete item', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No item Found', 'toDoList Controller: deleteItem')
                let apiResponse = response.generate(true, 'No item Found', 404, null)
                res.send(apiResponse)
            } else {
                ToDoListModel.findOne({ listId: req.body.listId })
                    .select('-__v -_id')
                    .lean()
                    .exec((err, listDetails) => {
                        if (err) {
                            logger.error(err.message, 'toDoList Controller:addItems', 10)
                            let apiResponse = response.generate(true, 'Failed To Find item Details', 500, null)
                            res.send(apiResponse)
                        } else {
                            let result = {
                                modifiedBy: req.body.loggedOnUser,
                                listDetails: listDetails
                            }
                            let apiResponse = response.generate(false, 'Deleted the item successfully', 200, result)
                            res.send(apiResponse)
                        }
                    })
            }
        });
    }
}//end delete item

//change status of an item
let changeStatusOfItem = (req, res) => {
    let isCompleted = req.body.isCompleted === 'true' ? true : false
    ToDoListModel.update(
        { 'listItems.itemId': req.body.itemId },
        { $set: { 'listItems.$.isCompleted': isCompleted, 'listItems.$.lastModifiedBy': req.body.loggedOnUser } })
        .exec((err, result) => {
            if (err) {
                logger.error(err.message, 'toDoList Controller:addItems', 10)
                let apiResponse = response.generate(true, 'Failed To add to-do-items', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No list Found', 'toDoList Controller: addItems')
                let apiResponse = response.generate(true, 'No List Found', 202, null)
                res.send(apiResponse)
            } else {
                ToDoListModel.findOne({ 'listItems.itemId': req.body.itemId })
                    .select('-__v -_id')
                    .lean()
                    .exec((err, listDetails) => {
                        if (err) {
                            logger.error(err.message, 'toDoList Controller:addItems', 10)
                            let apiResponse = response.generate(true, 'Failed To Find item Details', 500, null)
                            res.send(apiResponse)
                        } else {
                            let result = {
                                modifiedBy: req.body.loggedOnUser,
                                listDetails: listDetails
                            }
                            let apiResponse = response.generate(false, 'Item Details Found', 200, result)
                            res.send(apiResponse)
                        }
                    })
            }
        })
}//end change status of item

//get all lists of user
let getAllLists = (req, res) => {

    UserModel.findOne(
        {
            //$or: [
            userId: req.params.loggedOnUser
            //{ 'friends.id': req.params.loggedOnUser }]
        })
        .select('-__v -_id')
        .lean()
        .exec((err, userDetails) => {
            if (err) {
                logger.error(err.message, 'toDoListController: getAllLists', 10)
                let apiResponse = response.generate(true, 'Failed To Find user Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(userDetails)) {
                logger.info('No user Found', 'toDoListController:getAllLists')
                let apiResponse = response.generate(true, 'No user found', 202, null)
                res.send(apiResponse)
            } else {
                if (req.params.userId !== userDetails.userId && check.isEmpty(userDetails.friends.find(user => user.id === req.params.userId))) {
                    let apiResponse = response.generate(true, 'Only user or his friends can perform this action', 202, null)
                    res.send(apiResponse)
                } else {
                    ToDoListModel.find({ userId: req.params.userId })
                        .select('-__v -_id')
                        .lean()
                        .exec((err, result) => {
                            if (err) {
                                logger.error(err.message, 'toDoListController: getAllLists', 10)
                                let apiResponse = response.generate(true, 'Failed To Find list Details', 500, null)
                                res.send(apiResponse)
                            } else if (check.isEmpty(result)) {
                                logger.info('No list Found', 'toDoListController: getAllLists')
                                let apiResponse = response.generate(true, 'No list Found', 202, null)
                                res.send(apiResponse)
                            } else {
                                let apiResponse = response.generate(false, 'list Details Found', 200, result)
                                res.send(apiResponse)
                            }
                        })
                }
            }
        })

}//end get all lists

//delete to-do-list
let deleteToDoList = (req, res) => {
    ToDoListHistoryModel.findOne({ historyId: req.body.listId }, (err, listState) => {
        if (err) {
            logger.error(err.message, 'toDoListController: deleteToDoList', 10)
            let apiResponse = response.generate(true, 'Failed To Find list state', 500, null)
            res.send(apiResponse)

        } else if (check.isEmpty(listState)) {
            let apiResponse = response.generate(true, 'list state is empty', 500, null)
            res.send(apiResponse)

        } else {
            let presentState = listState.present

            ToDoListHistoryModel.update(
                { historyId: req.body.listId },
                { $push: { past: presentState }, $set: { present: undefined } })
                .exec((err, details) => {
                    if (err) {
                        logger.error(err.message, 'toDoListController: deleteToDoList', 10)
                        let apiResponse = response.generate(true, 'Failed To update list state', 500, null)
                        res.send(apiResponse)
                    } else {

                        ToDoListHistoryModel.findOne({ historyId: req.body.listId }, (err, listState) => {
                            if (err) {
                                logger.error(err.message, 'toDoListController: deleteToDoList', 10)
                                let apiResponse = response.generate(true, 'Failed To find list state', 500, null)
                                res.send(apiResponse)
                            } else {

                                ToDoListModel.findOne({ listId: req.body.listId }).exec((err, result) => {
                                    if (err) {
                                        logger.error(err.message, 'toDoListController Controller: deleteToDoList', 10)
                                        let apiResponse = response.generate(true, 'Failed To find list', 500, null)
                                        res.send(apiResponse)
                                    } else if (check.isEmpty(result)) {
                                        logger.info('No list Found', 'toDoListController Controller: deleteToDoList')
                                        let apiResponse = response.generate(true, 'No list Found', 202, null)
                                        res.send(apiResponse)
                                    } else {
                                        ToDoListModel.remove({ listId: req.body.listId }).exec((err, result) => {
                                            if (err) {
                                                logger.error(err.message, 'toDoListController Controller: deleteToDoList', 10)
                                                let apiResponse = response.generate(true, 'Failed To delete meeting', 500, null)
                                                res.send(apiResponse)
                                            } else if (check.isEmpty(result)) {
                                                logger.info('No list Found', 'toDoListController Controller: deleteToDoList')
                                                let apiResponse = response.generate(true, 'No list Found', 202, null)
                                                res.send(apiResponse)
                                            } else {
                                                let details = {
                                                    result: result,
                                                    listState: listState
                                                }
                                                let apiResponse = response.generate(false, 'Deleted the list successfully', 200, details)
                                                res.send(apiResponse)
                                            }
                                        });
                                    }
                                })
                            }
                        })
                    }
                })
        }
    })
}//end delete to-do-list


//to get history
let getHistory = (req, res) => {
    ToDoListHistoryModel.findOne({ historyId: req.params.listId }, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
}

//undo actions
let undoActions = (req, res) => {
    ToDoListHistoryModel.findOne({ historyId: req.params.listId }, (err, listState) => {
        if (err) {
            logger.error(err.message, 'toDoListController: deleteToDoList', 10)
            let apiResponse = response.generate(true, 'Failed To Find list state', 500, null)
            res.send(apiResponse)

        } else if (check.isEmpty(listState)) {
            let apiResponse = response.generate(true, 'list state is empty', 500, null)
            res.send(apiResponse)

        } else {
            //let presentState = listState.present
            let pastState = listState.past

            if (check.isEmpty(pastState)) {
                let apiResponse = response.generate(true, "There are no actions to be undone", 202, null)
                res.send(apiResponse)
            } else {

                let previousState = pastState[pastState.length - 1]
                let newPastState = pastState.slice(0, pastState.length - 1)

                ToDoListHistoryModel.update(
                    { historyId: req.params.listId },
                    { $set: { past: newPastState, present: previousState } })
                    .exec((err, details) => {
                        if (err) {
                            logger.error(err.message, 'toDoListController: deleteToDoList', 10)
                            let apiResponse = response.generate(true, 'Failed To update list state', 500, null)
                            res.send(apiResponse)
                        } else {
                            ToDoListModel.findOne({ listId: req.params.listId })
                                .exec((err, listModelDetails) => {
                                    if (err) {
                                        logger.error(`Error Occured : ${err}`, 'Database', 10)
                                        let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                                        res.send(apiResponse)
                                    } else if (check.isEmpty(listModelDetails)) {
                                        let oldList = new ToDoListModel({
                                            listId: previousState.listId,
                                            userId: previousState.userId,
                                            listName: previousState.listName,
                                            createdBy: previousState.createdBy,
                                            listItems: previousState.listItems
                                        }) // end new toDoList model

                                        oldList.save((err, todoListDetails) => {
                                            if (err) {
                                                logger.error(`Error Occured : ${err}`, 'Database', 10)
                                                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                                                res.send(apiResponse)
                                            } else {
                                                let apiResponse = response.generate(false, 'Acion has been undone', 200, todoListDetails)
                                                res.send(apiResponse)
                                            }
                                        }) // end new list save 
                                    } else {
                                        ToDoListModel.findOneAndUpdate({ listId: req.params.listId },
                                            { $set: { listItems: previousState.listItems } })
                                            .exec((err, details) => {
                                                if (err) {
                                                    logger.error(err.message, 'toDoListController: deleteToDoList', 10)
                                                    let apiResponse = response.generate(true, 'Failed To update list state', 500, null)
                                                    res.send(apiResponse)
                                                } else {
                                                    ToDoListModel.findOne({ listId: req.params.listId })
                                                        .exec((err, listDetails) => {
                                                            if (err) {
                                                                logger.error(err.message, 'toDoListController: deleteToDoList', 10)
                                                                let apiResponse = response.generate(true, 'Failed To find list state', 500, null)
                                                                res.send(apiResponse)
                                                            } else {
                                                                let result = {
                                                                    listState: listState,
                                                                    listDetails: listDetails
                                                                }
                                                                let apiResponse = response.generate(false, "Acion has been undone", 200, result)
                                                                res.send(apiResponse)
                                                            }
                                                        })
                                                }
                                            })
                                    }
                                })

                        }
                    })
            }
        }
    })

}//end undo actions


module.exports = {
    createToDoList: createToDoList,
    addItemToList: addItemToList,
    editItem: editItem,
    deleteItem: deleteItem,
    changeStatusOfItem: changeStatusOfItem,
    getAllLists: getAllLists,
    deleteToDoList: deleteToDoList,
    getHistory: getHistory,
    undoActions: undoActions
}