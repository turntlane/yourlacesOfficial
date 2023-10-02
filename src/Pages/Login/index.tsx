import React, { useState } from "react";
import axios from "../../Config/";
// import { API_URL } from '../../Config';
// import { useHistory } from 'react-router-dom';

interface User {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<User>({
    email: "",
    password: "",
  });
  // const history = useHistory();
  const { email, password } = formData;

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(`${API_URL}/users/login`, formData);
  //     console.log('Login successful:', response.data);
  //     if(response.status === 200) {

  //     }
  //     // Save the JWT token in local storage or cookies and redirect to a protected route
  //   } catch (error: any) {
  //     console.error('Login failed:', error.response.data.message);
  //   }
  // };

  return (
    <div>
      <h2>Login</h2>
      {/* <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={password} onChange={handleChange} required />
        <button type="submit">Login</button>
      </form> */}
    </div>
  );
};

export default Login;
