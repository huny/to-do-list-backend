const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ToDoListModel = require('./../models/ToDoList')
//const ToDoListModel = mongoose.model('ToDoList')

let toDoListHistorySchema = new Schema({
    historyId: {
        type: String,
        default: ''
    },
    past: {
        type: [ToDoListModel],
        default: []
    },
    present: {
        type: ToDoListModel
    }
})


mongoose.model('ToDoListHistory', toDoListHistorySchema)


