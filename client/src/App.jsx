import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import { useAuth } from './context/AuthContext';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import HomePage from './pages/HomePage/HomePage';
import AdminPage from './pages/AdminPage/AdminPage';
import './App.css';

const Navbar = () => {
    const { user } = useAuth();
    return (
        <nav style={{ padding: '10px', background: '#eee', marginBottom: '20px' }}>
            <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
            
            {!user ? (
                <>
                    <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
                    <Link to="/register">Register</Link>
                </>
            ) : (
                <>
                    <Link to="/profile" style={{ marginRight: '10px' }}>Profile</Link>
                    {user.role === 'ADMIN' && <Link to="/admin">Admin</Link>}
                </>
            )}
        </nav>
    );
};

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/admin" element={<AdminPage />} />
            </Routes>
        </Router>
    );
}

export default App;