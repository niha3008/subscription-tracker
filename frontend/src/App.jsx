import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddSubscription from "./pages/AddSubscription";
import EditSubscription from "./pages/EditSubscription";
import Subscriptions from "./pages/Subscriptions";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/subscriptions"
          element={
            <ProtectedRoute>
              <Subscriptions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/subscriptions/add"
          element={
            <ProtectedRoute>
              <AddSubscription />
            </ProtectedRoute>
          }
        />

        <Route
          path="/subscriptions/edit/:id"
          element={
            <ProtectedRoute>
              <EditSubscription />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;