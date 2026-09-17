import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../utils/auth";

function Progress() {

  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [mcqResult, setMcqResult] = useState(null);
  const [solvedCount, setSolvedCount] = useState(0);

  const userId = getUserId();

  const navigate = useNavigate();

  useEffect(() => {

    if (!userId) {
    navigate("/login");
    return;
  }

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }


    // Coding solved count
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/questions/solved/count/${userId}`)
      .then((response) => {
        setSolvedCount(response.data.count);
      })
      .catch((error) => {
        console.log(error);
      });


    // Bookmark count
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/bookmarks/count/${userId}`)
      .then((response) => {
        setBookmarkCount(response.data.count);
      })
      .catch((error) => {
        console.log(error);
      });


    // MCQ latest result
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/questions/mcq-result/${userId}`)
      .then((response) => {
        setMcqResult(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, [userId, navigate]);

  return (
    <div>

      <h1>My Progress 📊</h1>

      <div className="progress-container">

        <div className="progress-card">
          <h3>🧩 Coding</h3>
          <p>{solvedCount}</p>
          <span>Questions Solved</span>
        </div>


        <div className="progress-card">
          <h3>📝 MCQ</h3>

          <p>
            {mcqResult
              ? `${mcqResult.score}/${mcqResult.total_questions}`
              : "0"}
          </p>

          <span>Latest Score</span>
        </div>


        <div className="progress-card">
          <h3>🔖 Bookmarks</h3>
          <p>{bookmarkCount}</p>
          <span>Saved Questions</span>
        </div>

      </div>

    </div>
  );
}

export default Progress;

