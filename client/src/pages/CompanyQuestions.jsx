
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CompanyQuestions() {

  const [company, setCompany] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  function handleCompanyChange(e) {

    const selectedCompany = e.target.value;

    setCompany(selectedCompany);

    if (!selectedCompany) {
      setQuestions([]);
      return;
    }

    setLoading(true);

    axios
      .get(
        `${import.meta.env.VITE_API_URL}/api/questions/coding/company/${selectedCompany}`
      )
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });

  }


  return (

    <div className="page-container">

      {/* Header */}

      <div className="page-header">

        <h1>
          🏢 Company-wise Questions
        </h1>

        <p>
          Practice coding questions frequently asked by top companies.
        </p>

      </div>


      {/* Company Selection */}

      <div className="company-selector">

        <div>

          <label>
            Select a company
          </label>

          <select
            value={company}
            onChange={handleCompanyChange}
          >

            <option value="">
              Choose a company
            </option>

            <option value="Google">
              Google
            </option>

            <option value="Microsoft">
              Microsoft
            </option>

            <option value="Amazon">
              Amazon
            </option>

            <option value="Infosys">
              Infosys
            </option>

            <option value="TCS">
              TCS
            </option>

            <option value="Accenture">
              Accenture
            </option>

            <option value="Wipro">
              Wipro
            </option>

            <option value="Zoho">
              Zoho
            </option>

          </select>

        </div>


        {company && !loading && (

          <div className="company-count">

            <strong>
              {questions.length}
            </strong>

            <span>
              {questions.length === 1
                ? " Question"
                : " Questions"}
            </span>

          </div>

        )}

      </div>


      {/* Loading */}

      {loading && (

        <div className="empty-state">

          <h3>
            ⏳ Loading questions...
          </h3>

          <p>
            Fetching questions for {company}.
          </p>

        </div>

      )}


      {/* No questions */}

      {!loading && company && questions.length === 0 && (

        <div className="empty-state">

          <h3>
            📭 No questions available
          </h3>

          <p>
            No coding questions are currently available for {company}.
          </p>

        </div>

      )}


      {/* Questions */}

      {!loading && questions.length > 0 && (

        <div className="company-question-list">

          <div className="section-heading">

            <h2>
              {company} Interview Questions
            </h2>

            <span>
              {questions.length} questions
            </span>

          </div>


          {questions.map((question) => (

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

export default CompanyQuestions;

