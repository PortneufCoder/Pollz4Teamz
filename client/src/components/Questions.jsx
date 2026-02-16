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

const CHART_COLORS = [
    '#4f8cff',
    '#24b47e',
    '#f59e0b',
    '#ef476f',
    '#06b6d4',
    '#a78bfa'
];

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
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#d8e3ff'
                    }
                },
                title: {
                    display: true,
                    text: 'Current Results',
                    color: '#f4f7ff'
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: '#d8e3ff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    ticks: {
                        color: '#d8e3ff',
                        precision: 0
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
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

    addChartData = (labels, data) => {
        let questions = this.props.questions || [];
        let question = questions.filter(question => question.q === this.state.chosenQuestion)[0];
        if (!question) {
            return;
        }
        let choices = Object.keys(question).map(key => question[key]);
        choices.shift();
        const chartLabels = Array.isArray(labels) && labels.length > 0 ? labels : choices;
        const colors = chartLabels.map((_, index) => CHART_COLORS[index % CHART_COLORS.length]);

        this.setState({


            data:
            {

                labels: chartLabels,
                datasets: [
                    {
                        label: `Current Results`,
                        data: data,
                        backgroundColor: colors,
                        borderRadius: 6,
                        maxBarThickness: 56
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
                type="button"
                onClick={() => this.sendAnswer(choice[0])}
                className="btn btn-outline-light choice-btn"
                aria-label={`Submit answer ${choice[1]} for ${question.q}`}
            >
                {choice[1]}
            </button>
        ));
    }


    selectChoice = (choice, index) => event => {
        event.preventDefault();
        this.setState({
            selection: index,
            chosenQuestion: choice.q,
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'Current Results',
                        data: [],
                        backgroundColor: []
                    }
                ]
            }

        })

    }



    addQuestion = (question, index) => {
        const isSelected = this.state.selection === index;
        const panelId = `choice-panel-${index}`;

        return (
            <div className={`question-item ${isSelected ? 'is-selected' : ''}`} key={`${question.q}-${index}`}>
                <button
                    type="button"
                    className="question-trigger"
                    aria-expanded={isSelected}
                    aria-controls={panelId}
                    aria-pressed={isSelected}
                    onClick={this.selectChoice(question, index)}
                >
                    {question.q}
                </button>
                <div id={panelId} className="choice-list" role="region" aria-label={`Choices for ${question.q}`}>
                    {this.addChoices(question, index)}
                </div>
            </div>
        );
    };



    render() {
        // console.log(this.state)
        // console.log(this.state.chosenQuestion)
        const questions = this.props.questions || [];
        const chartTitle = this.state.chosenQuestion
            ? `Current Results — ${this.state.chosenQuestion}`
            : 'Current Results';
        const chartOptions = {
            ...this.state.options,
            plugins: {
                ...this.state.options.plugins,
                title: {
                    ...this.state.options.plugins.title,
                    text: chartTitle
                }
            }
        };

        return (
            <div>
            <div id="questions" className="question-list">

                {
                    questions.map(this.addQuestion)
                }

                {questions.length === 0 && (
                    <p className="no-questions">No questions are available yet. Waiting for server data…</p>
                )}

            </div>
            <div className="results-wrap mt-3" role="region" aria-label="Live chart results">
                {!this.state.chosenQuestion && (
                    <p className="no-results">Pick a question and submit an answer to see live chart updates.</p>
                )}
                <div className="chart-canvas-wrap">
                    <Bar data={this.state.data} options={chartOptions} />
                </div>
            </div>
                </div>
        )
    }

}

export default Questions;
