const mongoose = require('mongoose');
const shortid = require('shortid');
const response = require('../libs/responseLib');
const logger = require('../libs/loggerLib');
const check = require('../libs/checkLib');
const nodemailer = require('nodemailer');

/* Models */
const FrienRequestModel = mongoose.model('FriendRequest')
const UserModel = mongoose.model('User')

//send friend request
let sendFriendRequest = (req, res) => {
    let newRequest = new FrienRequestModel({
        requesterId: req.body.requesterId,
        requesterName: req.body.requesterName,
        recipientId: req.body.recipientId,
        recipientName: req.body.recipientName,
        status: 1 //requested
    })

    newRequest.save((err, newRequest) => {
        if (err) {
            logger.error(err.message, 'userController: createUser', 10)
            let apiResponse = response.generate(true, 'Failed to send friend request', 500, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Friend request sent successfully', 200, newRequest)
            res.send(apiResponse)
        }
    })
}//end send friend request


//get all friend requests of a user
let getAllFriendRequests = (req, res) => {
    FrienRequestModel.find({ recipientId: req.params.userId, status: 1 })
        .select('-__v -_id')
        .exec((err, requestDetails) => {
            if (err) {
                logger.error(err.message, 'FriendRquest Controller: getAllFriendRequests', 10)
                let apiResponse = response.generate(true, 'Failed to find user details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(requestDetails)) {
                logger.info('No request Found', 'FriendRquest Controller: getAllFriendRequests')
                let apiResponse = response.generate(true, 'No user Found', 202, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All requests found', 200, requestDetails)
                res.send(apiResponse)
            }
        })
}//end get all friend requests


//accepet friend request
let acceptFriendRequest = (req, res) => {
    FrienRequestModel.update(
        { recipientId: req.body.userId, requesterId: req.body.requesterId, status: 1 },
        { $set: { status: 2 } }) //2=accepted
        .exec((err, result) => {
            if (err) {
                logger.error(err.message, 'FriendRequest Controller:acceptFriendRequest', 10)
                let apiResponse = response.generate(true, 'Failed To update request', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No list Found', 'FriendRequest Controller: acceptFriendRequest')
                let apiResponse = response.generate(true, 'No request Found', 202, null)
                res.send(apiResponse)
            } else {
                let newFriend = {
                    id: req.body.requesterId,
                    name: req.body.requesterName
                }

                UserModel.update(
                    { userId: req.body.userId },
                    { $push: { friends: newFriend } }).exec((err, result) => {
                        if (err) {
                            logger.error(err.message, 'FriendRequest Controller:acceptFriendRequest', 10)
                            let apiResponse = response.generate(true, 'Failed To update user friend list', 500, null)
                            res.send(apiResponse)
                        } else if (check.isEmpty(result)) {
                            logger.info('No user Found', 'FriendRequest Controller: acceptFriendRequest')
                            let apiResponse = response.generate(true, 'No user Found', 202, null)
                            res.send(apiResponse)
                        } else {

                            let user = {
                                id: req.body.userId,
                                name: req.body.userName
                            }

                            UserModel.update(
                                { userId: req.body.requesterId },
                                { $push: { friends: user } }).exec((err, result) => {
                                    if (err) {
                                        logger.error(err.message, 'FriendRequest Controller:acceptFriendRequest', 10)
                                        let apiResponse = response.generate(true, 'Failed To update user friend list', 500, null)
                                        res.send(apiResponse)
                                    } else if (check.isEmpty(result)) {
                                        logger.info('No user Found', 'FriendRequest Controller: acceptFriendRequest')
                                        let apiResponse = response.generate(true, 'No user Found', 202, null)
                                        res.send(apiResponse)
                                    } else {


                                        FrienRequestModel.findOne(
                                            { recipientId: req.body.userId, requesterId: req.body.requesterId, status: 2 })
                                            .select('-__v -_id')
                                            .exec((err, requestDetails) => {
                                                if (err) {
                                                    logger.error(err.message, 'FriendRequest Controller:acceptFriendRequest', 10)
                                                    let apiResponse = response.generate(true, 'Failed To Find request Details', 500, null)
                                                    res.send(apiResponse)
                                                } else {
                                                    let apiResponse = response.generate(false, 'request Details Found', 200, requestDetails)
                                                    res.send(apiResponse)
                                                }
                                            })
                                    }
                                })
                        }
                    })
            }
        }
        )
}//end accept friend request

//cancel friend request
let cancelFriendRequest = (req, res) => {
    FrienRequestModel.update(
        { recipientId: req.body.userId, requesterId: req.body.requesterId, status: 1 },
        { $set: { status: 3 } }) //3=rejected
        .exec((err, result) => {
            if (err) {
                logger.error(err.message, 'FriendRequest Controller:cancelFriendRequest', 10)
                let apiResponse = response.generate(true, 'Failed To update request', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No list Found', 'FriendRequest Controller: cancelFriendRequest')
                let apiResponse = response.generate(true, 'No request Found', 202, null)
                res.send(apiResponse)
            } else {
                FrienRequestModel.findOne({ recipientId: req.body.userId, requesterId: req.body.requesterId })
                    .select('-__v -_id')
                    .exec((err, requestDetails) => {
                        if (err) {
                            logger.error(err.message, 'FriendRquest Controller: cancelFriendRequest', 10)
                            let apiResponse = response.generate(true, 'Failed to find user details', 500, null)
                            res.send(apiResponse)
                        } else if (check.isEmpty(requestDetails)) {
                            logger.info('No request Found', 'FriendRquest Controller: cancelFriendRequest')
                            let apiResponse = response.generate(true, 'No user Found', 202, null)
                            res.send(apiResponse)
                        } else {
                            let apiResponse = response.generate(false, 'Friend request rejected', 200, requestDetails)
                            res.send(apiResponse)
                        }
                    })
            }
        })
}

module.exports = {
    sendFriendRequest: sendFriendRequest,
    getAllFriendRequests: getAllFriendRequests,
    acceptFriendRequest: acceptFriendRequest,
    cancelFriendRequest: cancelFriendRequest
}
