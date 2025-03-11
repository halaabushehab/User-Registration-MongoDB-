import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerStart, registerSuccess, registerFailed } from '../redux/reducers/authSlice';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !email || !password) return;
        console.log("📤 Sending data:", { username, email, password });

        dispatch(registerStart());
        try {
            const response = await axios.post('http://localhost:8000/api/auth/register', 
                { username, email, password }, 
                { 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true 
                }
            );
            
            console.log("✅ Server response:", response.data);

            dispatch(registerSuccess(response.data));
            alert('User registered successfully! Redirecting to login...');
            navigate('/login');
        } catch (error) {
            console.error("Error response:", error.response); 
            dispatch(registerFailed(error.response?.data?.message || 'Registration failed!'));
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-purple-700 p-4">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300">
                <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-6">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                        type="submit"
                        className={`w-full p-3 text-white rounded-lg font-semibold transition-all duration-300 ${loading || !username || !email || !password ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-800 hover:shadow-lg'}`}
                        disabled={loading || !username || !email || !password}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
                <p className="mt-4 text-center text-gray-700">
                    Already have an account?{' '}
                    <Link to="/login" className="text-purple-600 hover:text-purple-800 font-semibold">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;


