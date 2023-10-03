import { useState } from "react";
import { useUserContext } from "../context/userContext";

const Login = () => {
  const ROLE = {
    Super: 1,
    EA: 2,
    ROA: 3,
  };
  const { setUser, setRole, setToken } = useUserContext();
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    error: "",
  });
  // Define state to capture form input
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Event handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "username") {
      const userRegex = /^[a-zA-Z0-9]+$/;
      if (!userRegex.test(value) && value.length > 0) {
        setErrors({
          ...errors,
          username: "No Special Characters Allowed",
        });
      } else {
        setErrors({
          ...errors,
          username: "",
        });
      }
    }
    if (name === "password") {
      if (value.length <= 8 && value.length > 0) {
        setErrors({
          ...errors,
          password: "Password must be more than 8 characters",
        });
      } else {
        setErrors({
          ...errors,
          password: "",
        });
      }
    }
  };

  // Event handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.error) {
        setErrors({
          ...errors,
          error: data.error,
        });
      } else {
        const token = data.token;
        if (token) {
          setToken(token);
          const storage = JSON.stringify(data);
          sessionStorage.setItem("details", storage);
          setUser(data.user);
          const role = data.user.role;
          if (role === "Super") {
            setRole(ROLE.Super);
          } else if (role === "Admin EA") {
            setRole(ROLE.EA);
          } else {
            setRole(ROLE.ROA);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }

    // Reset the form
    setFormData({
      username: "",
      password: "",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="login">
        <h1 style={{ textAlign: "center", fontSize: "3rem" }}>Sign - In</h1>
        {errors.error ? <p className="error">{errors.error}</p> : ""}
        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          value={formData.username}
          onChange={handleInputChange}
        />
        {errors.username ? <p className="error">{errors.username}</p> : ""}
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleInputChange}
        />
        {errors.password ? <p className="error">{errors.password}</p> : ""}
        <button type="submit" disabled={formData.password.length <= 8}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
