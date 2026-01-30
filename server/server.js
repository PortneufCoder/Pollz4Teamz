const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8083;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let connectedUsers = []; // This array will store the list of connected team members.
let clientAnswers = [{
    "q": "What can we do to improve your job satisfaction?",
    "a": 0,
    "b": 0,
    "c": 0,
    "d": 0
},
{
    "q": "How would you describe your preferred boss?",
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
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

const getStatistics = (answers) => {
    const pickedAnswers = Object.keys(answers).map((key) => [key, answers[key]]);
    pickedAnswers.shift();

    const graphLabels = [];
    const graphValues = [];

    for (let i = 0; i < pickedAnswers.length; i++) {
        const key = pickedAnswers[i][0];
        const value = pickedAnswers[i][1];
        graphLabels.push(key);
        graphValues.push(value);
    }

    return { graphLabels: graphLabels, graphValues: graphValues };
};

io.on('connection', (socket) => {
    connectedUsers.push(socket.id);
    socket.emit('welcome', { title: pageTitle, users: connectedUsers, questions: questions });

    console.log(questions);
    console.log(connectedUsers);
    console.log(`Connected:`, connectedUsers.length);

    socket.on('questionAnswered', (answer, response) => {
        console.log(answer);
        for (let i = 0; i < clientAnswers.length; i++) {
            if (clientAnswers[i].q !== answer.q) {
                continue;
            }
            const answers = clientAnswers[i];
            answers[answer.choice]++;
            console.log(answers.q + " = " + answers[answer.choice]);

            const statistics = getStatistics(answers);
            response(statistics);
            return;
        }
    });

    socket.on('disconnect', () => {
        connectedUsers = connectedUsers.filter((id) => id !== socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`server alive on ${PORT}`);
});



