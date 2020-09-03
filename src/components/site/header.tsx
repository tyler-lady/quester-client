import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from "reactstrap";
import "../../App.css";


  
  type HeaderProps = {
    message?:  ""
  }
  
  class Header extends React.Component <HeaderProps> {
    constructor(props: HeaderProps){
      super(props)
    }
  
    render(){
      return (
        <header className="header-container">
            <Navbar className="header">
            <NavbarBrand href="/">Quester</NavbarBrand>
                <Nav className="ml-auto" navbar>
                <NavItem>
                        <NavLink href="https://github.com/tyler-lady">
                            Github
                        </NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </header>
      );
    }
  }
  
  export default Header;