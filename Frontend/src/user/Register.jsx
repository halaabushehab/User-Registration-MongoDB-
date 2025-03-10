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
    const navigate = useNavigate(); // للتنقل بعد التسجيل الناجح

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !email || !password) return;
        console.log("📤 Sending data:", { username, email, password }); // ✅ تأكيد إرسال البيانات

        dispatch(registerStart());
        try {
          const response = await axios.post('http://localhost:8000/api/auth/register', 
            { username, email, password }, 
            { 
                headers: {
                    'Content-Type': 'application/json', // تحديد نوع البيانات كـ JSON
                },
                withCredentials: true 
            }
        );
        
            console.log("✅ Server response:", response.data); // ✅ طباعة الرد من السيرفر

            dispatch(registerSuccess(response.data));
            alert('User registered successfully! Redirecting to login...');
            navigate('/login'); // التوجه إلى صفحة تسجيل الدخول
        } catch (error) {
          console.error("Error response:", error.response); 
          dispatch(registerFailed(error.response?.data?.message || 'Registration failed!'));
      }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                    />
                    <button
                        type="submit"
                        className={`w-full p-2 rounded text-white ${loading || !username || !email || !password ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
                        disabled={loading || !username || !email || !password}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
                <p className="mt-4 text-center">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
