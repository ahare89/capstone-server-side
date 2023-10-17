import { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
Button,
Collapse,
Nav,
NavLink,
NavItem,
Navbar,
NavbarBrand,
NavbarToggler,
} from "reactstrap";
import { logout } from "../managers/authManager";
import "./NavBar.css"

export default function NavBar({ loggedInUser, setLoggedInUser }) {
const [open, setOpen] = useState(false);

const toggleNavbar = () => setOpen(!open);

return (
    <div>
    <Navbar color="light" light fixed="true" expand="lg">
        <NavbarBrand className="mr-auto" tag={RRNavLink} to="/">
        🧹🧼Cleanerby
        </NavbarBrand>
        {loggedInUser ? (
        <>
            <NavbarToggler onClick={toggleNavbar} />
            <Collapse isOpen={open} navbar>
            <Nav navbar>
                <NavItem>
                    <NavLink tag={RRNavLink} to="/cleanme">
                        Available for Cleaning
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={RRNavLink} to="/properties">
                        All Properties
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={RRNavLink} to="/profile">
                        My Profile
                    </NavLink>
                </NavItem>
            </Nav>
            </Collapse>
            <Button
            color="primary"
            onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                logout().then(() => {
                setLoggedInUser(null);
                setOpen(false);
                });
            }}
            >
            Logout
            </Button>
        </>
        ) : (
        <Nav navbar>
            <NavItem>
            <NavLink tag={RRNavLink} to="/login">
                <Button color="primary">Login</Button>
            </NavLink>
            </NavItem>
        </Nav>
        )}
         <NavItem className="navlink">
            {loggedInUser?.roles.includes("Admin") && (
            <NavLink tag={RRNavLink} to={"/userprofiles"} >
                User Profiles
            </NavLink>
            )}
        </NavItem>
    </Navbar>
    </div>
);
}