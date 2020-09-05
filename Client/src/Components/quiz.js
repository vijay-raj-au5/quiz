import React, { Component } from 'react'
import questions from "../Components/Ques"
import axios from "axios";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {handleSubmitAnswers} from '../Action/Action'
class  Question extends Component {
  state = {
    quesNumber : 0,
    answers:new Array(2),
    score :0
    
  }
 
   
  handleNext = () => this.state.quesNumber<1 ? this.setState({quesNumber :this.state.quesNumber+1}) : this.state.quesNumber
 
  
    handlePrev = () => this.state.quesNumber>0 ? this.setState({quesNumber :this.state.quesNumber-1}) : this.state.quesNumber
 
        
  
  handleAnswers = (index) =>{
    const newAnswers = this.state.answers.slice()
    newAnswers[this.state.quesNumber] = index
      this.setState({answers : newAnswers}) 
  
  }

  submitAnswers =  async () => {
     var count = 0
    await questions.forEach((element, index) => {
      element.alternatives.forEach((option, i) => {
        if (i === this.state.answers[index] && option.isCorrect) {
          
          count++
          
        }
      })
    })
    this.setState({ score : count })
    
    this.props.handleSubmitAnswers({answers : this.state.answers,score : this.state.score})
   

    try {
      await axios.put("http://localhost:3001/users", { user: { ...this.props.user,answers : this.state.answers, score : this.state.score } })
  
    } catch (error) {
      console.log(error)
   }    
   this.state.quesNumber<1 ? this.setState({quesNumber :this.state.quesNumber+1}) : this.state.quesNumber
  
  }
  render(){
    
  return (
    
    <div>
      
      <div className=" question bg-light rounded p-3 mt-3 h-auto" >
        <h3 className="mt-3 mb-4 text-primary"> <span className="mr-1">Q{questions[this.state.quesNumber].id}.</span> {questions[this.state.quesNumber].description}</h3>
        <div className="form-group">
          <label htmlFor="">
            {questions[this.state.quesNumber].alternatives.map((el, index) =>
              <div className="form-group">

                <label onClick={() => this.handleAnswers(index)} htmlFor="">
                  <input
                    type="radio"
                    className="mr-3"
                    checked={this.state.answers[this.state.quesNumber] === index} />
                  {` ${String.fromCharCode(97 + index)}) `}

                  {el.text}
                </label>
              </div>
            )}

          </label>
        </div>
        <div className="row shadow">

        <button className="btn  btn-info mr-3 btn-lg fa fa-backward" onClick={this.handlePrev} >Prev</button>
        <button className="btn btn-info  btn-lg fa fa-forward" onClick={this.handleNext} >Next</button>
        <button className="btn btn-info mr-3 btn-lg offset-5 fa fa-floppy-o" onClick={this.submitAnswers}  >  Submit</button>
      </div>
      </div>
      </div>  
    
  )
}
}
const mapStateToProps = state => {
  return {
    user : state.appReducer
  }
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    handleSubmitAnswers
  },dispatch
    
  );
};


export default connect(mapStateToProps,mapDispatchToProps) (Question)