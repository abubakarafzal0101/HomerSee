import React, { useContext, useState } from "react";

import { AuthContext } from "../contexts/AuthContextProvider";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { loginUser } = useContext(AuthContext);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(formData);
    setFormData({ email: "", password: "" });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="border"
        />
        <input
          type="password"
          name="password"
          id="password"
          className="border"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit" className="cursor-pointer">
          Login
        </button>

        <Link to={"/register"}>Don't have an account? Register here.</Link>
      </form>
    </>
  );
};

export default Login;
