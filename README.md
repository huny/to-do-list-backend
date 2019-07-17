Project Name – My To-Do-List Planner  
Project Description - This is a Live TODO List management system. It has all the features mentioned below. There are two separate parts of the application. A Frontend developed and deployed using the technologies mentioned below and a REST API (with real-time functionalities) created using the technologies mentioned below.

Frontend Technologies used - HTML5, CSS3, JS, Bootstrap and Angular Backend Technologies used - NodeJS, ExpressJS and Socket.IO Database used - MongoDB

Features of the Application -

User management System : a) Signup - User can sign up on the platform providing all details like FirstName, LastName, Email and Mobile number with Country code. b) Login - user can login into the system using the credentials provided at signup. c) Forgot password - User can reset their password by clicking on Forgot Password. This will send them a link on their registered e-mail id from where they can reset the password.

To do list management (single user): a) Once user logs into the system, he can see all his to-do-lists with an option to create a new ToDo List. b) User can create a new empty list, by clicking on “Create New List” button.
c) User can see two icon buttons on the list. User can add an item to the list by clicking on Add icon on the list and can delete the entire list by clicking on delete icon on the list. d) When user clicks on Add icon, a new modal popup opens which asks the user for new item name. User can enter the name of the item and click on “Add Item”. It will add the item with that name to the list and user can see it under the list with a button called “View Details”. e) When user clicks on View Details button, it will open a new popup showing the details of the item which include Item name, Item state, an input box for updating the item and four icon buttons.
f) From the Item details popup, User can do the following tasks with the help of four icon buttons respectively: (i) User can mark an item as "done" or "open" (ii) User can add sub-to-do-items, as child of any item node, such that, complete list take a tree shape, with items and their child items. (iii)User can update the item name. (iv)User can delete the item from the list.

Friend List: a) User can send friend requests, to the users on the system. Once requests are accepted, the friend is added in user's friend list. Friends are notified, in real time using notifications. b) When user logs on to the system, they can see three links on the left panel namely “People you may know”, “Friend Requests”, and “Your Friends”. c) User can send friend request to any user he can see under “People you may know” section. d) User can accept or reject any Friend request he can see under “Friend Request” section. e) User can see his friend list under “Your Friends” section where they can also see a button “View Lists” that can be used to view the to-do-lists of any friend.

To do List management (multi-user): a) Friends can also edit, delete, update list of the user. b) On every action, all friends are notified, in real time, of what specific change is done by which friend. Also the list remain in sync with all friends, at any time, i.e. all actions are reflected in real time.
c) Any friend can undo, any number of actions, done in past. Each undo action, remove the last change, done by any user. So, history of all actions are persisted in database, so as, not to lose actions done in past.
d) Undo action can happen by Undo button on top right of the screen, as well as, through keyboard command, which is "ctrl+z". e) User can go back to his lists by clicking on “My Lists” button on top right of the screen.

Error Views and messages: Each major error response (like 404 or 500) is handled with a different page. Also, all kind of errors, exceptions and messages are handled properly on frontend. The user will be aware all the time on frontend about what is happening in the system.

Note: You can find the solution files at below locations:

To-do-list-frontend: https://github.com/huny/to-do-list-frontend   
To-do-list-backend: https://github.com/huny/to-do-list-backend
