import React, { useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { UserContext } from '../../context/user';
export const Layout = ({ children }) => {

  const [user,setUser]=useContext(UserContext);
return(
<div className='container'>
<Nav
  activeKey="/items"
>  
{ user ?
  <Nav.Item>
    <Nav.Link href="login"><b>Log Out</b></Nav.Link>
  </Nav.Item>
  :
<Nav.Item>
    <Nav.Link href="login">Login</Nav.Link>
  </Nav.Item>

}
  <Nav.Item>
    <Nav.Link href="items">Items</Nav.Link>
  </Nav.Item>
</Nav>
{children}
</div>
);

}