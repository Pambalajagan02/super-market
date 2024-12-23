import React from 'react';
import './common.css'
import Header from '../header/Header';

function Contact() {
  return (
   <>
   <Header/>
   <div className='d-flex flex-column justify-content-center p-5'>
   <div className="contact-container">
      <h1>Contact Us</h1>
      <p>We'd love to hear from you! Please fill out the form below to get in touch.</p>
      <form className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" placeholder="Your Name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" placeholder="Your Email" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" rows="5" placeholder="Your Message" required></textarea>
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>

   </div>
  
   
   </>
  );
}

export default Contact;
