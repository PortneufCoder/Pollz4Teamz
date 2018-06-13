import React from 'react';
import { Link } from 'react-router';
class Join extends React.Component {

    state = {
        fullName: 'Write your name'
    }

    form = React.createRef();


    join = (ref) => { // This function stores the user's name and prints it on the page, thus identifying them during the session
        let teamMember = this.refs.name.value
        alert(`Thanks for joining ${teamMember}`)
        this.setState({
            fullName: teamMember
        })
    }

    render() {



        return (
            <div>

                <form action="javascript:void(0)" id="form" onSubmit={this.join}>
                    <label id="full-name" className="form-name">{this.state.fullName}</label>
                    <input className="form-control"
                        required
                        ref="name"
                        placeholder="Please enter your name..." />
                    <button id="join" className="btn btn-dark">Join</button>

                </form>

            </div>
        )
    }
}

export default Join;