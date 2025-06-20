import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const query = `
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          id
          name
          email
          token
        }
      }
    `;

    const variables = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await axios.post(
        'https://social-media-backend-2-8z8v.onrender.com/graphql',
        { query, variables },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const { data, errors } = response.data;

      if (errors && errors.length > 0) {
        alert("❌ " + errors[0].message);
      } else {
        alert("✅ Login successful!");
        localStorage.setItem("user", JSON.stringify(data.login));
        navigate('/');
      }

    } catch (error) {
      console.error("Login failed:", error);
      alert("❌ Server Error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>
         <p className="text-sm text-right text-gray-600 mt-2 mb-4">
          <button
            type="button"
            onClick={() => navigate('/change')}
            className="text-blue-500 hover:underline"
          >
            Forgot Password?
          </button>
        </p>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>

      </form>
    </div>
  );
};

export default Login;
