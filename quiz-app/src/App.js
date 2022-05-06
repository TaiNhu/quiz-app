import Quiz from './components/quiz';
import { useState, useEffect, Fragment } from 'react'

function App() {
  const [showQuiz, setShowQuiz] = useState(prev => false);
  const [quiz, setQuiz] = useState(prev => [])
  const [check, setCheck] = useState(prev => true)
  const [isCheckAnswers, setCheckAnswers] = useState(prev => false)
  const [mark, setMark] = useState(prev => 0)

  useEffect(() => {
    fetch("http://localhost:3001/api")
      .then(res => res.json())
      .then(data => {
        setQuiz(data.quizlist.map(v => {
          return {
            ...v,
            choose: ''
          }
        }))
      }
      )
  }, [])


  function handleClick() {
    if (isCheckAnswers) {
      setQuiz(prevQuiz => prevQuiz.map(v => {
        return {
          ...v,
          choose: ''
        }
      }))
      setCheckAnswers(false)
      return
    }
    setCheckAnswers(true)
    setMark(quiz.reduce((prev, current) => {
      if (current.option.findIndex(v => v == current.choose) == parseInt(current.correct) - 1) {
        return ++prev
      }
      return prev
    }, 0))
  }

  useEffect(() => {
    setCheck(quiz[0]?.choose ? !quiz.every(v => v.choose !== '') : true)
  }, [quiz])

  function handleChange(event, idQuestion) {
    if (!isCheckAnswers) {
      const { name, value } = event.target
      setQuiz(prevQuiz => prevQuiz.map((v, i) => idQuestion === i ? { ...v, choose: value } : v))
    }
  }

  const quizComponents = quiz.map((v, i) => <Quiz quiz={v} handleChange={handleChange} idQuestion={i} key={i} isCheckAnswers={isCheckAnswers} />)

  return (
    <>
      {
        (!showQuiz ?
          <>
            <h3 className="intro">Quizzical</h3>
            <p className="description">Some description if needed</p>
            <button className="start-quiz" onClick={() => setShowQuiz(true)}>Start quiz</button>
          </>
          :
          <>
            <div className="quizs">
              {quizComponents}
            </div>
            {isCheckAnswers && <h3>You scored is {mark}/{quiz.length}</h3>} <button disabled={check && !isCheckAnswers} onClick={handleClick}>{isCheckAnswers ? "Play again" : "Check answers"}</button>
          </>
        )
      }
    </>
  );
}

export default App;
