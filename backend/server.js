const express = require('express');
const app = express();
const PORT = 8083;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static('public'));
app.use(express.static('/node_modules/bootstrap/dist'));

let connectedUsers = []; // This array will store the list of connected team members.
let clientAnswers = [{
    "q": "What can we do to improve your job satisfaction?",
    "a": 0,
    "b": 0,
    "c": 0,
    "d": 0
},
{
    "q": "What type of boss do you prefer?",
    "a": 0,
    "b": 0,
    "c": 0,
    "d": 0
},
{
    "q": `How long have you occupied this role?`,
    "a": 0,
    "b": 0,
    "c": 0,
    "d": 0
}];
let pageTitle = 'Pollz 4 Teamz';
// console.log(pageTitle)
let questions = [{
    "q": "What can we do to improve your job satisfaction?",
    "a": "Increase your salary",
    "b": "Organize more team building activities",
    "c": "Offer more on-the-job training",
    "d": "None of the above"
},
{
    "q": "What type of boss do you prefer?",
    "a": "Strict and bossy",
    "b": "Soft and fuzzy",
    "c": "Rude and threatening",
    "d": "A weird mix of all of that"
},
{
    "q": `How long have you occupied this role?`,
    "a": "5 Years",
    "b": "3 Years",
    "c": "6 Months",
    "d": "You already left!"
}

];
const server = app.listen(PORT, () => {
    console.log(`server alive on ${PORT}`)
});

const io = require('socket.io').listen(server); //socket.io listens at the express server port

io.on('connection', (socket) => {

    socket.once('disconnected', () => {
        connectedUsers.splice(connectedUsers.indexOf(socket), 1);
        //This gives us the index of the current socket and then will remove it.
        // So the disconnected user is no longer part of list?



    })


    connectedUsers.push(socket.id)
    socket.emit('welcome', { title: pageTitle, users: connectedUsers, questions: questions }  // emit is used to send a message to the client

    );



    // When a connection happens on the front-end, I want to add them into my list of arrays.
    console.log(questions)
    console.log(connectedUsers)
    console.log(`Connected:`, connectedUsers.length);
    // console.log(connectedUsers)
 }); // when a socket connection happens,  log the id.

io.on('connection', (socket) => {
    socket.on('questionAnswered', (answer, response) => {
        console.log(answer)
        for (let i = 0; i < clientAnswers.length; i++) {
            if (clientAnswers[i].q !== answer.q) {
                continue;
            }
            let answers = clientAnswers[i]
            answers[answer.choice]++
            console.log(answers.q + " = " + answers[answer.choice])

            let statistics = getStatistics(answers);
            response(statistics);
            return;
           
        }

    });

    getStatistics = (answers) => {
        let pickedAnswers = Object.keys(answers).map(i => [i, answers[i]])
        pickedAnswers.shift()
    
        console.log(pickedAnswers)
    
        let graphLabels = [];
        let graphValues = [];
    
        for (let i = 0; i < pickedAnswers.length; i++) {
            let key = pickedAnswers[i][0];
            let value = pickedAnswers[i][1];
            graphLabels.push(key);
            graphValues.push(value);
        }
    
        return { graphLabels: graphLabels, graphValues: graphValues };
    }
});
    // when a socket connection happens,  log the id.
// });

// io.on('connection', (socket) => {


//     socket.on('getStatistics', (answer, response) => {
//         console.log('statistics')

//         for (let i = 0; i < clientAnswers.length; i++) {
//             if (clientAnswers[i].q !== answer.q) {
//                 continue;
//             }
//             let answers = clientAnswers[i]
//             console.log(answers)
//             let pickedAnswers = Object.keys(answers).map(i => [i, answers[i]])
//             pickedAnswers.shift()



//             let graphLabels = [];
//             let graphValues = [];
//             console.log(pickedAnswers)
//             for (let i = 0; i < pickedAnswers.length; i++) {
//                 let key = pickedAnswers[i][0]
//                 let value = pickedAnswers[i][1]
//                 graphLabels.push(key)
//                 graphValues.push(value)
//             }
//             console.log(graphLabels)
//             console.log(graphValues)

//             response( { graphLabels: graphLabels, graphValues: graphValues }  // emit is used to send a message to the client

//             );
//         }
//     })

//     // when a socket connection happens,  log the id.
// });



