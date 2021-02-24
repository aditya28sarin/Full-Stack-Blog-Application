import { useState } from 'react';
import {APP_NAME} from '../config';
import Link from 'next/link';
import {signout, isAuth} from '../actions/auth';
import Router from 'next/router';
import NProgress from 'nprogress';
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

import '.././node_modules/nprogress/nprogress.css';
import Search from './blog/Search';

Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Navbar color="light" light expand="md">
       <Link href="/">
            <NavLink className="font-weight-bold">{APP_NAME}</NavLink>
       </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>

          {isAuth() && isAuth().role === 0 && <> <NavItem>    
                    <Link href="/user">
                    <NavLink >{`${isAuth().name}'s Dashboard`}</NavLink>
                    </Link>
            </NavItem> </>}


          <> <NavItem>    
                    <Link href="/blogs">
                    <NavLink >Blogs</NavLink>
                    </Link>
            </NavItem> </>

            {isAuth() && isAuth().role === 1 && <> <NavItem>    
                    <Link href="/admin">
                    <NavLink >{`${isAuth().name}'s Dashboard`}</NavLink>
                    </Link>
            </NavItem> </>}

           {!isAuth() && <> 
            <NavItem>
            <Link href="/signin">
                    <NavLink style={{cursor: 'pointer'}}>SignIn</NavLink>
            </Link>
            </NavItem>
            <NavItem>    
                  <Link href="/signup">
                    <NavLink style={{cursor: 'pointer'}}>SignUp</NavLink>
                  </Link>
            </NavItem>
           </>}

            {isAuth() && <> <NavItem>    
                    <NavLink style={{cursor: 'pointer'}} onClick={() => {signout(()=>{ Router.push(`/signin`)})}}>SignOut</NavLink>
            </NavItem> </>}

          </Nav>
        </Collapse>
      </Navbar>
      <Search />
    </>
  );
};

export default Header;