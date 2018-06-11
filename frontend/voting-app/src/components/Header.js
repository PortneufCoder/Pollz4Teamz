import React from 'react';
import HStyle from './HStyle.css';

class Header extends React.Component {

   
       state = {
            status: 'connected'
        }
    

    render() {

        return (
           
            <div className="col-xs-10">
            <h1>{this.props.title}</h1>
           
            </div>
        );

    }
}

export default Header;