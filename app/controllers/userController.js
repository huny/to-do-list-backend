const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib');
const logger = require('./../libs/loggerLib');
const validateInput = require('./../libs/paramsValidationLib');
const check = require('./../libs/checkLib');
const passwordLib = require('./../libs/generatePasswordLib');
const token = require('./../libs/tokenLib');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
//const appConfig = require('./../../config/appConfig');

require('dotenv').config();

/* Models */
const UserModel = mongoose.model('User');
const AuthModel = mongoose.model('Auth');
const FriendRequestModel = mongoose.model('FriendRequest')

//let baseUrl = `${appConfig.apiVersion}/users`;


// start user signup function 
let signUpFunction = (req, res) => {

    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            console.log(req.body.email);
            if (req.body.email) {
                if (!validateInput.Email(req.body.email)) {
                    let apiResponse = response.generate(true, 'Email Does not met the requirement', 400, null)
                    reject(apiResponse)
                } else if (check.isEmpty(req.body.firstName)) {
                    let apiResponse = response.generate(true, 'first name is missing', 400, null)
                    reject(apiResponse)
                } else if (check.isEmpty(req.body.mobileNumber)) {
                    let apiResponse = response.generate(true, 'mobile number is missing"', 400, null)
                    reject(apiResponse)
                } else if (check.isEmpty(req.body.password)) {
                    let apiResponse = response.generate(true, 'password is missing"', 400, null)
                    reject(apiResponse)
                } else {
                    resolve(req)
                }
            } else {
                logger.error('Field Missing During User Creation', 'userController: createUser()', 5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    }// end validate user input
    let createUser = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ email: req.body.email })
                .exec((err, retrievedUserDetails) => {
                    if (err) {
                        logger.error(err.message, 'userController: createUser', 10)
                        let apiResponse = response.generate(true, 'Failed To Create User', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(retrievedUserDetails)) {
                        console.log(req.body)
                        let newUser = new UserModel({
                            userId: shortid.generate(),
                            firstName: req.body.firstName,
                            lastName: req.body.lastName || '',
                            email: req.body.email.toLowerCase(),
                            mobileNumber: req.body.mobileNumber,
                            password: passwordLib.hashpassword(req.body.password),
                            countryCode: req.body.countryCode,
                            createdOn: time.now(),
                            userName: `${req.body.firstName} ${req.body.lastName}`
                        })
                        newUser.save((err, newUser) => {
                            if (err) {
                                console.log(err)
                                logger.error(err.message, 'userController: createUser', 10)
                                let apiResponse = response.generate(true, 'Failed to create new User', 500, null)
                                reject(apiResponse)
                            } else {
                                let newUserObj = newUser.toObject();
                                resolve(newUserObj)
                            }
                        })
                    } else {
                        logger.error('User Cannot Be Created.User Already Present', 'userController: createUser', 4)
                        let apiResponse = response.generate(true, 'User Already Present With this Email', 403, null)
                        reject(apiResponse)
                    }
                })
        })
    }// end create user function


    validateUserInput(req, res)
        .then(createUser)
        .then((resolve) => {
            delete resolve.password
            delete resolve.countryCode
            delete resolve.createdOn
            delete resolve.__v
            delete resolve._id
            let apiResponse = response.generate(false, 'User created', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

}// end user signup function 

// start of login function 
let loginFunction = (req, res) => {

    let findUser = () => {
        console.log("findUser");
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                UserModel.findOne({ email: req.body.email }, (err, userDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error('Failed To Retrieve User Data', 'userController: findUser()', 10)
                        let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(userDetails)) {
                        logger.error('No User Found', 'userController: findUser()', 7)
                        let apiResponse = response.generate(true, 'No User Details Found', 202, null)
                        reject(apiResponse)
                    } else {
                        logger.info('User Found', 'userController: findUser()', 10)
                        resolve(userDetails)
                    }
                });

            } else {
                let apiResponse = response.generate(true, '"email" parameter is missing', 400, null)
                reject(apiResponse)
            }
        })
    }
    let validatePassword = (retrievedUserDetails) => {
        console.log("validatePassword");
        return new Promise((resolve, reject) => {
            passwordLib.comparePassword(req.body.password, retrievedUserDetails.password, (err, isMatch) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'userController: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Login Failed', 202, null)
                    reject(apiResponse)
                } else if (isMatch) {
                    let retrievedUserDetailsObj = retrievedUserDetails.toObject()
                    delete retrievedUserDetailsObj.password
                    delete retrievedUserDetailsObj._id
                    delete retrievedUserDetailsObj.__v
                    delete retrievedUserDetailsObj.createdOn
                    delete retrievedUserDetailsObj.modifiedOn
                    resolve(retrievedUserDetailsObj)
                } else {
                    logger.info('Login Failed Due To Invalid Password', 'userController: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Wrong Password.Login Failed', 202, null)
                    reject(apiResponse)
                }
            })
        })
    }

    let generateToken = (userDetails) => {
        console.log("generate token");
        return new Promise((resolve, reject) => {
            token.generateToken(userDetails, (err, tokenDetails) => {
                if (err) {
                    console.log(err)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else {
                    tokenDetails.userId = userDetails.userId
                    tokenDetails.userDetails = userDetails
                    resolve(tokenDetails)
                }
            })
        })
    }

    let saveToken = (tokenDetails) => {
        console.log("save token");
        return new Promise((resolve, reject) => {
            AuthModel.findOne({ userId: tokenDetails.userId }, (err, retrievedTokenDetails) => {
                if (err) {
                    console.log(err.message, 'userController: saveToken', 10)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(retrievedTokenDetails)) {
                    let newAuthToken = new AuthModel({
                        userId: tokenDetails.userId,
                        authToken: tokenDetails.token,
                        tokenSecret: tokenDetails.tokenSecret,
                        tokenGenerationTime: time.now()
                    })
                    newAuthToken.save((err, newTokenDetails) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                } else {
                    retrievedTokenDetails.authToken = tokenDetails.token
                    retrievedTokenDetails.tokenSecret = tokenDetails.tokenSecret
                    retrievedTokenDetails.tokenGenerationTime = time.now()
                    retrievedTokenDetails.save((err, newTokenDetails) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                }
            })
        })
    }

    findUser(req, res)
        .then(validatePassword)
        .then(generateToken)
        .then(saveToken)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Login Successful', 200, resolve)
            res.status(200)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log("errorhandler");
            console.log(err);
            res.status(err.status)
            res.send(err)
        })


}// end of Login function

//start of logout function
let logout = (req, res) => {
    AuthModel.findOneAndRemove({ userId: req.user.userId }, (err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'user Controller: logout', 10)
            let apiResponse = response.generate(true, `error occurred: ${err.message}`, 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            let apiResponse = response.generate(true, 'Already Logged Out or Invalid UserId', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Logged Out Successfully', 200, null)
            res.send(apiResponse)
        }
    })
} // end of the logout function.

//start of forgotPassword function
let forgotPassword = (req, res) => {
    let findUser = () => {
        console.log("findUser");
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                console.log("req body email is there");
                console.log(req.body);
                UserModel.findOne({ email: req.body.email }, (err, userDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error('Failed To Retrieve User Data', 'userController: findUser()', 10)
                        let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(userDetails)) {
                        logger.error('No User Found', 'userController: findUser()', 7)
                        let apiResponse = response.generate(true, 'No user found with that email address', 202, null)
                        reject(apiResponse)
                    } else {
                        logger.info('User Found', 'userController: findUser()', 10)
                        resolve(userDetails)
                    }
                });

            } else {
                let apiResponse = response.generate(true, '"email" parameter is missing', 400, null)
                reject(apiResponse)
            }
        })
    }

    let generateAndSaveResetPasswordToken = (userDetails) => {
        console.log("generate token");
        return new Promise((resolve, reject) => {
            //token.generateToken(userDetails, (err, tokenDetails) => {
            crypto.randomBytes(20, (err, buf) => {
                if (err) {
                    console.log(err)
                    let apiResponse = response.generate(true, 'Failed to generate password reset token', 500, null)
                    reject(apiResponse)
                } else {
                    let resetPasswordToken = buf.toString('hex');
                    userDetails.resetPasswordToken = resetPasswordToken;
                    userDetails.resetPasswordExpires = Date.now() + 3600000; //1 hour
                    userDetails.save((err, userWithResetPasswordToken) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'userController: createUser', 10)
                            let apiResponse = response.generate(true, 'Failed to save token details', 500, null)
                            reject(apiResponse)
                        } else {
                            let newUserObj = userWithResetPasswordToken.toObject();
                            resolve(newUserObj)
                        }
                    })
                }
            })
        })
    }

    let sendMailToResetPassword = (newUserObj) => {
        console.log("sending mail to user");
        return new Promise((resolve, reject) => {

            // Generate test SMTP service account from ethereal.email
            //let testAccount = nodemailer.createTestAccount();
            //console.log(testAccount)

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
                to: newUserObj.email, // list of receivers
                subject: "To-Do-List Planner Password Reset", // Subject line
                text: `Please click on the following link to reset your password: \n\n 
    http://youwecan.xyz/reset-password/${newUserObj.resetPasswordToken}`
            }


            // send mail with defined transport object
            transporter.sendMail(mailOptions, (err) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'userController: createUser', 10)
                    let apiResponse = response.generate(true, 'Failed to send mail', 202, null)
                    reject(apiResponse)
                } else {
                    resolve(newUserObj.email)
                }
            });

        })
    }

    findUser(req, res)
        .then(generateAndSaveResetPasswordToken)
        .then(sendMailToResetPassword)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Mail sent successfully', 200, resolve)
            res.status(200)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log("errorhandler");
            console.log(err);
            res.status(err.status)
            res.send(err)
        })

}// end forgot password function

//start of goToResetPassword
let goToResetPassword = (req, res) => {
    UserModel.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'user Controller: goToResetPassword', 10)
            let apiResponse = response.generate(true, `error occurred: ${err.message}`, 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(user)) {
            let apiResponse = response.generate(true, 'Password reset token is invalid or expired', 202, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'successsfully validate user', 200, req.params.token)
            res.send(apiResponse)
        }
    })
}//end of goToResetPassword

//start of resetPassword
let resetPassword = (req, res) => {

    UserModel.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'user Controller: resetPassword', 10)
            let apiResponse = response.generate(true, `error occurred: ${err.message}`, 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(user)) {
            let apiResponse = response.generate(true, 'Password reset token is invalid or expired', 202, null)
            res.send(apiResponse)
        } else {
            if (req.body.password === req.body.confirmPassword) {
                user.password = passwordLib.hashpassword(req.body.password)
                user.resetPasswordToken = undefined
                user.resetPasswordExpires = undefined

                user.save((err, userDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'user Controller: resetPassword', 10)
                        let apiResponse = response.generate(true, `error occurred: ${err.message}`, 500, null)
                        res.send(apiResponse)
                    } else {
                        let apiResponse = response.generate(false, 'Pssword reset successfully', 200, userDetails)
                        res.send(apiResponse)
                    }
                })
            } else {
                let apiResponse = response.generate(true, 'Passwords do not match', 202, null)
                res.send(apiResponse)
            }
        }
    })
}//end of resetPassword

//start of getAllUsers
let getAllUsers = (req, res) => {
    UserModel.find()
        .select('-password -__v -_id')
        .lean()
        .exec((err, userDetails) => {
            if (err) {
                logger.error(err.message, 'User Controller: getAllUsers', 10)
                let apiResponse = response.generate(true, 'Failed to find user details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(userDetails)) {
                logger.info('No user Found', 'User Controller: getAllUsers')
                let apiResponse = response.generate(true, 'No request Found', 202, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All user details found', 200, userDetails)
                res.send(apiResponse)
            }
        })
}//end getAllUsers

//start of getAllUsers
let getPeopleYouMayKnow = (req, res) => {

    let sentRequests = []
    let recievedRequests = []
    FriendRequestModel.find({ requesterId: req.params.userId, status: 1 })
        .exec((err, sentRequestDetails) => {
            console.log(sentRequestDetails)
            if (err) {
                logger.error(err.message, 'User Controller: getPeopleYouMayKnow', 10)
                let apiResponse = response.generate(true, 'Failed to find sent requests details', 500, null)
                res.send(apiResponse)
            } else if (!(check.isEmpty(sentRequestDetails))) {
                sentRequests = sentRequestDetails.map(function (request) { return request.recipientId })
            }
        })

    FriendRequestModel.find({ recipientId: req.params.userId, status: 1 })
        .exec((err, recievedRequestDetails) => {
            if (err) {
                logger.error(err.message, 'User Controller: getPeopleYouMayKnow', 10)
                let apiResponse = response.generate(true, 'Failed to find recieved requests details', 500, null)
                res.send(apiResponse)
            } else if (!(check.isEmpty(recievedRequestDetails))) {
                recievedRequests = recievedRequestDetails.map(function (request) { return request.requesterId })
            }
        })

    UserModel.findOne({ userId: req.params.userId })
        .select('-password -__v -_id')
        .lean()
        .exec((err, details) => {
            if (err) {
                logger.error(err.message, 'User Controller: getPeopleYouMayKnow', 10)
                let apiResponse = response.generate(true, 'Failed to find user details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(details)) {
                logger.info('No user Found', 'User Controller: getPeopleYouMayKnow')
                let apiResponse = response.generate(true, 'No request Found', 202, null)
                res.send(apiResponse)
            } else {

                let friendsIds = details.friends.map(function (user) { return user.id; })
                UserModel.find({
                    $and: [
                        { userId: { $ne: req.params.userId } },
                        { userId: { $nin: friendsIds } },
                        { userId: { $nin: sentRequests } },
                        { userId: { $nin: recievedRequests } }
                    ]
                })
                    .select('-password -__v -_id')
                    .lean()
                    .exec((err, userDetails) => {
                        if (err) {
                            logger.error(err.message, 'User Controller: getPeopleYouMayKnow', 10)
                            let apiResponse = response.generate(true, 'Failed to find user details', 500, null)
                            res.send(apiResponse)
                        } else if (check.isEmpty(userDetails)) {
                            logger.info('No user Found', 'User Controller: getPeopleYouMayKnow')
                            let apiResponse = response.generate(true, 'No request Found', 202, null)
                            res.send(apiResponse)
                        } else {
                            let apiResponse = response.generate(false, 'All user details found', 200, userDetails)
                            res.send(apiResponse)
                        }
                    })
            }
        })
}//end getPeopleYouMayKnow


//get user by Id
let getUserById = (req, res) => {
    UserModel.findOne({ userId: req.params.userId })
        .select('-password -__v -_id')
        .lean()
        .exec((err, userDetails) => {
            if (err) {
                logger.error(err.message, 'User Controller: getAllUsers', 10)
                let apiResponse = response.generate(true, 'Failed to find user details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(userDetails)) {
                logger.info('No user Found', 'User Controller: getAllUsers')
                let apiResponse = response.generate(true, 'No user Found', 202, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'User details found', 200, userDetails)
                res.send(apiResponse)
            }
        })
}//end get user by id


module.exports = {

    signUpFunction: signUpFunction,
    loginFunction: loginFunction,
    logout: logout,
    forgotPassword: forgotPassword,
    goToResetPassword: goToResetPassword,
    resetPassword: resetPassword,
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    getPeopleYouMayKnow: getPeopleYouMayKnow

}// end exports