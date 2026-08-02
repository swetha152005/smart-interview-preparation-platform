
import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <nav>

      <h2
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        🚀 Smart Interview Prep
      </h2>

      <div>

        <button onClick={() => navigate("/")}>
          Home
        </button>

        {token ? (
          <>
            <button onClick={() => navigate("/dashboard")}>
              Dashboard
            </button>

            <button onClick={() => navigate("/coding-questions")}>
              Coding
            </button>

            <button onClick={() => navigate("/mcq")}>
              MCQ
            </button>

            

            <button onClick={() => navigate("/company-questions")}>
              Companies
            </button>

            <button onClick={() => navigate("/bookmarks")}>
              🔖 Bookmarks
            </button>

            <button onClick={() => navigate("/progress")}>
              📊 Progress
            </button>

            <button onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/login")}>
              Login
            </button>

            <button onClick={() => navigate("/register")}>
              Register
            </button>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;

