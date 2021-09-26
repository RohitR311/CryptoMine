import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";
import "../styles/Header.css";

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const history = useHistory();

  const dispatch = useDispatch();

  const logoutHandler = () => {
    if (window.confirm("Are you sure you wanna logout?")) {
      dispatch(logout());
      history.push("/");
      // window.location.reload()
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>CryptoMine</Navbar.Brand>
          </LinkContainer>
          {userInfo ? (
            <LinkContainer className="watchlist" to="/watchlist">
              <Nav.Link className="watchlist-btn" href="/watchlist">
                Watchlist
              </Nav.Link>
            </LinkContainer>
          ) : (
            <></>
          )}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="nav">
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer className="login" to="/login">
                  <Nav.Link href="/login">Login</Nav.Link>
                </LinkContainer>
              )}

              {userInfo ? (
                <></>
              ) : (
                <LinkContainer className="signup" to="/register">
                  <Nav.Link className="register-btn" href="/register">
                    Sign up
                  </Nav.Link>
                </LinkContainer>
              )}

              {/* <SearchBox /> */}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenue">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
