import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

class Questions extends React.Component {

    
    state = {
        answers: [],
        chosenQuestion: null,
        data: {
            labels: [],
            datasets: [{
                label: "Current Results",
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1
            }]
        },
       
       
        options: {
            scales: {
                xAxes: [{
                    stacked: true
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        }
    }

    componentDidMount() {
        this.possibleAnswers();
    }

    possibleAnswers = () => {
        let answers = Object.keys(this.state.questions || {});
        answers.shift();
        this.setState({ answers: answers })
    }

    randomColor = () => {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 12)];
        }
        return color; 
      }

    addChartData = (labels, data) => {
        let questions = this.props.questions || [];
        let question = questions.filter(question => question.q === this.state.chosenQuestion)[0];
        if (!question) {
            return;
        }
        let choices = Object.keys(question).map(key =>  question[key]);
        let colors = Object.keys(question).map(key => this.randomColor());
        choices.shift();

        this.setState({
            
    
            data:
            {
                
                labels: choices,
                datasets: [
                    {
                        label: `Current Results`,
                        data: data,
                        backgroundColor: colors
                    }]
            }
        }
        );
    }
    

    sendAnswer = (choice) => {
        if (!this.props.socket) {
            return;
        }
        this.props.socket.emit('questionAnswered', {
            q: this.state.chosenQuestion,
            choice: choice
        },
        (graphOutput) => {
            this.addChartData(graphOutput.graphLabels, graphOutput.graphValues);
        });
    }

    addChoices = (question, index) => {
        if (this.state.selection !== index) {
            return null;
        }

        let choices = Object.keys(question).map(key => [key, question[key]]);
        choices.shift();

        return choices.map((choice) => (
            <button
                key={choice[0]}
                id={choice[0]}
                onClick={() => this.sendAnswer(choice[0])}
                className="btn btn-dark btn-large"
            >
                {choice[1]}
            </button>
        ));
    }


    selectChoice = (choice, index) => event => {
        event.preventDefault();
        this.setState({
            selection: index,
            chosenQuestion: choice.q

        })
       
    }

    

    addQuestion = (question, index) => {
        return (
            <div className="btn-group-vertical">
                <form action="javascript:void(0)" id="form" onSubmit={this.selectChoice(question, index)}>
                    <button id="survey" className="btn btn-spacing btn-primary">{question.q}</button>
                    <div className="btn-group-vertical">
                        {this.addChoices(question, index)}
                    </div>
                </form>
            </div>
        );
    };



    render() {
        // console.log(this.state)
        // console.log(this.state.chosenQuestion)
        const questions = this.props.questions || [];

        return (
            <div>
            <div id="questions" className="row">

                {
                    questions.map(this.addQuestion)
                }

            </div>
            <Bar data={this.state.data} options={this.state.options} />
                </div>
        )
    }

}

export default Questions;