import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

// Regular User Management
import AddUser from "./pages/AddUser";
import UserList from './pages/UserList';
import EditUser from './pages/EditUser';

// Admin User Management
import AdminAddUser from "./pages/Admin/AdminAddUser";
import AdminUserList from './pages/Admin/AdminUserList';
import AdminEditUser from './pages/Admin/AdminEditUser';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public/Login Route */}
        <Route path="/" element={<Login />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Regular User Management Routes */}
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/user-list" element={<UserList />} />
        <Route path="/edit-user/:userID" element={<EditUser />} />

        {/* Admin User Management Routes */}
        <Route path="/admin/add-user" element={<AdminAddUser />} />
        <Route path="/admin/user-list" element={<AdminUserList />} />
        <Route path="/admin/edit-user/:userID" element={<AdminEditUser />} />
      </Routes>
    </Router>
  );
}

export default App;
