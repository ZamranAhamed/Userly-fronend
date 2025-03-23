import Nav from "../Home/Nav/Nav";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./contactUs.css";

function ContactUs() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", form.current, {
        publicKey: "YOUR_PUBLIC_KEY",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <div className="contact-us-container">
      <Nav />
      <h1 className="contact-us-title">Contact Us</h1>
      <form ref={form} onSubmit={sendEmail} className="contact-us-form">
        <label className="form-label">Name</label>
        <input type="text" name="user_name" className="form-input" />

        <label className="form-label">Email</label>
        <input type="email" name="user_email" className="form-input" />

        <label className="form-label">Message</label>
        <textarea name="message" className="form-textarea"></textarea>

        <input type="submit" value="Send" className="submit-btn" />
      </form>
      <div className="contact-info">
        <p>For any inquiries, you can reach us at:</p>
        <p>
          Email: <a href="mailto:support@example.com">userly@example.com</a>
        </p>
        <p>Phone: +94 771542545</p>
      </div>
    </div>
  );
}

export default ContactUs;
