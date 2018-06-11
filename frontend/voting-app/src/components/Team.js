import React from 'react';
import Display from './Display.js';
import Join from './Join.js';
import Manager from './Manager.js'
class Team extends React.Component {

    render () {

        return (

            <div>
                <Display if={this.props.status === 'connected'} >
                <h1>Join the session</h1>

                <Display if={this.props.manager.name}> 
                <p>Questions:</p>
                
                </Display>
                <Display if={!this.props.manager.name}>
                <h2>Start the polling</h2>
                </Display>

                </Display>

                 <Join emit={this.props.emit}  />

               

                
            </div>
        )
    }
}

export default Team;