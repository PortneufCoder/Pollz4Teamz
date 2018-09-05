import React from 'react';
const BarChart = require("react-chartjs-2").Bar;

class Questions extends React.Component {

    
    state = {
        questions: [],
        answers: [],
        chosenQuestion: null,
        data: {
            scaleOverride:true,
            scaleStartValue:0, 
            labels: [],
            datasets: [{
                label: "Current Results",
                borderWidth: 1,
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 4,
                data: [],
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

    componentWillMount() {
        this.possibleAnswers()

    }

    possibleAnswers = () => {
        let answers = Object.keys(this.state.questions);
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
        let questions = this.props.questions;
        let question = questions.filter(question => question.q === this.state.chosenQuestion)[0];
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
    
        this.props.socket.emit('questionAnswered', {
        
            q: this.state.chosenQuestion,
            choice: choice
        },
      (graphOutput) => {
            this.addChartData(graphOutput.graphLabels, graphOutput.graphValues)   
         })
       
    }

    addChoices = (question, index) => {
        if(this.state.selection !== index)
        return null;

    let choices = Object.keys(question).map(key => [ key, question[key]]);
    choices.shift();

    choices.forEach(choice => {
        this.state.questions.push(
            <button id={choice[0]} onClick={() => this.sendAnswer(choice[0])} className={` btn btn-dark btn-large`}> {choice[1]} </button>
        )
    });              
    }


    selectChoice = (choice, index) => event => {
        event.preventDefault();
        this.setState({
            selection: index,
            chosenQuestion: choice.q

        })
       
    }

    

    addQuestion = (question, index) => {
        this.state.questions = []
        this.addChoices(question, index);

        return (
            <div class="btn-group-vertical">
                <form action="javascript:void(0)" id="form" onSubmit={this.selectChoice(question, index)}>
                    <button id="survey" className="choice-buttons" className="btn btn-spacing btn-primary">{question.q}</button>
                    <div class="btn-group-vertical">
                        {this.state.questions}
                    </div>
                </form>
            </div>
        );
    };



    render() {
        // console.log(this.state)
        // console.log(this.state.chosenQuestion)

        return (
            <div>
            <div id="questions" className="row">

                {
                    this.props.questions.map(this.addQuestion)
                }

            </div>
            <BarChart data={this.state.data} options={this.state.options} />
                </div>
        )
    }

}

export default Questions;