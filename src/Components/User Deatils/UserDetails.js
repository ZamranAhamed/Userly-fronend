import React, { useEffect, useRef, useState } from "react";
import Nav from "../Home/Nav/Nav";
import axios from "axios";
import Users from "../Users/Users";
import { useReactToPrint } from "react-to-print";
import "./userDetails.css";

const url = "http://localhost:5000/users";

const fetchHandler = async () => {
  return await axios.get(url).then((res) => res.data);
};

function UserDetails() {
  const [users, setUsers] = useState([]);
  const componentRef = useRef(null);

  useEffect(() => {
    fetchHandler().then((data) => setUsers(data.users));
  }, []);

  //Print the all users details
  const handlePrint = useReactToPrint({
    content: () => {
      console.log("componentRef.current:", componentRef.current);
      return componentRef.current;
    },
    documentTitle: "Users Report",
    onAfterPrint: () => alert("Users Report Successfully Downloaded!"),
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredUsers = data.users.filter((user) =>
        Object.values(user).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setUsers(filteredUsers);
      setNoResults(filteredUsers.length === 0);
    });
  };

  const handleSendReport = () => {
    //Create the whatsapp chat URL
    const phoneNumber = "+94729065778";
    const message = `selected user reports`;
    const WhatsAppURL = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;

    //open the whatsapp chat in new Window
    window.open(WhatsAppURL, "_blank");
  };

  return (
    <div className="user-details-container">
      <Nav />
      <h1 className="page-title">User Details</h1>
      <div className="search-section">
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          name="search"
          placeholder="Search User Details"
          className="search-input"
        />
        <button onClick={handleSearch} className="search-btn">
          Search
        </button>
      </div>

      {noResults ? (
        <div className="no-results">
          <p>No Users Found</p>
        </div>
      ) : (
        <div ref={componentRef} className="user-report">
          <h2>Users Report</h2>
          {users.length > 0 ? (
            <div className="user-cards-container">
              {users.map((user, i) => (
                <div key={i} className="user-card">
                  <Users user={user} />
                </div>
              ))}
            </div>
          ) : (
            <p>Loading users...</p>
          )}
        </div>
      )}

      <div className="action-buttons">
        <button onClick={handlePrint} className="report-btn">
          Download Report
        </button>
        <button onClick={handleSendReport} className="whatsapp-btn">
          Send WhatsApp Message
        </button>
      </div>
    </div>
  );
}

export default UserDetails;
