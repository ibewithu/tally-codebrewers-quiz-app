import React, { useState } from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';
import './createQuiz.css'

function CreateQuiz() {
  const [cookie] = useCookies(['userId'])
  const [questionList, setquestionList] = useState([]);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endDate, setEndDate] = useState('')
  const [endTime, setEndTime] = useState('')
  const [addingQuestion, setAddingQuestion] = useState(false);
  const [question, setQuestion] = useState("");
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkbox3, setCheckbox3] = useState(false);
  const [checkbox4, setCheckbox4] = useState(false);
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");

  const cancelAdd = (e) => {
    e.preventDefault();
    setQuestion("");
    setCheckbox1(false);
    setCheckbox2(false);
    setCheckbox3(false);
    setCheckbox4(false);
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setAddingQuestion(false);
  };

  const addQuestion = (e) => {
    e.preventDefault();
    setquestionList([
      ...questionList,
      {
        questionText: question,
        options: [
          {
            option: option1,
            correct: checkbox1,
          },
          {
            option: option2,
            correct: checkbox2,
          },
          {
            option: option3,
            correct: checkbox3,
          },
          {
            option: option4,
            correct: checkbox4,
          },
        ],
      }
    ])
    setQuestion("");
    setCheckbox1(false);
    setCheckbox2(false);
    setCheckbox3(false);
    setCheckbox4(false);
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setAddingQuestion(false);
  }

  const scheduleQuiz = async (e) => {
    e.preventDefault()
    await axios.post('/quiz', {title, userId: cookie.userId, startTime: new Date(startDate+" "+startTime), endTime: new Date(endDate+" "+endTime)}).then((d)=>{
      questionList.forEach(async x=>{
        await axios.post('/question', {questionText: x.questionText, options: x.options, quizId: d.data._id}).catch(e=>console.log(e))
      })
    }).catch(e=>console.log(e))
    window.location.replace('/')
  }

  return (<>
    <form className="col quiz-form" onSubmit={scheduleQuiz}>
      <label htmlFor="">Quiz Title:</label>
      <input
        type="text"
        placeholder="enter quiz title"
        className="quiz-title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        ></input>
      <label htmlFor="">Start Date & Time:</label>
      <input
        type="date"
        className="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        required
        ></input>
      <input
        type="time"
        placeholder="enter quiz title"
        className="date"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        required
        ></input>
      <label htmlFor="">End Date & Time:</label>
      <input
        type="date"
        className="date"
        placeholder="enter quiz title"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        required
      ></input>
      <input
        type="time"
        placeholder="enter quiz title"
        className="date"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        required
        ></input>
      {!addingQuestion && (<div className="row">
        <button className="add-button" onClick={() => setAddingQuestion(true)}>
          Add A Question
        </button>
        <button className="quiz-button" type="submit">Schedule Quiz</button>
      </div>)}
    </form>
    <div className="question">
      {addingQuestion && (
        <form
          className="col new-question"
          onSubmit={addQuestion}
          onReset={cancelAdd}
        >
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>
            {`Q${questionList.length + 1}. `}
          </div>
          <label htmlFor="">Question Text:</label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="text_area"
            placeholder={`Enter question no. ${questionList.length + 1}`}
            required
          />
          <ol>
            <li>
              <input
                type="checkbox"
                checked={checkbox1}
                onChange={() => setCheckbox1(!checkbox1)}
              />
              <input
                type="text"
                value={option1}
                onChange={(e) => setOption1(e.target.value)}
                placeholder="Enter option 1"
                required
              />
            </li>
            <li>
              <input
                type="checkbox"
                checked={checkbox2}
                onChange={() => setCheckbox2(!checkbox2)}
              />
              <input
                type="text"
                value={option2}
                onChange={(e) => setOption2(e.target.value)}
                placeholder="Enter option 2"
                required
              />
            </li>
            <li>
              <input
                type="checkbox"
                checked={checkbox3}
                onChange={() => setCheckbox3(!checkbox3)}
              />
              <input
                type="text"
                value={option3}
                onChange={(e) => setOption3(e.target.value)}
                placeholder="Enter option 3"
                required
              />
            </li>
            <li>
              <input
                type="checkbox"
                checked={checkbox4}
                onChange={(e) => setCheckbox4(!checkbox4)}
              />
              <input
                type="text"
                value={option4}
                onChange={(e) => setOption4(e.target.value)}
                placeholder="Enter option 4"
                required
              />
            </li>
          </ol>
          <span>
            <button type="reset" className="cancel-button">Cancel</button>
            <button type="submit" className="add-button">Add</button>
          </span>
        </form>
      )}
    </div>
    <span>All Questions:</span>
    {questionList && questionList.map((x, i) => {
      return (
        <div key={i} className="col each-question">
          <span>Q{i+1}. {x.questionText}</span>
          {x.options.map((x, i)=>{
            return <span className={`options ${x.correct && 'correct'}`}>{i+1}. {x.option}</span>
          })}
        </div>
      );
    })}
  </>);
}

export default CreateQuiz;
