// connecting with sockets.
const socket = io('http://localhost:3000');

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IlhUV2l0bUFIZyIsImlhdCI6MTU2MTI5NjE3NjkyNSwiZXhwIjoxNTYxMzgyNTc2LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7ImZyaWVuZHMiOlt7Il9pZCI6IjVkMGU4M2I3YThkMTI3MDBhODNkNDNjZiIsIm5hbWUiOiJIaW1hbnNodSIsImlkIjoiU01VQks0bWp0In1dLCJ1c2VyTmFtZSI6IkNhcHRhaW4iLCJjb3VudHJ5Q29kZSI6Iis5MSIsIm1vYmlsZU51bWJlciI6ODk4ODc3ODg3NywiZW1haWwiOiJjYXB0YWluQGFtZXJpY2EuY29tIiwibGFzdE5hbWUiOiJBbWVyaWNhIiwiZmlyc3ROYW1lIjoiQ2FwdGFpbiIsInVzZXJJZCI6Ik1qU1ZpSFlnMCJ9fQ.V7J887kv6PH5BH6UCcCvrng_-FdvqZQ-tmva49E7SrA"
const userId = "MjSViHYg0"

let chatSocket = () => {

    let request = {
        requesterId: 'SMUBK4mjt',
        recipientId: 'pKLx9sQc1',
        recipientName: 'Hulk',
        status: 1
    }

    let listDetails = {
        listItems: [],
        listName: "YOYO LIST",
        listId: "d6xzjyvA3",
        userId: "SMUBK4mjt",
        createdBy: "Himanshu"
    }

    let userdetails = {
        modifiedBy: 'Himanshu',
        userId: "SMUBK4mjt"
    }


    let details = {
        modifiedBy: 'Himanshu',
        listDetails: listDetails
    }

    socket.on('verifyUser', (data) => {

        console.log("socket trying to verify user");

        socket.emit("set-user", authToken);

        socket.emit('undo-action', userdetails);

        //socket.emit('delete-to-do-list', userdetails);

        //socket.emit('send-request', request);

        //socket.emit('accept-request', request);

        //socket.emit('cancel-request', request);

        //socket.emit('create-to-do-list', listDetails);

        // socket.emit('add-to-do-item', details);

        //  socket.emit('edit-to-do-item', details);

        //  socket.emit('delete-to-do-item', details);

        //  socket.emit('change-status-of-item', details);

    });

    socket.on(`to-do-list-created-${userId}`, (listDetails) => {
        console.log(`a new list is created by ${listDetails.createdBy}`)
    })

    socket.on(`to-do-item-added-${userId}`, (details) => {
        console.log(`a new item is added by ${details.modifiedBy}`)
    })

    socket.on(`to-do-item-edited-${userId}`, (details) => {
        console.log(`a to-do-item is edited by ${details.modifiedBy}`)
    })

    socket.on(`to-do-item-deleted-${userId}`, (details) => {
        console.log(`a to-do-item is deleted by ${details.modifiedBy}`)
    })

    socket.on(`to-do-list-deleted-${userId}`, (details) => {
        console.log(`a to-do-list is deleted by ${details.modifiedBy}`)
    })

    socket.on(`action-undone-${userId}`, (details) => {
        console.log(`a to-do-list is deleted by ${details.modifiedBy}`)
    })

    socket.on(`item-status-changed-${userId}`, (details) => {
        console.log(`a to-do-item status is changed by ${details.modifiedBy}`)
    })


    socket.on('auth-error', (data) => {
        console.log(data.error)
    })

    socket.on(`request-recieved-${userId}`, (request) => {

        console.log("You have a new friend request")
        console.log(request)

    });

    socket.on(`request-accepted-${userId}`, (request) => {

        console.log(`${request.recipientName} has accepted your friend request.`)
        console.log(request)

    });

    socket.on(`request-cancelled-${userId}`, (request) => {
        console.log(`${request.recipientName} has rejected your friend request.`)
        console.log(request)

    });



}// end chat socket function

chatSocket();
