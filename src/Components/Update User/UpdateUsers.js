import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./updateUser.css";

function UpdateUsers() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5000/users/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.user));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:5000/users/${id}`, {
        name: String(inputs.name),
        age: Number(inputs.age),
        gmail: String(inputs.gmail),
        address: String(inputs.address),
      })
      .then((res) => res.data);
  };

  const handleChange = (e) => {
    setInputs((previousStage) => ({
      ...previousStage,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => {
      window.alert("User details updated successfully!");
      history("/userdetails");
    });
  };

  return (
    <div className="update-user-container">
      <h1 className="update-user-title">Update User</h1>
      <form onSubmit={handleSubmit} className="update-user-form">
        <label className="form-label">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
          value={inputs.name}
          required
          className="form-input"
        />

        <label className="form-label">Age:</label>
        <input
          type="text"
          id="age"
          name="age"
          onChange={handleChange}
          value={inputs.age}
          required
          className="form-input"
        />

        <label className="form-label">Gmail:</label>
        <input
          type="email"
          id="gmail"
          name="gmail"
          onChange={handleChange}
          value={inputs.gmail}
          required
          className="form-input"
        />

        <label className="form-label">Address:</label>
        <textarea
          id="address"
          name="address"
          rows="3"
          onChange={handleChange}
          value={inputs.address}
          required
          className="form-textarea"
        ></textarea>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default UpdateUsers;
