import React from 'react'
import Header from '../header/Header'

function About() {
  return (
   <>
   <Header/>
   <div className="about-page d-flex flex-column justify-content-center">
  <div className="about-content">
    <h1>About Supermarket Management System</h1>
    <p>
      Welcome to the Supermarket Management System, your all-in-one solution for efficiently managing and streamlining supermarket operations. 
      Our platform is designed to simplify tasks like inventory tracking, billing, customer management, and sales analysis, providing a seamless experience for store owners and administrators.
    </p>
    <p>
      Whether you're managing a small grocery store or a large supermarket chain, our system is tailored to meet your needs. 
      Enjoy features such as real-time inventory updates, detailed sales reports, and intuitive tools to manage products, categories, and customer records with ease.
    </p>
    <p>
      Start managing your supermarket smarter and more efficiently today, and discover how our system can transform your business operations!
    </p>
  </div>
</div>
   </>

  )
}

export default About