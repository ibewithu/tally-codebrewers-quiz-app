import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router'
import axios from 'axios'
import { useCookies } from "react-cookie";
import './home.css'

const Home = () => {

  let navigate = useNavigate()
  const [cookies] = useCookies(['userId'])
  const [quizzes, setQuizzes] = useState([])
  const [currentQuizzes, setCurrentQuizzes] = useState([])
  const [pastQuizzes, setPastQuizzes] = useState([])

  useEffect(() => {
    if(!cookies.userId) {
      navigate('/auth/register')
    }
    else {
      async function fetchQuizzes() {
        await axios.get(`/quiz/${cookies.userId}`).then(x=>{
          var newQuizzes = x.data
          setQuizzes(newQuizzes)
          let cq=[]
          let pq=[]
          newQuizzes.forEach(x => {
            if(new Date()<new Date(x.endTime) && new Date()>new Date(x.startTime)) {
              cq.push(x)
            }
            else {
              pq.push(x)
            }
          })
          setCurrentQuizzes(cq)
          setPastQuizzes(pq)
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
      <div className="col">
        <button className="new-quiz-button" onClick={()=>createQuizHandler()}>Create new Quiz</button>
        <div className="col quiz-list">
        current quizzes: 
          {currentQuizzes.map(x=>{
            return <span key={x._id}>{x.title}</span>
          })}
        </div>
      </div>
      <div className="col quiz-list">
        past quizzes: 
        {pastQuizzes.map(x=>{
          return <span key={x._id}>{x.title}</span>
        })}
        </div>
    </div>
  );
};

export default Home;
