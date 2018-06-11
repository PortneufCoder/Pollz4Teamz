import React from 'react';
import { Link } from 'react-router';
class Join extends React.Component {

   

    form = React.createRef();

   
    join = (ref) => {
        let teamMember = this.refs.name.value
        alert(`Thanks for joining ${teamMember}`)
      
    }

    render () {
       

     
        return (
            <div>
               
            <form action="javascript:void(0)" id="form" onSubmit={this.join}>
            <label className="form-name">Full Name</label>
            <input className="form-control"
            required
            ref="name"
            placeholder="Please enter your name..."/>
            <button className="btn btn-dark">Join</button>
           
            </form>
           
            </div>
        )
    }
}

export default Join;