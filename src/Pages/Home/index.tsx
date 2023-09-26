import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'


interface User {
    email: string;
    password: string;
}

const Home = () => {
  return (
    <div>
      <h2>Home</h2>
      <Link to={"/login"}>Login</Link>
      <Link to={"/register"}>Register</Link>
    </div>
  );
};

export default Home;
