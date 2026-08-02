
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../utils/auth";

function CodingQuestions() {

  const [bookmarkedQuestions, setBookmarkedQuestions] = useState([]);
  const [questions, setQuestions] = useState([]);

  const [difficulty, setDifficulty] = useState("All");
  const [topic, setTopic] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const userId = getUserId();


  useEffect(() => {

    if (!userId) {
      navigate("/login");
      return;
    }

    // Get coding questions
    
axios
  .get("http://localhost:5000/api/questions/coding")
  .then((response) => {
    setQuestions(response.data);
    setError("");
  })
  .catch((error) => {
    console.log(error);
    setError("Unable to load coding questions. Please try again.");
  })
  .finally(() => {
    setLoading(false);
  });




    // Get bookmarked questions
    axios
      .get(`http://localhost:5000/api/bookmarks/${userId}`)
      .then((response) => {

        const ids = response.data.map(
          (question) => question.question_id
        );

        setBookmarkedQuestions(ids);

      })
      .catch((error) => {
        console.log(error);
      });

  }, [userId, navigate]);


  const filteredQuestions = questions.filter((question) => {

    const difficultyMatch =
      difficulty === "All" ||
      question.difficulty === difficulty;

    const topicMatch =
      topic === "All" ||
      question.topic === topic;

    const searchMatch =
      question.title
        .toLowerCase()
        .includes(search.toLowerCase());

    return (
      difficultyMatch &&
      topicMatch &&
      searchMatch
    );

  });


  function handleBookmarkToggle(questionId, isBookmarked) {

    if (isBookmarked) {

      axios
        .delete(
          `http://localhost:5000/api/bookmarks/${userId}/${questionId}`
        )
        .then(() => {

          setBookmarkedQuestions((current) =>
            current.filter((id) => id !== questionId)
          );

        })
        .catch((error) => {
          console.log(error);
        });

    } else {

      axios
        .post(
          "http://localhost:5000/api/bookmarks",
          {
            user_id: userId,
            question_id: questionId
          }
        )
        .then(() => {

          setBookmarkedQuestions((current) => [
            ...current,
            questionId
          ]);

        })
        .catch((error) => {
          console.log(error);
        });

    }

  }


  function handleReset() {

    setSearch("");
    setDifficulty("All");
    setTopic("All");

  }


  return (

    <div className="page-container">

      {/* Page Header */}

      <div className="page-header">

       
{loading && (
  <div className="empty-state">
    <h3>⏳ Loading questions...</h3>
    <p>Please wait while we fetch the questions.</p>
  </div>
)}

{error && (
  <div className="error-message">
    <strong>Something went wrong</strong>
    <p>{error}</p>
  </div>
)}



        <h1>💻 Coding Questions</h1>

        <p>
          Practice coding problems and strengthen your
          problem-solving skills.
        </p>

      </div>


      {/* Search & Filters */}

      <div className="filter-section">

        <input
          type="text"
          placeholder="🔍 Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />


        <label>
          Difficulty:
        </label>

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >

          <option value="All">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>

        </select>


        <label>
          Topic:
        </label>

        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        >

          <option value="All">All Topics</option>
          <option value="Array">Array</option>
          <option value="Stack">Stack</option>
          <option value="String">String</option>

        </select>


        <button onClick={handleReset}>
          Reset Filters
        </button>

      </div>


      {/* No Results */}

      {filteredQuestions.length === 0 && (

        <div className="empty-state">

          <h3>
            🔍 No questions found
          </h3>

          <p>
            Try changing your search or filters.
          </p>

        </div>

      )}


      {/* Question List */}

      {filteredQuestions.map((question) => {

        const isBookmarked =
          bookmarkedQuestions.includes(question.id);


        return (

          <div
            key={question.id}
            className="question-card"
          >

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


            <div className="button-group">

              <button
                onClick={() =>
                  navigate(`/question/${question.id}`)
                }
              >
                Solve →
              </button>


              <button
                onClick={() =>
                  handleBookmarkToggle(
                    question.id,
                    isBookmarked
                  )
                }
              >
                {isBookmarked
                  ? "✅ Bookmarked"
                  : "🔖 Bookmark"}
              </button>

            </div>

          </div>

        );

      })}

    </div>

  );

}

export default CodingQuestions;

