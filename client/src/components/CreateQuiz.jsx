import React from 'react'
import { Button, Intent} from "@blueprintjs/core";
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import style from './styles.module.css'
import Question from './Question';

function CreateQuiz() {

    const [questionList,setquestionList]=React.useState([]);
    const [quizTitle, setQuizTitle] = React.useState('')
    const[id,setId]=React.useState(0);
    const createQuestion=()=>{
        // var key1=id;
        // setId(id=>id+1);
        setquestionList((prev)=>[...prev,{
          quesContent: '',
          checkboxstates: [false, false, false, false],
          options: ['', '', '', '']
        }]);
    }
    const deleteQuestion=(key2)=>{
      let newArray = questionList.splice(key2, 1)
      setquestionList(newArray)
  
        // const updateList=questionList.filter((value)=>{
         
        //     return(value!==key2)
          
           
        // })
        // setquestionList(updateList);
    
    }
 
    setTimeout(() => {
      console.log(questionList)
  }, 2000);   

  return (
    <div className={style.mainDiv}>
      <input type='text' placeholder='enter quiz title' value={quizTitle} onChange={(e)=>setQuizTitle(e.target.value)}></input>
     < Button onClick={createQuestion} intent={Intent.PRIMARY}>Add Questions</Button>
     <div className={style.questlist}>
     {
        // questionList.map((value,id)=>{
           
        //     return (
        //      <div key={value} >

              
                
                // {/* <Button onClick={()=>deleteQuestion(value)}></Button> */}
              //  {/* <Question key1={value} deleteQuestion={deleteQuestion}id={id} /> */}
                // </div>
          //   )
          // })
       
     }
     { questionList.map((x, i)=>{
      return <Question key1={i} key={i} data={x} />
     })}
     </div>
   
   
    </div>
  )
}

export default CreateQuiz