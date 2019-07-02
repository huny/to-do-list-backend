/**
 * modules dependencies.
 */
const socketio = require('socket.io');
const mongoose = require('mongoose');
const shortid = require('shortid');
const logger = require('./loggerLib.js');
const events = require('events');
const eventEmitter = new events.EventEmitter();
const nodemailer = require('nodemailer')
const UserModel = mongoose.model('User')
const FriendRequestModel = mongoose.model('FriendRequest')
const ToDoListModel = mongoose.model('ToDoList')

const tokenLib = require("./tokenLib.js");
const check = require("./checkLib.js");
const response = require('./responseLib')
const time = require('./timeLib')
const stateManagement = require('./stateManagementLib')

let setServer = (server) => {

    let allOnlineUsers = []

    let io = socketio.listen(server);

    let myIo = io.of('')

    myIo.on('connection', (socket) => {

        console.log("on connection--emitting verify user");

        socket.emit("verifyUser", "");

        // code to verify the user and make him online

        socket.on('set-user', (authToken) => {

            console.log("set-user called")
            console.log(authToken)
            tokenLib.verifyClaimWithoutSecret(authToken, (err, user) => {
                if (err) {
                    socket.emit('auth-error', { status: 500, error: 'Please provide correct auth token' })
                }
                else {

                    console.log("user is verified..setting details");
                    let currentUser = user.data;
                    // setting socket user id 
                    socket.userId = currentUser.userId
                    let fullName = `${currentUser.firstName} ${currentUser.lastName}`

                    let userObj = { userId: currentUser.userId, fullName: fullName }
                    allOnlineUsers.push(userObj)
                    console.log(allOnlineUsers)

                    // setting room name
                    //socket.room = 'myRoom'
                    // joining chat-group room.
                    //socket.join(socket.room)
                    //socket.to(socket.room).broadcast.emit('online-user-list', allOnlineUsers);

                }
            })//end verify claim witout secret
        })//end of listening set user event

        socket.on('disconnect', () => {
            // disconnect the user from socket
            // remove the user from online list
            // unsubscribe the user from his own channel

            console.log("user is disconnected");
            // console.log(socket.connectorName);
            console.log(socket.userId);
            var removeIndex = allOnlineUsers.map(function (user) { return user.userId; }).indexOf(socket.userId);
            allOnlineUsers.splice(removeIndex, 1)
            console.log(allOnlineUsers)

            //socket.to(socket.room).broadcast.emit('online-user-list', allOnlineUsers);
            //socket.leave(socket.room)


        }) // end of listening disconnect event

        socket.on('send-request', (request) => {
            let recipientId = request.recipientId

            console.log('send-request called')
            let userOnlineIndex = allOnlineUsers.map(function (user) { return user.userId; }).indexOf(recipientId)
            console.log(userOnlineIndex)
            console.log(recipientId)
            if (userOnlineIndex >= 0) {
                myIo.emit(`request-recieved-${recipientId}`, request)
            }

            UserModel.findOne({ userId: recipientId }, (err, userDetails) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'socketLib: send-request', 10)
                } else if (check.isEmpty(userDetails)) {
                    logger.info('No user Found with this user id', 'socketLib: send-request')
                } else {
                    // create reusable transporter object using the default SMTP transport
                    let transporter = nodemailer.createTransport({
                        host: 'smtp.gmail.com',
                        port: 587,
                        secure: false,
                        requireTLS: true,
                        auth: {
                            user: 'hunyrandom@gmail.com',
                            pass: process.env.GMAILPW
                        }
                    });

                    let mailOptions = {
                        from: 'hunyrandom@gmail.com', // sender address
                        to: userDetails.email, // list of receivers
                        subject: "To-Do-List planner - New friend request", // Subject line
                        text: `You have a new friend request from ${request.requesterName}\n
                        Please log in to your to-do-list-panner to respond to the request.`
                    }

                    // send mail with defined transport object
                    transporter.sendMail(mailOptions, (err) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'socketLib: send-request', 10)
                        } else {
                            console.log('mail sent successfully')
                        }
                    });
                }

            })//end userModel findone 

        })//end of listening send-request event

        socket.on('accept-request', (request) => {

            console.log('accept-request called')
            let userOnlineIndex = allOnlineUsers.map(function (user) { return user.userId; }).indexOf(request.requesterId)
            console.log(userOnlineIndex)
            if (userOnlineIndex >= 0) {
                myIo.emit(`request-accepted-${request.requesterId}`, request)
            }

            UserModel.findOne({ userId: request.requesterId }, (err, userDetails) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'socketLib: accept-request', 10)
                } else if (check.isEmpty(userDetails)) {
                    logger.info('No user Found with this user id', 'socketLib: accept-request')
                } else {
                    // create reusable transporter object using the default SMTP transport
                    let transporter = nodemailer.createTransport({
                        host: 'smtp.gmail.com',
                        port: 587,
                        secure: false,
                        requireTLS: true,
                        auth: {
                            user: 'hunyrandom@gmail.com',
                            pass: process.env.GMAILPW
                        }
                    });

                    let mailOptions = {
                        from: 'hunyrandom@gmail.com', // sender address
                        to: userDetails.email, // list of receivers
                        subject: "To-Do-List planner - friend request accepted", // Subject line
                        text: `${request.recipientName} has accepted your friend request.`
                    }

                    // send mail with defined transport object
                    transporter.sendMail(mailOptions, (err) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'socketLib: accept-request', 10)
                        } else {
                            console.log('mail sent successfully')
                        }
                    });
                }

            })//end userModel findone 

        })//end of listening accept-request event

        socket.on('cancel-request', (request) => {

            console.log('cancel-request called')
            let userOnlineIndex = allOnlineUsers.map(function (user) { return user.userId; }).indexOf(request.requesterId)
            console.log(userOnlineIndex)
            if (userOnlineIndex >= 0) {
                myIo.emit(`request-cancelled-${request.requesterId}`, request)
            }

            UserModel.findOne({ userId: request.requesterId }, (err, userDetails) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'socketLib: cancel-request', 10)
                } else if (check.isEmpty(userDetails)) {
                    logger.info('No user Found with this user id', 'socketLib: cancel-request')
                } else {
                    // create reusable transporter object using the default SMTP transport
                    let transporter = nodemailer.createTransport({
                        host: 'smtp.gmail.com',
                        port: 587,
                        secure: false,
                        requireTLS: true,
                        auth: {
                            user: 'hunyrandom@gmail.com',
                            pass: process.env.GMAILPW
                        }
                    });

                    let mailOptions = {
                        from: 'hunyrandom@gmail.com', // sender address
                        to: userDetails.email, // list of receivers
                        subject: "To-Do-List planner - friend request rejected", // Subject line
                        text: `${request.recipientName} has rejected your friend request.`
                    }

                    // send mail with defined transport object
                    transporter.sendMail(mailOptions, (err) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'socketLib: cancel-request', 10)
                        } else {
                            console.log('mail sent successfully')
                        }
                    });
                }

            })//end userModel findone 

        })//end of listening cancel-request event

        socket.on('create-to-do-list', (listDetails, userId, modifiedBy) => {
            UserModel.findOne({ userId: userId })
                .select('-password -__v -_id')
                .exec((err, userDetails) => {
                    if (err) {
                        logger.error(err.message, 'socketLib: create-to-do-list', 10)
                    } else if (check.isEmpty(userDetails)) {
                        logger.info('No user Found', 'socketLib: create-to-do-list')
                    } else {

                        for (var user of userDetails.friends) {
                            let userOnlineIndex = allOnlineUsers.map(function (user) { return user.userId; }).indexOf(user.id)
                            if (userOnlineIndex >= 0) {
                                myIo.emit(`to-do-list-created-${user.id}`, listDetails)
                            }
                        }//end for loop

                        let friendsIds = userDetails.friends.map(function (user) { return user.id })
                        console.log(friendsIds)

                        UserModel.find({ userId: { $in: friendsIds } })
                            .select('-password -__v -_id')
                            .lean()
                            .exec((err, userDetails) => {
                                if (err) {
                                    logger.error(err.message, 'socketLib: create-to-do-list', 10)
                                } else if (check.isEmpty(userDetails)) {
                                    logger.info('No user Found', 'socketLib: create-to-do-list')
                                } else {

                                    for (var user of userDetails) {
                                        let transporter = nodemailer.createTransport({
                                            host: 'smtp.gmail.com',
                                            port: 587,
                                            secure: false,
                                            requireTLS: true,
                                            auth: {
                                                user: 'hunyrandom@gmail.com',
                                                pass: process.env.GMAILPW
                                            }
                                        });

                                        let mailOptions = {
                                            from: 'hunyrandom@gmail.com', // sender address
                                            to: user.email, // list of receivers
                                            subject: "To-Do-List planner - new list created", // Subject line
                                            text: `A new list is created by ${modifiedBy}. Log on to My To-Do-list planner for more details.`
                                        }

                                        // send mail with defined transport object
                                        transporter.sendMail(mailOptions, (err) => {
                                            if (err) {
                                                console.log(err)
                                                logger.error(err.message, 'socketLib: cancel-request', 10)
                                            } else {
                                                console.log('mail sent successfully')
                                            }
                                        });
                                    }//end for loop
                                }
                            })//end exec
                    }
                })//end exec

            stateManagement.createToDoListHistory(listDetails, (err, listHistoryDetails) => {
                if (err) {
                    socket.emit('state-management-error', { status: 202, error: 'Some error occured in maintaining state of List' })
                }
                else {
                    console.log(listHistoryDetails)
                }
            })

        })//end listening to create-to-do-list event

        socket.on('add-to-do-item', (details, userId, modifiedBy) => {
            UserModel.findOne({ userId: userId })
                .select('-password -__v -_id')
                .lean()
                .exec((err, userDetails) => {
                    if (err) {
                        logger.error(err.message, 'socketLib: add-to-do-item', 10)
                    } else if (check.isEmpty(userDetails)) {
                        logger.info('No user Found', 'socketLib: add-to-do-item')
                    } else {
                        let result = {
                            listId: details.listDetails.listId,
                            modifiedBy: modifiedBy
                        }
                        for (var user of userDetails.friends) {
                            let userOnlineIndex = allOnlineUsers.map(function (user) { return user.userId; }).indexOf(user.id)
                            if (userOnlineIndex >= 0) {
                                myIo.emit(`to-do-item-added-${user.id}`, result)
                            }
                        }//end for loop

                        let friendsIds = userDetails.friends.map(function (user) { return user.id })

                        UserModel.find({ userId: { $in: friendsIds } })
                            .select('-password -__v -_id')
                            .lean()
                            .exec((err, userDetails) => {
                                if (err) {
                                    logger.error(err.message, 'socketLib: add-to-do-item', 10)
                                } else if (check.isEmpty(userDetails)) {
                                    logger.info('No user Found', 'socketLib: add-to-do-item')
                                } else {
                                    for (var user of userDetails) {
                                        let transporter = nodemailer.createTransport({
                                            host: 'smtp.gmail.com',
                                            port: 587,
                                            secure: false,
                                            requireTLS: true,
                                            auth: {
                                                user: 'hunyrandom@gmail.com',
                                                pass: process.env.GMAILPW
                                            }
                                        });

                                        let mailOptions = {
                                            from: 'hunyrandom@gmail.com', // sender address
                                            to: user.email, // list of receivers
                                            subject: "To-Do-List planner - new to-do-item added", // Subject line
                                            text: `a new to-do-item is added by ${modifiedBy}. Log on to My To-Do-list planner for more details.`
                                        }

                                        // send mail with defined transport object
                                        transporter.sendMail(mailOptions, (err) => {
                                            if (err) {
                                                console.log(err)
                                                logger.error(err.message, 'socketLib: add-to-do-item', 10)
                                            } else {
                                                console.log('mail sent successfully')
                                            }
                                        });
                                    }//end for loop
                                }
                            })//end exec
                    }
                })//end exec

            stateManagement.updateToDoListHistory(details.listDetails, (err, listHistoryDetails) => {
                if (err) {
                    socket.emit('state-management-error', { status: 202, error: 'Some error occured in maintaining state of List' })
                }
                else {
                    console.log(listHistoryDetails)
                }
            })

        })//end listening to add-to-do-item event

        socket.on('edit-to-do-item', (details, userId, modifiedBy) => {
            UserModel.findOne({ userId: userId })
                .select('-password -__v -_id')
                .lean()
                .exec((err, userDetails) => {
                    if (err) {
                        logger.error(err.message, 'socketLib: edit-to-do-item', 10)
                    } else if (check.isEmpty(userDetails)) {
                        logger.info('No user Found', 'socketLib: edit-to-do-item')
                    } else {
                        let result = {
                            listId: details.listDetails.listId,
                            modifiedBy: modifiedBy
                        }

                        for (var user of userDetails.friends) {
                            let userOnlineIndex = allOnlineUsers.map(function (user) { return user.userId; }).indexOf(user.id)
                            if (userOnlineIndex >= 0) {
                                myIo.emit(`to-do-item-edited-${user.id}`, result)
                            }
                        }//end for loop

                        let friendsIds = userDetails.friends.map(function (user) { return user.id })

                        UserModel.find({ userId: { $in: friendsIds } })
                            .select('-password -__v -_id')
                            .lean()
                            .exec((err, userDetails) => {
                                if (err) {
                                    logger.error(err.message, 'socketLib: edit-to-do-item', 10)
                                } else if (check.isEmpty(userDetails)) {
                                    logger.info('No user Found', 'socketLib: edit-to-do-item')
                                } else {
                                    for (var user of userDetails) {
                                        let transporter = nodemailer.createTransport({
                                            host: 'smtp.gmail.com',
                                            port: 587,
                                            secure: false,
                                            requireTLS: true,
                                            auth: {
                                                user: 'hunyrandom@gmail.com',
                                                pass: process.env.GMAILPW
                                            }
                                        });

                                        let mailOptions = {
                                            from: 'hunyrandom@gmail.com', // sender address
                                            to: user.email, // list of receivers
                                            subject: "To-Do-List planner - to-do-item edited", // Subject line
                                            text: `A to-do-item is edited by ${modifiedBy}. Log on to My To-Do-list planner for more details.`
                                        }

                                        // send mail with defined transport object
                                        transporter.sendMail(mailOptions, (err) => {
                                            if (err) {
                                                console.log(err)
                                                logger.error(err.message, 'socketLib: edit-to-do-item', 10)
                                            } else {
                                                console.log('mail sent successfully')
                                            }
                                        });
                                    }//end for loop
                                }
                            })//end exec
                    }
                })//end exec

            stateManagement.updateToDoListHistory(details.listDetails, (err, listHistoryDetails) => {
                if (err) {
                    socket.emit('state-management-error', { status: 202, error: 'Some error occured in maintaining state of List' })
                }
                else {
                    console.log(listHistoryDetails)
                }
            })

        })//end listening to edit-to-do-item event

        socket.on('delete-to-do-item', (details, userId, modifiedBy) => {
            UserModel.findOne({ userId: userId })
                .select('-password -__v -_id')
                .lean()
                .exec((err, userDetails) => {
                    if (err) {
                        logger.error(err.message, 'socketLib: delete-to-do-item', 10)
                    } else if (check.isEmpty(userDetails)) {
                        logger.info('No user Found', 'socketLib: delete-to-do-item')
                    } else {
                        let result = {
                            listId: details.listDetails.listId,
                            modifiedBy: modifiedBy
                        }

                        for (var user of userDetails.friends) {
                            let userOnlineIndex = allOnlineUsers.map(function (user) { return user.userId; }).indexOf(user.id)
                            if (userOnlineIndex >= 0) {
                                myIo.emit(`to-do-item-deleted-${user.id}`, result)
                            }
                        }//end for loop

                        let friendsIds = userDetails.friends.map(function (user) { return user.id })

                        UserModel.find({ userId: { $in: friendsIds } })
                            .select('-password -__v -_id')
                            .lean()
                            .exec((err, userDetails) => {
                                if (err) {
                                    logger.error(err.message, 'socketLib: delete-to-do-item', 10)
                                } else if (check.isEmpty(userDetails)) {
                                    logger.info('No user Found', 'socketLib: delete-to-do-item')
                                } else {
                                    for (var user of userDetails) {
                                        let transporter = nodemailer.createTransport({
                                            host: 'smtp.gmail.com',
                                            port: 587,
                                            secure: false,
                                            requireTLS: true,
                                            auth: {
                                                user: 'hunyrandom@gmail.com',
                                                pass: process.env.GMAILPW
                                            }
                                        });

                                        let mailOptions = {
                                            from: 'hunyrandom@gmail.com', // sender address
                                            to: user.email, // list of receivers
                                            subject: "To-Do-List planner - to-do-item deleted", // Subject line
                                            text: `A to-do-item is deleted by ${modifiedBy}. Log on to My To-Do-list planner for more details.`
                                        }

                                        // send mail with defined transport object
                                        transporter.sendMail(mailOptions, (err) => {
                                            if (err) {
                                                console.log(err)
                                                logger.error(err.message, 'socketLib: delete-to-do-item', 10)
                                            } else {
                                                console.log('mail sent successfully')
                                            }
                                        });
                                    }//end for loop
                                }
                            })//end exec
                    }
                })//end exec

            stateManagement.updateToDoListHistory(details.listDetails, (err, listHistoryDetails) => {
                if (err) {
                    socket.emit('state-management-error', { status: 202, error: 'Some error occured in maintaining state of List' })
                }
                else {
                    console.log(listHistoryDetails)
                }
            })

        })//end listening to delete-to-do-item event

        socket.on('change-status-of-item', (details, userId, modifiedBy) => {
            UserModel.findOne({ userId: userId })
                .select('-password -__v -_id')
                .lean()
                .exec((err, userDetails) => {
                    if (err) {
                        logger.error(err.message, 'socketLib: change-status-of-item', 10)
                    } else if (check.isEmpty(userDetails)) {
                        logger.info('No user Found', 'socketLib: change-status-of-item')
                    } else {
                        let result = {
                            listId: details.listDetails.listId,
                            modifiedBy: modifiedBy
                        }

                        for (var user of userDetails.friends) {
                            let userOnlineIndex = allOnlineUsers.map(function (user) { return user.userId; }).indexOf(user.id)
                            if (userOnlineIndex >= 0) {
                                myIo.emit(`item-status-changed-${user.id}`, result)
                            }
                        }//end for loop

                        let friendsIds = userDetails.friends.map(function (user) { return user.id })

                        UserModel.find({ userId: { $in: friendsIds } })
                            .select('-password -__v -_id')
                            .lean()
                            .exec((err, userDetails) => {
                                if (err) {
                                    logger.error(err.message, 'socketLib: change-status-of-item', 10)
                                } else if (check.isEmpty(userDetails)) {
                                    logger.info('No user Found', 'socketLib: change-status-of-item')
                                } else {
                                    for (var user of userDetails) {
                                        let transporter = nodemailer.createTransport({
                                            host: 'smtp.gmail.com',
                                            port: 587,
                                            secure: false,
                                            requireTLS: true,
                                            auth: {
                                                user: 'hunyrandom@gmail.com',
                                                pass: process.env.GMAILPW
                                            }
                                        });

                                        let mailOptions = {
                                            from: 'hunyrandom@gmail.com', // sender address
                                            to: user.email, // list of receivers
                                            subject: "To-Do-List planner - item status changed", // Subject line
                                            text: `A to-do-item status is changed by ${modifiedBy}. Log on to My To-Do-list planner for more details.`
                                        }

                                        // send mail with defined transport object
                                        transporter.sendMail(mailOptions, (err) => {
                                            if (err) {
                                                console.log(err)
                                                logger.error(err.message, 'socketLib: change-status-of-item', 10)
                                            } else {
                                                console.log('mail sent successfully')
                                            }
                                        });
                                    }//end for loop
                                }
                            })//end exec
                    }
                })//end exec

            stateManagement.updateToDoListHistory(details.listDetails, (err, listHistoryDetails) => {
                if (err) {
                    socket.emit('state-management-error', { status: 202, error: 'Some error occured in maintaining state of List' })
                }
                else {
                    console.log(listHistoryDetails)
                }
            })

        })//end listening to change-status-of-item event

        socket.on('delete-to-do-list', (details) => {
            UserModel.findOne({ userId: details.userId })
                .select('-password -__v -_id')
                .lean()
                .exec((err, userDetails) => {
                    if (err) {
                        logger.error(err.message, 'socketLib: delete-to-do-list', 10)
                    } else if (check.isEmpty(userDetails)) {
                        logger.info('No user Found', 'socketLib: delete-to-do-list')
                    } else {

                        for (var user of userDetails.friends) {
                            let userOnlineIndex = allOnlineUsers.map(function (user) { return user.userId; }).indexOf(user.id)
                            if (userOnlineIndex >= 0) {
                                myIo.emit(`to-do-list-deleted-${user.id}`, details)
                            }
                        }//end for loop

                        let friendsIds = userDetails.friends.map(function (user) { return user.id })

                        UserModel.find({ userId: { $in: friendsIds } })
                            .select('-password -__v -_id')
                            .lean()
                            .exec((err, userDetails) => {
                                if (err) {
                                    logger.error(err.message, 'socketLib: delete-to-do-list', 10)
                                } else if (check.isEmpty(userDetails)) {
                                    logger.info('No user Found', 'socketLib: delete-to-do-list')
                                } else {
                                    for (var user of userDetails) {
                                        let transporter = nodemailer.createTransport({
                                            host: 'smtp.gmail.com',
                                            port: 587,
                                            secure: false,
                                            requireTLS: true,
                                            auth: {
                                                user: 'hunyrandom@gmail.com',
                                                pass: process.env.GMAILPW
                                            }
                                        });

                                        let mailOptions = {
                                            from: 'hunyrandom@gmail.com', // sender address
                                            to: user.email, // list of receivers
                                            subject: "To-Do-List planner - to-do-list-deleted", // Subject line
                                            text: `A to-do-list is deleted by ${details.modifiedBy}. Log on to My To-Do-list planner for more details.`
                                        }

                                        // send mail with defined transport object
                                        transporter.sendMail(mailOptions, (err) => {
                                            if (err) {
                                                console.log(err)
                                                logger.error(err.message, 'socketLib: delete-to-do-list', 10)
                                            } else {
                                                console.log('mail sent successfully')
                                            }
                                        });
                                    }//end for loop
                                }
                            })//end exec
                    }
                })//end exec

        })//end listening to delete-to-do-list event

        socket.on('undo-action', (details) => {
            UserModel.findOne({ userId: details.userId })
                .select('-password -__v -_id')
                .lean()
                .exec((err, userDetails) => {
                    if (err) {
                        logger.error(err.message, 'socketLib: undo-action', 10)
                    } else if (check.isEmpty(userDetails)) {
                        logger.info('No user Found', 'socketLib: undo-action')
                    } else {

                        for (var user of userDetails.friends) {
                            let userOnlineIndex = allOnlineUsers.map(function (user) { return user.userId; }).indexOf(user.id)
                            if (userOnlineIndex >= 0) {
                                myIo.emit(`action-undone-${user.id}`, details)
                            }
                        }//end for loop

                        let friendsIds = userDetails.friends.map(function (user) { return user.id })

                        UserModel.find({ userId: { $in: friendsIds } })
                            .select('-password -__v -_id')
                            .lean()
                            .exec((err, userDetails) => {
                                if (err) {
                                    logger.error(err.message, 'socketLib: undo-action', 10)
                                } else if (check.isEmpty(userDetails)) {
                                    logger.info('No user Found', 'socketLib: undo-action')
                                } else {
                                    for (var user of userDetails) {
                                        let transporter = nodemailer.createTransport({
                                            host: 'smtp.gmail.com',
                                            port: 587,
                                            secure: false,
                                            requireTLS: true,
                                            auth: {
                                                user: 'hunyrandom@gmail.com',
                                                pass: process.env.GMAILPW
                                            }
                                        });

                                        let mailOptions = {
                                            from: 'hunyrandom@gmail.com', // sender address
                                            to: user.email, // list of receivers
                                            subject: "To-Do-List planner - Some action undone", // Subject line
                                            text: `Some action has been undone by ${details.modifiedBy}. Log on to My To-Do-list planner for more details.`
                                        }

                                        // send mail with defined transport object
                                        transporter.sendMail(mailOptions, (err) => {
                                            if (err) {
                                                console.log(err)
                                                logger.error(err.message, 'socketLib: undo-action', 10)
                                            } else {
                                                console.log('mail sent successfully')
                                            }
                                        });
                                    }//end for loop
                                }
                            })//end exec
                    }
                })//end exec

        })


    })
}


module.exports = {
    setServer: setServer
}
