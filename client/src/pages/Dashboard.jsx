
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../utils/auth";

function Dashboard() {

  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [mcqResult, setMcqResult] = useState(null);
  const [solvedCount, setSolvedCount] = useState(0);

  const navigate = useNavigate();

  const userId = getUserId();


  useEffect(() => {

    if (!userId) {
      navigate("/login");
      return;
    }


    // Solved coding questions

    axios
      .get(
        `http://localhost:5000/api/questions/solved/count/${userId}`
      )
      .then((response) => {
        setSolvedCount(response.data.count);
      })
      .catch((error) => {
        console.log(error);
      });


    // Bookmarks

    axios
      .get(
        `http://localhost:5000/api/bookmarks/count/${userId}`
      )
      .then((response) => {
        setBookmarkCount(response.data.count);
      })
      .catch((error) => {
        console.log(error);
      });


    // MCQ result

    axios
      .get(
        `http://localhost:5000/api/questions/mcq-result/${userId}`
      )
      .then((response) => {
        setMcqResult(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, [userId, navigate]);


  function handleLogout() {

    localStorage.removeItem("token");

    navigate("/");

  }


  return (

    <div className="page-container">

      {/* Header */}

      <div className="dashboard-header">

        <div>

          <h1>
            👋 Welcome Back!
          </h1>

          <p>
            Keep practicing and move closer to your dream software job.
          </p>

        </div>

        

      </div>


      {/* Quick Actions */}

      <div className="dashboard-actions">

        <button
          onClick={() => navigate("/coding-questions")}
        >
          💻 Practice Coding
        </button>

        <button
          onClick={() => navigate("/mcq")}
        >
          📝 Take MCQ
        </button>

        <button
          onClick={() => navigate("/interview-questions")}
        >
          🎤 Interview Questions
        </button>

      </div>


      {/* Progress */}

      <div className="page-header">

        <h2>
          Your Progress
        </h2>

        <p>
          Track your interview preparation activity.
        </p>

      </div>


      <div className="progress-container">

        {/* Coding */}

        <div className="progress-card">

          <div className="dashboard-icon">
            💻
          </div>

          <h3>
            Coding
          </h3>

          <p>
            {solvedCount}
          </p>

          <span>
            Questions Solved
          </span>

        </div>


        {/* MCQ */}

        <div className="progress-card">

          <div className="dashboard-icon">
            📝
          </div>

          <h3>
            MCQ
          </h3>

          <p>

            {mcqResult
              ? `${mcqResult.score}/${mcqResult.total_questions}`
              : "0"}

          </p>

          <span>
            Latest Score
          </span>

        </div>


        {/* Bookmarks */}

        <div className="progress-card">

          <div className="dashboard-icon">
            🔖
          </div>

          <h3>
            Bookmarks
          </h3>

          <p>
            {bookmarkCount}
          </p>

          <span>
            Saved Questions
          </span>

        </div>

      </div>


      {/* Navigation Cards */}

      <div className="dashboard-grid">

        <div
          className="dashboard-feature-card"
          onClick={() => navigate("/bookmarks")}
        >

          <span>🔖</span>

          <h3>
            My Bookmarks
          </h3>

          <p>
            Review questions you saved for later.
          </p>

        </div>


        <div
          className="dashboard-feature-card"
          onClick={() => navigate("/progress")}
        >

          <span>📊</span>

          <h3>
            Detailed Progress
          </h3>

          <p>
            View your complete preparation progress.
          </p>

        </div>


        <div
          className="dashboard-feature-card"
          onClick={() => navigate("/company-questions")}
        >

          <span>🏢</span>

          <h3>
            Company Practice
          </h3>

          <p>
            Explore questions by company.
          </p>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;

