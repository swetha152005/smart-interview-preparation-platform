
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../utils/auth";

function Bookmarks() {

  const [bookmarks, setBookmarks] = useState([]);

  const navigate = useNavigate();
  const userId = getUserId();


  useEffect(() => {

    if (!userId) {
      navigate("/login");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/bookmarks/${userId}`)
      .then((response) => {
        setBookmarks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, [userId, navigate]);


  function handleRemoveBookmark(questionId) {

    axios
      .delete(
        `${import.meta.env.VITE_API_URL}/api/bookmarks/${userId}/${questionId}`
      )
      .then(() => {

        setBookmarks((currentBookmarks) =>
          currentBookmarks.filter(
            (question) =>
              question.question_id !== questionId
          )
        );

      })
      .catch((error) => {
        console.log(error);
      });

  }


  return (

    <div className="page-container">

      {/* Header */}

      <div className="page-header">

        <h1>
          🔖 My Bookmarks
        </h1>

        <p>
          Questions you've saved for later practice.
        </p>

      </div>


      {/* Bookmark count */}

      {bookmarks.length > 0 && (

        <div className="bookmark-summary">

          <span>
            Saved Questions
          </span>

          <strong>
            {bookmarks.length}
          </strong>

        </div>

      )}


      {/* Empty State */}

      {bookmarks.length === 0 ? (

        <div className="empty-state">

          <div className="empty-icon">
            🔖
          </div>

          <h2>
            No bookmarked questions
          </h2>

          <p>
            Save interesting coding questions and
            come back to practice them later.
          </p>

          <button
            onClick={() =>
              navigate("/coding-questions")
            }
          >
            Browse Coding Questions →
          </button>

        </div>

      ) : (

        <div className="bookmark-list">

          {bookmarks.map((question) => (

            <div
              className="bookmark-card"
              key={question.question_id}
            >

              <div className="bookmark-card-content">

                <div>

                  <h2>
                    {question.title}
                  </h2>

                  <p>
                    {question.description}
                  </p>


                  <div className="question-meta">

                    <span className="badge">
                      Difficulty: {question.difficulty}
                    </span>

                    <span className="badge">
                      Topic: {question.topic}
                    </span>

                  </div>

                </div>


                <div className="bookmark-actions">

                  <button
                    onClick={() =>
                      navigate(
                        `/question/${question.question_id}`
                      )
                    }
                  >
                    Solve →
                  </button>


                  <button
                    className="remove-bookmark-button"
                    onClick={() =>
                      handleRemoveBookmark(
                        question.question_id
                      )
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}


      {/* Back */}

      <button
        className="secondary-button dashboard-back"
        onClick={() => navigate("/dashboard")}
      >
        ← Back to Dashboard
      </button>

    </div>

  );

}

export default Bookmarks;



