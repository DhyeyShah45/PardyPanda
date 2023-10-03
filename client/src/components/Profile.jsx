import React, { useState } from "react";
import { useUserContext } from "../context/userContext";

const Profile = () => {
  const { user, token } = useUserContext();
  // console.log(user.token);
  const [editedAdmin, setEditedAdmin] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedAdmin({
      ...editedAdmin,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/admin/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(editedAdmin),
        }
      );
      if (!response.ok) {
        console.error(response.error);
      }
      console.log("Admin data updated successfully");
      sessionStorage.removeItem("details");
      window.location = "/";
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "5px",
          fontSize: "1.5rem",
          height: "50%",
        }}
      >
        <p>
          <strong>Email: {editedAdmin.email}</strong>
          <br />
          <strong>Role: {editedAdmin.role}</strong>
        </p>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          name="username"
          value={editedAdmin.username}
          onChange={handleChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={editedAdmin.password}
          onChange={handleChange}
        />

        <div>
          <button
            type="submit"
            disabled={!editedAdmin.password || editedAdmin.password.length < 9}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
