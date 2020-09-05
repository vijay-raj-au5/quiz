import React, { useState, useEffect, Component } from 'react'
import axios from "axios";
import {connect} from 'react-redux'

import questions from "../Components/Ques"
class ScoreBoard extends Component{
  state ={
    list : [],
    answers : []
  }
   getUser = async() =>{
     try{
      let users = await axios.get("http://localhost:3001/users/all")
      this.setState({list : users.data})
     }
    catch(err){
      console.log(err)
    }
   }
   
   getCorrectAnswers = async() =>{
    const newAnswers = []
    await questions.forEach(el => {
         el.alternatives.map((option, index) => {
            if (option.isCorrect) {
              newAnswers.push(index)
            }
          })
        })
      this.setState({answers :newAnswers })
   }
componentDidMount() {
  this.getUser()
  this.getCorrectAnswers()
}
render(){ 
  return (
    <div  >
    
      <h2 style ={{fontWeight:"bolder"}} className="my-4 text-info"  >Score Card</h2>
      <table className="table table-light table-striped rounded ">
        <thead className="thead bg-success text-white">
          <tr>
            <th className="th-raise" >No.</th>
            <th className="th-raise" >Name</th>
            <th className="th-raise" >Email</th>
            <th className="th-raise" >Score</th>
         
          </tr>
        </thead>
        <tbody style={{backgroundColor:"hsla(120,60%,70%,0.3)"}}>
          {
            this.state.list.map((el, index) =>
              <tr>
                <td>{index + 1}</td>
                <td className="text-capitalize" >{el.name}</td>
                <td className="text-capitalize" >{el.email}</td>
                <td>{el.score}</td>
                
              </tr>
            )
          }
        </tbody>
      </table>
      <div style={{backgroundColor:"#20b2aa"}} className=" mb-1 p-3 rounded">
      <h2 style ={{fontWeight:"bolder"}} className="text-white">Total Score : {this.props.user.score}</h2>
     
    </div>
    </div>
  )
}
}
const mapStateToProps = state => {
  return {
    user : state.appReducer
  };
};
export default  connect(mapStateToProps) (ScoreBoard)