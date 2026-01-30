import React from 'react';

class Manager extends React.Component {

    // start = (ref) => {
    //   let pollPerson = this.refs.title.value
    //   alert(`Awesome Poll!`)
    //   this.props.emit('start', { name: pollPerson})
    //   // When a manager registers, I want to send the name back to the server.
    // }

    render () {
        return (

            <div>
                <h1 className="employee">Employee: {this.props.status}</h1>
           
            
            </div>
        )
    }
}

export default Manager;