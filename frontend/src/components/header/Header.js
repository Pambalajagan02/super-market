import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary fixed-top p-3 ">
  <Container>
    <Navbar.Brand href="/">Super-Market</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      {/* Navigation Links */}
      <Nav
        className="d-flex justify-content-center w-100 my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
      >
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/contact">Contact</Nav.Link>
        <Nav.Link href="/about">About</Nav.Link>
        <Nav.Link href="/additems">AddItem</Nav.Link>
      </Nav>

    </Navbar.Collapse>
  </Container>
</Navbar>

    
  )
}

export default Header