import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Users(props) {
  const { _id, name, age, gmail, address } = props.user;

  const history = useNavigate();

  const deleteHandler = async () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (userConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/users/${_id}`);
        window.alert("User details deleted successfully!");
        history("/userdetails");
        window.location.reload();
      } catch (error) {
        console.error("Error deleting user:", error);
        window.alert("Failed to delete user details.");
      }
    }
  };

  return (
    <div className="user-detail-container">
      <h1 className="user-detail-title">User Detail</h1>
      <div className="user-info">
        <h3 className="user-info-label">
          ID: <span className="user-info-value">{_id}</span>
        </h3>
        <h3 className="user-info-label">
          Name: <span className="user-info-value">{name}</span>
        </h3>
        <h3 className="user-info-label">
          Age: <span className="user-info-value">{age}</span>
        </h3>
        <h3 className="user-info-label">
          Gmail: <span className="user-info-value">{gmail}</span>
        </h3>
        <h3 className="user-info-label">
          Address: <span className="user-info-value">{address}</span>
        </h3>
      </div>

      <div className="user-actions">
        <Link to={`/userdetails/${_id}`}>
          <button className="update-btn">Update</button>
        </Link>
        <button onClick={deleteHandler} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
}

export default Users;
