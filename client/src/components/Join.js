import React from 'react';
import { Link } from 'react-router';
class Join extends React.Component {

    state = {
        fullName: 'Get Registered!',
        status: 'connected'

    }

    nameInput = React.createRef();


    join = (event) => { // This function stores the user's name and prints it on the page, thus identifying them during the session
        event.preventDefault();
        const teamMember = this.nameInput.current?.value || '';
        alert(`Thanks for joining ${teamMember}`)
        this.setState({
            fullName: `${teamMember} is ${this.state.status}!`
        })
    }

    render() {



        return (
            <div>

                <form action="javascript:void(0)" id="form" onSubmit={this.join}>
                    <label id="full-name" className="form-name">{this.state.fullName}</label>
                    <input className="form-control"
                        required
                        ref={this.nameInput}
                        placeholder="Please enter your name..." />
                    <button id="join" className="btn btn-dark">Join</button>

                </form>

            </div>
        )
    }
}

export default Join;