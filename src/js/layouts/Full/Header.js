import React, { Component } from 'react';
import { Link as NavLink } from 'react-router-dom';
import {
  Container, Nav, NavItem
} from 'reactstrap';

class Header extends Component {
  render() {
    return (
      <div className="site-header">
        <Container>
          <Nav className="mt-4 justify-content-center">
            <NavItem>
              <NavLink to="/" className="nav-link">
                Files Teach
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/spaces" className="nav-link">
                Space Management
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="infotypes" className="nav-link">
                Information Type Management
              </NavLink>
            </NavItem>
          </Nav>
        </Container>
      </div>
    );
  }
}

export default Header;
