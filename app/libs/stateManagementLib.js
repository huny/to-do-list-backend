const mongoose = require('mongoose');
const logger = require('./loggerLib');
const check = require('./checkLib')

/* Models */
const ToDoListModel = mongoose.model('ToDoList')
const ToDoListHistoryModel = mongoose.model('ToDoListHistory')

let createToDoListHistory = (listDetails, cb) => {
    let historyId = listDetails.listId;

    let listHistory = new ToDoListHistoryModel({
        historyId: historyId,
        present: listDetails
    })

    listHistory.save((err, listHistoryDetails) => {
        if (err) {
            logger.error(`Error Occured : ${err}`, 'Database', 10)
            cb(err, null)
        } else {
            cb(null, listHistoryDetails)
        }
    }) // end new list save

}//end createToDoListHistory

let updateToDoListHistory = (listDetails, cb) => {

    ToDoListHistoryModel.findOne({ historyId: listDetails.listId }, (err, listState) => {
        if (err) {
            logger.error(`Error Occured : ${err}`, 'Database', 10)
            cb(err, null)
        } else if (check.isEmpty(listState)) {
            cb('list state not found', null)
        } else {
            let present = listState.present

            ToDoListHistoryModel.update(
                { historyId: listDetails.listId },
                { $push: { past: present }, $set: { present: listDetails } })
                .exec((err, listState) => {
                    if (err) {
                        cb(err, null)
                    } else {
                        ToDoListHistoryModel.findOne({ historyId: listDetails.listId }, (err, listState) => {
                            if (err) {
                                logger.error(`Error Occured : ${err}`, 'Database', 10)
                                cb(err, null)
                            } else {
                                cb(null, listState)
                            }
                        })
                    }
                })
        }
    })

}//end updateToDoListHistory


module.exports = {
    createToDoListHistory: createToDoListHistory,
    updateToDoListHistory: updateToDoListHistory
}