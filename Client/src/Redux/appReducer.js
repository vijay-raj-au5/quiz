import questions from "../Components/covidQues"
import {combineReducers} from "redux"

let initialState  = { 
    name: "", 
    email: "", 
    answers: [], 
    score: 0
}

 const appReducer = (state = initialState,action) => {
   let stateCopy = {...state}
   
   switch (action.type) {
       case  "submit-user":
           return {...stateCopy,...action.payload}
        case  "submit-answer":
           return {...stateCopy,...action.payload}
 
       default:
         return stateCopy   
   }
}

export const rootReducer = combineReducers({appReducer})


