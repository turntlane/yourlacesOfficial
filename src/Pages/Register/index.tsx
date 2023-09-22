import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {API_URL} from '../../Config/index'

interface Users {
    username: string;
    email: string;
    password: string;
}

const Register = () => {
  const [formData, setFormData] = useState<Users>({
    username: '',
    email: '',
    password: '',
  });

  const { username, email, password } = formData;

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log(formData)
  }, [formData])

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/users`, formData);
      console.log('Registration successful:', response);
      // Redirect to login page or perform other actions as needed
    } catch (error: any) {
      console.error('Registration failed:', error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={username} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={password} onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
