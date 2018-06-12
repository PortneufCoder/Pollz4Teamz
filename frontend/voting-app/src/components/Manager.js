import React from 'react';

class Manager extends React.Component {

    start = (ref) => {
      let pollPerson = this.refs.title.value
      alert(`Awesome Poll!`)
      this.props.emit('start', { name: pollPerson})
      // When a manager registers, I want to send the name back to the server.
    }

    render () {
        return (

            <div>
                <h1>Manager: {this.props.status}</h1>
                <form action="javascript:void(0)" id="form" onSubmit={this.start}>
           
            <label className="form-name"></label>
            <input className="form-control"
            required
            ref="title"
            placeholder="What is this poll about..."/>
            <button id="register" className="btn btn-primary">Register</button>
           
            </form>
            
            </div>
        )
    }
}

export default Manager;