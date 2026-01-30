import React from 'react';
import { Display } from './Display.jsx';
import Join from './Join.jsx';

class Team extends React.Component {

    render () {

        return (
            // Experimenting with if's. If the status of team member is connected
            // Show the Join the session
            //If manager name is connected, show a question box...
            <div>
                <Display if={this.props.users === 'connected'} >
                <h1>Join the session</h1>
                </Display>

                <Display if={this.props.manager.name}>
                <p>Questions:</p>

                </Display>
                <Display if={!this.props.manager.name}>
                <h2>Start the polling</h2>
                </Display>



                 <Join emit={this.props.emit}  />



            </div>
        )
    }
}

export default Team;
