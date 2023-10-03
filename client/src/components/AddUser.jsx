import React, { useState } from "react";

const AddUser = ({ onAddUser }) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    onAddUser(user);
    setUser({
      username: "",
      email: "",
      password: "",
      role: "",
    });
  };
  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          fontSize: "1.5rem",
          height: "50%",
        }}
      >
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          required
          value={user.username}
          onChange={handleChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          required
          type="email"
          id="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />

        <label htmlFor="password">Password:</label>
        <input
          required
          type="password"
          id="password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        <div>
          <label htmlFor="role" style={{ margin: "25px" }}>
            Role:
          </label>
          <select
            id="role"
            name="role"
            required
            value={user.role}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Admin ROA">Admin ROA</option>
            <option value="Admin EA">Admin EA</option>
          </select>
        </div>
        <button type="submit" onClick={handleAdd}>
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
