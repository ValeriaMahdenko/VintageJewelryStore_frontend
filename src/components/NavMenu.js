import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

  }

  Signout()
  {
    localStorage.clear();
    document.location.reload();
  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">JewelryStore_Frontend</NavbarBrand>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                </NavItem>
                
                {
                localStorage["IsLogin"] ? <div class="head"> 
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/cart">Cart</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/account">Account</NavLink>
                </NavItem>
                 <button onClick={this.Signout}>Logout</button> </div> :
                 <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/login" display="true">Login</NavLink>
                </NavItem>
                }

              </ul>
          </Container>
        </Navbar>
      </header>
    );
  }
}
