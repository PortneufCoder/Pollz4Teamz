import React from 'react';

class Manager extends React.Component {

    // start = (ref) => {
    //   let pollPerson = this.refs.title.value
    //   alert(`Awesome Poll!`)
    //   this.props.emit('start', { name: pollPerson})
    //   // When a manager registers, I want to send the name back to the server.
    // }

    render () {
        const isConnected = this.props.status === 'connected';

        return (

            <div>
                <p className="employee-status">
                    Employee status:
                    <span className={`status-pill ${isConnected ? 'is-connected' : 'is-disconnected'}`}>
                        {isConnected ? 'Connected' : 'Disconnected'}
                    </span>
                </p>


            </div>
        )
    }
}

export default Manager;
