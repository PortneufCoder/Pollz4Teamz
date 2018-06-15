import React from 'react';
import { Link } from 'react-router';

class Questions extends React.Component {

    // ask = () => {
    //     this.props.emit('ask', question)
    // }
    state = {
        questions: [],
        answers: [],
        chosenQuestion: null
    }

    componentWillMount() {
        this.possibleAnswers()

    }

    possibleAnswers = () => {
        let answers = Object.keys(this.state.questions);
        answers.shift();
        this.setState({ answers: answers })
    }

    addChartData = (labels, data) => {
        this.setState({
            
    
            chart: {
                type: 'bar',
                // The type of chart we want to create
    
    
                // The data for our dataset
                data: {
                    labels: labels,
                    datasets: [{
                        label: "My First dataset",
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        layout: { padding: { top: 25, bottom: 75, left: 75, right: 75 } },
                        data: data
                    }]
                }
    
    
            }
    
        })
    }
    

    sendAnswer = (choice) => {
       console.log(choice)
       console.log('string')
       return;
        this.props.socket.emit('questionAnswered', {
        
            q: this.state.chosenQuestion,
            choice: choice
        })
        this.props.socket.emit('getStatistics', {
        
            q: this.state.chosenQuestion,
            choice: choice
        }, (graphOutput) => {
            this.addChartData(graphOutput.graphLabels, graphOutput.graphValues)   
         })
       
    }

    addChoice = (choice, text) => {
        // console.log(choice)
        // let buttonTypes = ['primary', 'success', 'warning', 'danger']
        return (
            //  <forminput type="radio" name="options" value={choice} />
            
             <button id={choice} onClick={this.sendAnswer(this)} className={`col-xs-12 col-sm-6 btn btn-primary`}> {text} </button>
        )
    }


    selectChoice = (choice, selection) => event => {
        event.preventDefault();
        console.log(selection)
        this.setState({
            selection: selection,
            chosenQuestion: choice.q

        })
       
    }

    possibleAnswersButton = (answer, index) => {
        let buttonTypes = ['primary', 'success', 'warning', 'danger']
        return (
            <button key={index} className={`col-xs-12 col-sm-6 btn btn-${buttonTypes}`}>
                {answer}: {this.answers[answer]}
            </button>
        )
    }

    addQuestion = (question, i) => {

        return (
            <div >
                <form action="javascript:void(0)" id="form" onSubmit={this.selectChoice(question, i)}>

                    <button id="survey" className="btn btn-dark">{question.q} </button>

                    { this.state.selection === i ? 
                         Object.keys(question).filter(key => {
                            let isEqualQ = key !== "q";
                            return isEqualQ;
                        }
                    )
                    .map(key => this.addChoice(key, question[key]))
                    //.map(text => this.addChoice(text))
                    : null }
                    {this.state.questions}

                </form>
            </div>
        );
    };



    render() {
        // console.log(this.state)
        // console.log(this.state.chosenQuestion)

        return (

            <div id="questions" className="row">

                {
                    this.props.questions.map(this.addQuestion)
                }

            </div>

        )
    }

}

export default Questions;