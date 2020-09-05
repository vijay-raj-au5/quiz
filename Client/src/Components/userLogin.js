import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {handleSubmit} from '../Action/Action'
import { Redirect} from 'react-router-dom'


class User extends Component {
  
   state = {
       name: "",
       email:"",
  }

     handleSubmitUser = (e) =>{
      e.preventDefault()
       let user = {
         name: this.state.name,
         email:this.state.email
       }
       
       this.props.handleSubmit(user)
      
      this.props.history.push("/quiz")
     }
  render() {
    
  return (
      <div className="row mt-5 justify-content-center"  >
          
        <div className="col-4  p-4 rounded transparent" >
          <form onSubmit={this.handleSubmitUser} >

            <div className="form-group ">
              <label className="col mt-5">

        <input className="form-control mt-1" placeholder="Name" type="text" value={this.state.name} onChange={e => this.setState({name : e.target.value})} required />
              </label>
            </div>
            <div className="form-group">
              <label className="col">
                
        <input className="form-control mt-1" placeholder="E mail" type="email" value={this.state.email} onChange={e => this.setState({email : e.target.value})} />
              </label>
            </div>

            <div className="form-group">
              <div className="col">
                <button className="btn btn-success w-100" >Enter</button>

              </div>
            </div>
          </form>
        </div>
      </div>
  
  )
}
}

const mapStateToProps = state => {
  return {
    state : state
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    handleSubmit
  },dispatch
    
  );
};


export default connect(mapStateToProps,mapDispatchToProps) (User)