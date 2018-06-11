import React from 'react';
import { Link } from 'react-dom';

class Errors extends React.Component {

    render () {
        return (
            // This is the error handling page
            <div>
                <h2>
                <em>
                   Sorry, this page does not exist... 
                </em>
                </h2>
                <p>If you are a Manager, go here:</p>
                <Link to="/Manager">Join the Manager's page</Link>
                <p>Regular Employee? Join here:</p>
                <Link to ="/Team">Enter the team section</Link>
            </div>
        )
    }
}

export default Errors;