
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { getUserId } from "../utils/auth";

function QuestionDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState(null);
  const [solved, setSolved] = useState(false);

  const userId = getUserId();


  useEffect(() => {

    if (!userId) {
      navigate("/login");
      return;
    }


    // Get question
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/questions/coding/${id}`)
      .then((response) => {
        setQuestion(response.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });


    // Check whether already solved
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/questions/solved/${userId}/${id}`)
      .then((response) => {
        setSolved(response.data.solved);
      })
      .catch((error) => {
        console.log("Solved status error:", error);
      });

  }, [id, userId, navigate]);


  function markAsSolved() {

    if (solved) {
      return;
    }


    axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/questions/solved`,
        {
          user_id: userId,
          question_id: id
        }
      )
      .then(() => {

        setSolved(true);

      })
      .catch((error) => {

        if (error.response?.status === 409) {
          setSolved(true);
          return;
        }

        console.log(error);

      });

  }


  if (!question) {

    return (
      <div className="page-container">

        <div className="empty-state">
          Loading question...
        </div>

      </div>
    );

  }


  return (

    <div className="page-container">

      {/* Back */}

      <button
        className="secondary-button"
        onClick={() => navigate("/coding-questions")}
      >
        ← Back to Coding Questions
      </button>


      {/* Question */}

      <div className="details-card">

        <h1>
          {question.title}
        </h1>


        <div className="question-meta">

          <span className="badge">
            Difficulty: {question.difficulty}
          </span>

          <span className="badge">
            Topic: {question.topic}
          </span>

        </div>


        <div className="description">

          <h2>
            Problem Description
          </h2>

          <hr />

          <p>
            {question.description}
          </p>

        </div>


        {/* Solved Button */}

        <div className="button-group">

          <button
            onClick={markAsSolved}
            disabled={solved}
          >
            {solved
              ? "✅ Solved"
              : "✓ Mark as Solved"}
          </button>

        </div>

      </div>

    </div>

  );

}

export default QuestionDetails;

