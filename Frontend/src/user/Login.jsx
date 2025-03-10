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
          navigate('/'); // توجيه المستخدم إلى صفحة الهوم

      } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
        alert('Login failed');
      }
  };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                <input
    type="email" // تأكد من أن هذا هو النوع الصحيح
    onChange={(e) => setEmail(e.target.value)}
    placeholder="Your email"
    required
    className="w-full p-2 mb-4 border border-gray-300 rounded"
/>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                    />
                    <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-500 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;