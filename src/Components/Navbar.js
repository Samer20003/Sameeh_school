import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const HomeNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        {/* Logo */}
        <Navbar.Brand href="#home">
          <h1 style={{ fontSize: '1.5rem', margin: 0 }}>سماره لتدريب السياقه</h1>
        </Navbar.Brand>

        {/* Hamburger Menu for Mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navbar Links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#private">خصوصي</Nav.Link>
            <Nav.Link href="#commercial">تجاري</Nav.Link>
            <Nav.Link href="#signals">اشارات</Nav.Link>
            <Nav.Link href="#contact">تواصل معنا</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HomeNavbar;