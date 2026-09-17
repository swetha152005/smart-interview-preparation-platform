
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  async function handleSubmit(e) {

    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          email: email,
          password: password
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      navigate("/dashboard");

    } catch (error) {

      if (error.response?.status === 401) {
        setError("Invalid email or password.");
      } else {
        setError(
          "Unable to login right now. Please try again."
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
            Smart Interview
            <br />
            Preparation
          </h1>

          <p>
            Prepare smarter. Practice better.
            Get interview-ready.
          </p>


          <div className="auth-features">

            <div>
              <span>✓</span>
              Coding Practice
            </div>

            <div>
              <span>✓</span>
              Technical MCQs
            </div>

            <div>
              <span>✓</span>
              Company-wise Questions
            </div>

            <div>
              <span>✓</span>
              Progress Tracking
            </div>

          </div>

        </div>


        {/* Login Card */}

        <div className="auth-card">

          <div className="auth-header">

            <h2>
              Welcome Back 👋
            </h2>

            <p>
              Login to continue your preparation.
            </p>

          </div>


          <form onSubmit={handleSubmit}>

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
                placeholder="Enter your password"
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
                ? "Signing in..."
                : "Login →"}

            </button>

          </form>


          <div className="auth-footer">

            <span>
              Don't have an account?
            </span>

            <button
              onClick={() => navigate("/register")}
              className="auth-link"
            >
              Create Account
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

export default Login;

