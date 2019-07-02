const mongoose = require('mongoose')
const Schema = mongoose.Schema

let listItemsSchema = new Schema();

listItemsSchema.add({
    parentId: {
        type: String,
        default: ''
    },
    itemId: {
        type: String,
        default: ''
    },
    itemName: {
        type: String,
        default: ''
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    lastModifiedBy: {
        type: String,
        default: ''
    }
})


let toDoListSchema = new Schema({
    userId: {
        type: String,
        default: ''
    },
    listId: {
        type: String,
        default: '',
        index: true,
        unique: true
    },
    listName: {
        type: String,
        default: ''
    },
    createdBy: {
        type: String,
        default: ''
    },
    listItems: {
        type: [listItemsSchema]
    }
})


mongoose.model('ToDoList', toDoListSchema)