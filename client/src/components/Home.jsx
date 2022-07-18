import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router'
import axios from 'axios'
import { useCookies } from "react-cookie";
import './home.css'

const Home = () => {

  let navigate = useNavigate()
  const [cookies] = useCookies(['userId'])
  const [quizzes, setQuizzes] = useState([])

  useEffect(() => {
    if(!cookies.userId) {
      navigate('/auth/register')
    }
    else {
      async function fetchQuizzes() {
        await axios.get(`/quiz/${cookies.userId}`).then(x=>{
          var newQuizzes = x.data
          setQuizzes(newQuizzes)
        }).catch(x=>{
          console.log(x)
        })
      }
      fetchQuizzes()
    }
  }, [])

  const createQuizHandler = ()=>{
    navigate('/create-quiz')
  }
  
  return (
      <div className="row main">
        <div className="col current-quiz">
          <button onClick={()=>createQuizHandler()}>Create new Quiz</button>
        </div>
        <div className="col past-quiz">
          { quizzes.map(x=>{
            return <span key={x._id}>{x.title}</span>
          })}
        </div>
      </div>
  );
};

export default Home;
