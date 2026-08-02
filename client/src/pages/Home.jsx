
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  return (
    <div className="home-page">

      {/* Hero Section */}

      <section className="hero-section">

        <div className="hero-content">

          <span className="hero-badge">
            🚀 Smart Interview Preparation Platform
          </span>

          <h1>
            Prepare Smarter.
            <br />
            Interview Better.
          </h1>

          <p>
            Practice coding problems, MCQs and interview questions
            in one place. Track your progress and prepare for your
            dream software engineering role.
          </p>

          <div className="hero-buttons">

            <button
              onClick={() => navigate("/register")}
            >
              Get Started →
            </button>

            <button
              className="secondary-button"
              onClick={() => navigate("/coding-questions")}
            >
              Explore Questions
            </button>

          </div>

        </div>


        <div className="hero-card">

          <div className="hero-card-icon">
            💻
          </div>

          <h2>
            Your Interview Journey
          </h2>

          <p>
            Learn → Practice → Track → Improve
          </p>

          <div className="mini-stats">

            <div>
              <strong>19+</strong>
              <span>Coding Questions</span>
            </div>

            <div>
              <strong>8</strong>
              <span>Companies</span>
            </div>

            <div>
              <strong>4</strong>
              <span>MCQs</span>
            </div>

          </div>

        </div>

      </section>


      {/* Features */}

      <section className="features-section">

        <h2>
          Everything You Need to Prepare
        </h2>

        <p className="section-subtitle">
          Build confidence with focused practice and measurable progress.
        </p>


        <div className="feature-grid">

          <div className="feature-card">

            <div className="feature-icon">
              💻
            </div>

            <h3>
              Coding Practice
            </h3>

            <p>
              Solve coding problems with difficulty and topic filters.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              📝
            </div>

            <h3>
              MCQ Practice
            </h3>

            <p>
              Test your technical knowledge with interactive quizzes.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              🏢
            </div>

            <h3>
              Company Questions
            </h3>

            <p>
              Practice questions organized by popular companies.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              📊
            </div>

            <h3>
              Track Progress
            </h3>

            <p>
              Monitor solved questions, quiz scores and bookmarks.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              🔖
            </div>

            <h3>
              Smart Bookmarks
            </h3>

            <p>
              Save important questions and revisit them anytime.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              🎯
            </div>

            <h3>
              Interview Preparation
            </h3>

            <p>
              Practice technical interview questions and improve your readiness.
            </p>

          </div>

        </div>

      </section>


      {/* CTA */}

      <section className="cta-section">

        <h2>
          Ready to Start Preparing?
        </h2>

        <p>
          Turn your preparation into progress.
        </p>

        <button
          onClick={() => navigate("/register")}
        >
          Start Practicing →
        </button>

      </section>

    </div>
  );
}

export default Home;

