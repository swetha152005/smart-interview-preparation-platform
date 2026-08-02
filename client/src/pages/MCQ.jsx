
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../utils/auth";

function MCQ() {

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();
  const userId = getUserId();


  useEffect(() => {

    if (!userId) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:5000/api/questions/mcq")
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, [userId, navigate]);


  function handleAnswer(questionId, answer) {

    setAnswers((current) => ({
      ...current,
      [questionId]: answer
    }));

  }


  function handleNext() {

    const currentQuestion = questions[currentIndex];

    if (!answers[currentQuestion.id]) {
      alert("Please select an answer before continuing.");
      return;
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }

  }


  function handlePrevious() {

    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }

  }


  function handleSubmit() {

    const unanswered = questions.some(
      (question) => !answers[question.id]
    );

    if (unanswered) {
      alert("Please answer all questions before submitting.");
      return;
    }

    let totalScore = 0;

    questions.forEach((question) => {

      if (answers[question.id] === question.correct_answer) {
        totalScore++;
      }

    });

    setScore(totalScore);
    setSubmitted(true);


    axios.post(
      "http://localhost:5000/api/questions/mcq-result",
      {
        user_id: userId,
        score: totalScore,
        total_questions: questions.length
      }
    )
      .then(() => {
        console.log("MCQ result saved");
      })
      .catch((error) => {
        console.log(error);
      });

  }


  function handleRetry() {

    setAnswers({});
    setCurrentIndex(0);
    setScore(null);
    setSubmitted(false);

  }


  if (questions.length === 0) {

    return (
      <div className="page-container">

        <div className="empty-state">
          <h2>Loading MCQ...</h2>
          <p>Preparing your quiz...</p>
        </div>

      </div>
    );

  }


  if (submitted) {

    const percentage =
      Math.round((score / questions.length) * 100);


    return (

      <div className="page-container">

        <div className="quiz-result">

          <div className="result-icon">
            🎉
          </div>

          <h1>
            Quiz Completed!
          </h1>

          <p>
            Great job! Here's your result.
          </p>


          <div className="score-circle">

            <strong>
              {percentage}%
            </strong>

            <span>
              Score
            </span>

          </div>


          <h2>
            {score} / {questions.length}
          </h2>


          <div className="button-group result-buttons">

            <button onClick={handleRetry}>
              🔄 Retry Quiz
            </button>

            <button
              className="secondary-button"
              onClick={() => navigate("/dashboard")}
            >
              ← Dashboard
            </button>

          </div>

        </div>

      </div>

    );

  }


  const question = questions[currentIndex];


  const progress =
    ((currentIndex + 1) / questions.length) * 100;


  return (

    <div className="page-container">

      {/* Header */}

      <div className="page-header">

        <h1>
          📝 MCQ Quiz
        </h1>

        <p>
          Test your technical knowledge and improve your interview readiness.
        </p>

      </div>


      {/* Progress */}

      <div className="quiz-progress">

        <div className="quiz-progress-info">

          <span>
            Question {currentIndex + 1} of {questions.length}
          </span>

          <span>
            {Math.round(progress)}%
          </span>

        </div>


        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>

        </div>

      </div>


      {/* Question Card */}

      <div className="mcq-card">

        <span className="question-number">
          Question {currentIndex + 1}
        </span>


        <h2>
          {question.question}
        </h2>


        <div className="options-list">


          <label
            className={
              answers[question.id] === "A"
                ? "option selected"
                : "option"
            }
          >

            <input
              type="radio"
              name={`question-${question.id}`}
              checked={answers[question.id] === "A"}
              onChange={() =>
                handleAnswer(question.id, "A")
              }
            />

            <span className="option-letter">
              A
            </span>

            <span>
              {question.option_a}
            </span>

          </label>


          <label
            className={
              answers[question.id] === "B"
                ? "option selected"
                : "option"
            }
          >

            <input
              type="radio"
              name={`question-${question.id}`}
              checked={answers[question.id] === "B"}
              onChange={() =>
                handleAnswer(question.id, "B")
              }
            />

            <span className="option-letter">
              B
            </span>

            <span>
              {question.option_b}
            </span>

          </label>


          <label
            className={
              answers[question.id] === "C"
                ? "option selected"
                : "option"
            }
          >

            <input
              type="radio"
              name={`question-${question.id}`}
              checked={answers[question.id] === "C"}
              onChange={() =>
                handleAnswer(question.id, "C")
              }
            />

            <span className="option-letter">
              C
            </span>

            <span>
              {question.option_c}
            </span>

          </label>


          <label
            className={
              answers[question.id] === "D"
                ? "option selected"
                : "option"
            }
          >

            <input
              type="radio"
              name={`question-${question.id}`}
              checked={answers[question.id] === "D"}
              onChange={() =>
                handleAnswer(question.id, "D")
              }
            />

            <span className="option-letter">
              D
            </span>

            <span>
              {question.option_d}
            </span>

          </label>

        </div>


        {/* Navigation */}

        <div className="quiz-navigation">

          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="secondary-button"
          >
            ← Previous
          </button>


          {currentIndex < questions.length - 1 && (

            <button onClick={handleNext}>
              Next →
            </button>

          )}


          {currentIndex === questions.length - 1 && (

            <button onClick={handleSubmit}>
              Submit Quiz ✓
            </button>

          )}

        </div>

      </div>

    </div>

  );

}

export default MCQ;
