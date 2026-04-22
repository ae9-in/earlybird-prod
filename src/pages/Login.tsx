import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock } from 'lucide-react';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // If already authorized, jump straight to the dashboard
        if (localStorage.getItem('earlybird_admin_auth') === 'true') {
            navigate('/admin-earlybird');
        }
    }, [navigate]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock authentication, just redirect to admin for now
        localStorage.setItem('earlybird_admin_auth', 'true');
        navigate('/admin-earlybird');
    };

    return (
        <div className="login-container">
            <motion.div 
                className="login-glass-panel"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="login-header">
                    <div className="login-brand">
                        Early Bird <span>Admin</span>
                    </div>
                    <h2>Welcome Back</h2>
                    <p>Enter your credentials to access the dashboard</p>
                </div>

                <form className="login-form" onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>Email Address</label>
                        <div className="input-wrapper">
                            <Mail className="input-icon" size={18} />
                            <input 
                                type="email" 
                                placeholder="name@earlybird.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <div className="input-wrapper">
                            <Lock className="input-icon" size={18} />
                            <input 
                                type="password" 
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="login-btn">
                        <LogIn size={18} /> Sign In
                    </button>
                    
                    <div className="login-footer">
                        <a href="#">Forgot your password?</a>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;
