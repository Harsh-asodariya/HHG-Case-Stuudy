import { useState } from 'react';
import './navigation.css';
import { NavLink } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavbarBrand } from 'reactstrap';

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    
    return (
        <>
            <Navbar className="navigationbar sticky-top" light expand="md">
                <NavbarBrand href="hhgcasestudy">HHG Case Study</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className='mr-auto' navbar>
                        <NavItem>
                            <NavLink className='nav-link' activeClassName='active' to="/counter">Counter</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className='nav-link' activeClassName='active' to="/employees">Employees</NavLink>
                        </NavItem>
                    </Nav >
                </Collapse>
            </Navbar>

        </>
    )
}

export default Navigation;
