export  const handleSubmit = (data) => {

   return {
       type: "submit-user",
       payload : data
   }
    
   
  }

export const handleSubmitAnswers = (data) =>{
    return {
        type: "submit-answer",
        payload : data
    }
}