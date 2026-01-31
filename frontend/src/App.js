import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ForgotPassword from "./components/auth/ForgotPassword";
import NotesDashboard from "./components/notes/NotesDashboard";
import NoteEditor from "./components/notes/NoteEditor";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<NotesDashboard />} />
        <Route path="/notes/new" element={<NoteEditor />} />
        <Route path="/notes/edit/:id" element={<NoteEditor />} />
      </Routes>
    </Router>
  );
}

export default App;
