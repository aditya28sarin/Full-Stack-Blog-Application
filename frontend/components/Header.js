import { useState } from 'react';
import {APP_NAME} from '../config';
import Link from 'next/link';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Navbar color="light" light expand="md">
       <Link href="/">
            <NavLink className="font-weight-bold">{APP_NAME}</NavLink>
       </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
            <Link href="/signin">
                    <NavLink>SignIn</NavLink>
            </Link>
            </NavItem>
            <NavItem>    
                  <Link href="/signup">
                    <NavLink>SignUp</NavLink>
                  </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;