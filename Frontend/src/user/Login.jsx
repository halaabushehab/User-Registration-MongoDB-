import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // استيراد useNavigate هنا


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // تعريف navigate هنا

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        console.log("📤 Sending data:", { email, password });
        await axios.post('http://localhost:8000/api/auth/login', { email, password }, { withCredentials: true });
          alert('Logged in');
          navigate('/orders'); // توجيه المستخدم إلى صفحة الهوم

      } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
        alert('Login failed');
      }
  };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-purple-700 p-4">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300">
                <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-6">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email"
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
                        className="w-full p-3 text-white rounded-lg font-semibold transition-all duration-300 bg-purple-600 hover:bg-purple-800 hover:shadow-lg"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-700">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-purple-600 hover:text-purple-800 font-semibold">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;