import React, { useState } from "react";
import { useUserContext } from "../context/userContext";

const UserDetails = ({ user, onDelete, onEdit }) => {
  const { role } = useUserContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedRole, setEditedRole] = useState(user.role);
  const handleChange = (e) => {
    setIsEditing(true);
    setEditedRole(e.target.value);
  };
  const handleSave = () => {
    setIsEditing(false);
    onEdit(user, editedRole);
  };
  return (
    <div className="user-details">
      <h2>Admin Details</h2>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Role:</strong> {user.role}
      </p>

      {role === 1 && (
        <>
          <select value={editedRole} onChange={handleChange}>
            <option value="Admin ROA">Admin ROA</option>
            <option value="Admin EA">Admin EA</option>
          </select>
          <button onClick={() => onDelete(user)}>Delete</button>
          {isEditing && <button onClick={handleSave}>Save</button>}
        </>
      )}
    </div>
  );
};

export default UserDetails;
