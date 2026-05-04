import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContextProvider";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const { registerUser } = useContext(AuthContext);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData);
    setFormData({ name: "", email: "", password: "" });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="name"
        name="name"
        onChange={handleChange}
        value={formData.name}
      />
      <input
        type="email"
        placeholder="email"
        name="email"
        onChange={handleChange}
        value={formData.email}
      />
      <input
        type="password"
        placeholder="password"
        name="password"
        onChange={handleChange}
        value={formData.password}
      />
      <button type="submit">Register</button>

      <Link to={"/login"}>Have an account? Login here.</Link>
    </form>
  );
};

export default Register;
