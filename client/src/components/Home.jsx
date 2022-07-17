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
          let newQuizzes = x.data.map(x=>quizzes.push(x))
          setQuizzes(newQuizzes)
          console.log('upper', quizzes)
        }).catch(x=>{
          console.log(x)
        })
      }
      fetchQuizzes()
    }
  }, [cookies.userId, navigate])
  
  return (
      <div className="row main">
        <div className="col current-quiz">
          
        </div>
        <div className="col past-quiz">
          <div>abcd</div>
          { console.log('lower', quizzes)}
        </div>
      </div>
  );
};

export default Home;
