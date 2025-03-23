import React, { useState } from 'react'
import Nav from '../Home/Nav/Nav'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import './addUser.css';


function AddUser() {
    const history = useNavigate();
    const [inputs,setInputs] = useState({
        name:"",
        age:"",
        gmail:"",
        address:"",

    });
    const handleChange = (e)=>{
        setInputs((previousStage) => ({
            ...previousStage,
            [e.target.name]: e.target.value,
        }));
    }

    const sendRequest = async() => {
        await  axios.post("http://localhost:5000/users",{
            name: String(inputs.name),
            age: Number(inputs.age),
            gmail: String(inputs.gmail),
            address: String(inputs.address),
        })
        .then(res => res.data);
    }

const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log(inputs);
    await sendRequest();
    window.alert("User added successfully!");
    history('/userdetails');
};

  return (
    <div className="add-user-container">
  <Nav />
  <h1 className="page-title">Add User</h1>
  <form onSubmit={handleSubmit} className="user-form">
    <div className="form-group">
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        onChange={handleChange}
        value={inputs.name}
        required
        className="form-input"
      />
    </div>

    <div className="form-group">
      <label htmlFor="age">Age:</label>
      <input
        type="text"
        id="age"
        name="age"
        onChange={handleChange}
        value={inputs.age}
        required
        className="form-input"
      />
    </div>

    <div className="form-group">
      <label htmlFor="gmail">Gmail:</label>
      <input
        type="email"
        id="gmail"
        name="gmail"
        onChange={handleChange}
        value={inputs.gmail}
        required
        className="form-input"
      />
    </div>

    <div className="form-group">
      <label htmlFor="address">Address:</label>
      <textarea
        id="address"
        name="address"
        rows="3"
        onChange={handleChange}
        value={inputs.address}
        required
        className="form-input"
      />
    </div>

    <button type="submit" className="submit-btn">Submit</button>
  </form>
</div>

  )
}

export default AddUser
