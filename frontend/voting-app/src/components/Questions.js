import React from 'react';
import { Link } from 'react-router';

class Questions extends React.Component {

    // ask = () => {
    //     this.props.emit('ask', question)
    // }
    state = {
        questions: [],
        answers: []
    }

    componentWillMount() {
        this.possibleAnswers()

    }

    possibleAnswers = () => {
        let answers = Object.keys(this.state.questions);
        answers.shift();
        this.setState({ answers: answers })
    }

    addChoice = (choice) => {
        console.log(choice)
        // let buttonTypes = ['primary', 'success', 'warning', 'danger']
        return (
            //  <forminput type="radio" name="options" value={choice} />
            
             <button className={`col-xs-12 col-sm-6 btn btn-primary`}>{choice}</button>
        )
    }


    selectChoice = selection => event => {
        event.preventDefault();
        console.log(selection)
        this.setState({
            selection: selection
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
                <form action="javascript:void(0)" id="form" onSubmit={this.selectChoice(i)}>

                    <button id="survey" className="btn btn-dark">{question.q} </button>

                    { this.state.selection === i ? 
                         Object.keys(question).filter(key => {
                        if (key !== "q") {
                            return true
                        } else {
                            return false;
                        }
                    }).map(key => question[key])
                        .map(key => this.addChoice(key))
                    : null }
                    {this.state.questions}

                </form>
            </div>
        );
    };



    render() {
        console.log(this.state)

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