import React from 'react';
import { Link } from 'react-router-dom';

export const ErrorsPage = () => {

        return (
            <div className="error-page">
                <h2>
                <em>
                   Sorry, that page does not exist... 
                </em>
                </h2>
                <p>If you are a Manager, go here:</p>
                <Link to="/">Join the Manager's page</Link>
                <p>Regular Employee? Join here:</p>
                <Link to ="/">Enter the team section</Link>
            </div>
            )
}
