import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CodingQuestions from "./pages/CodingQuestions";
import QuestionDetails from "./pages/QuestionDetails";
import MCQ from "./pages/MCQ";
import InterviewQuestions from "./pages/InterviewQuestions";
import Bookmarks from "./pages/Bookmarks";
import Progress from "./pages/Progress";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { Routes, Route } from "react-router-dom";
import CompanyQuestions from "./pages/CompanyQuestions";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="/coding-questions"
          element={<CodingQuestions />}
        />

        <Route
          path="/question/:id"
          element={<QuestionDetails />}
        />

        <Route path="/mcq" element={<MCQ />} />

        <Route
          path="/interview-questions"
          element={<InterviewQuestions />}
        />

        <Route path="/bookmarks" element={<Bookmarks />} />

        <Route path="/progress" element={<Progress />} />

        <Route
          path="/company-questions"
          element={<CompanyQuestions />}
        />

      </Routes>

      <Footer />

    </>
  );
}

export default App;