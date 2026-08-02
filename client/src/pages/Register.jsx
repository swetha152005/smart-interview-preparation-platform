
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  async function handleSubmit(e) {

    e.preventDefault();

    setError("");

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {

      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: name,
          email: email,
          password: password
        }
      );

      navigate("/login");

    } catch (error) {

      if (error.response?.status === 500) {

        setError("This email is already registered.");

      } else {

        setError(
          "Unable to create your account. Please try again."
        );

      }

    } finally {

      setLoading(false);

    }

  }


  return (

    <div className="auth-page">

      <div className="auth-container">

        {/* Left Side */}

        <div className="auth-brand">

          <div className="brand-icon">
            🚀
          </div>

          <h1>
            Start Your
            <br />
            Interview Journey
          </h1>

          <p>
            Build your skills, practice consistently,
            and get ready for your next technical interview.
          </p>


          <div className="auth-features">

            <div>
              <span>✓</span>
              Practice Coding Problems
            </div>

            <div>
              <span>✓</span>
              Test Your Technical Knowledge
            </div>

            <div>
              <span>✓</span>
              Prepare Company-wise
            </div>

            <div>
              <span>✓</span>
              Track Your Progress
            </div>

          </div>

        </div>


        {/* Register Card */}

        <div className="auth-card">

          <div className="auth-header">

            <h2>
              Create Account ✨
            </h2>

            <p>
              Start preparing for your dream job.
            </p>

          </div>


          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

            </div>


            <div className="form-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

            </div>


            <div className="form-group">

              <label>
                Password
              </label>

              <input
                type="password"
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

            </div>


            {error && (

              <div className="auth-error">
                ⚠️ {error}
              </div>

            )}


            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >

              {loading
                ? "Creating account..."
                : "Create Account →"}

            </button>

          </form>


          <div className="auth-footer">

            <span>
              Already have an account?
            </span>

            <button
              onClick={() => navigate("/login")}
              className="auth-link"
            >
              Login
            </button>

          </div>


          <button
            onClick={() => navigate("/")}
            className="back-home"
          >
            ← Back to Home
          </button>

        </div>

      </div>

    </div>

  );

}

export default Register;

