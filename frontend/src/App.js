import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import PrivateRoute from "./components/layout/PrivateRoute";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import NotesDashboard from "./components/notes/NotesDashboard";
import NoteEditor from "./components/notes/NoteEditor";
import UserProfile from "./components/profile/UserProfile";


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Navbar />   
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* <Route path="/dashboard" element={<NotesDashboard />} />
        <Route path="/notes/new" element={<NoteEditor />} />
        <Route path="/notes/edit/:id" element={<NoteEditor />} />
        <Route path="/profile" element={<UserProfile />} />  */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <NotesDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/notes/new"
          element={
            <PrivateRoute>
              <NoteEditor />
            </PrivateRoute>
          }
        />

        <Route
          path="/notes/edit/:id"
          element={
            <PrivateRoute>
              <NoteEditor />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
