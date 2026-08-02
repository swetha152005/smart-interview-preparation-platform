import { useEffect, useState } from "react";
import axios from "axios";

function InterviewQuestions() {

  const [questions, setQuestions] = useState([]);

  useEffect(() => {

    axios
      .get("http://localhost:5000/api/questions/interview")
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  return (
    <div>

      <h1>Interview Questions</h1>

      {questions.map((question, index) => (

        <div key={question.id}>

          <h3>
            {index + 1}. {question.question}
          </h3>

          <p>
            Category: {question.category}
          </p>

          <p>
            Difficulty: {question.difficulty}
          </p>

          <hr />

        </div>

      ))}

    </div>
  );
}

export default InterviewQuestions;