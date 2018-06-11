import React from 'react';



class Display extends React.Component {
    

    render () {
        
        (this.props.if) ?
        <div>{this.props.children}</div> : null;

        return (

            <div>
                
            </div>
        )
    }
}

export default Display;