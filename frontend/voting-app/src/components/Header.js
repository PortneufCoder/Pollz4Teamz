import React from 'react';
import HStyle from './HStyle.css';

class Header extends React.Component {

   
       state = {
            status: 'connected'
        }
    

    render() {
            // The title here should be coming from the backend.
        return (
           
            <div className="col-xs-10">
            <h1 className="server-title">{this.props.title}</h1>
           
            </div>
        );

    }
}

export default Header;