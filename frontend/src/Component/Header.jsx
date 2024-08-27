import Container from "react-bootstrap/Container";
import { Fragment } from "react";
import { Nav, Navbar, Badge, NavDropdown } from "react-bootstrap";
import { FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LogOut } from "../ReduxTolkit/Reducer/AuthReducer";
import { toast } from "react-toastify";
import { useLoginMutation, useLogoutMutation } from "../ReduxTolkit/Slice/UsersApiSlice";
import { useNavigate } from "react-router-dom";
function Header() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.Auth);
  const [logoutApiCall] = useLogoutMutation()
  const navigat = useNavigate();
  const onclick = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(LogOut());
      navigat("/");
      toast.success("Logged Out Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <Navbar expand="lg" bg="dark" variant="dark" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>MERN App</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user ? (
              <Fragment>
                <NavDropdown title={user.name} id="username">
                  <LinkContainer to={"/profile"}>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={onclick}>LogOut</NavDropdown.Item>
                </NavDropdown>
              </Fragment>
            ) : (
              <Fragment>
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaSignInAlt /> Sign In
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>
                    <FaSignOutAlt /> Sign Up
                  </Nav.Link>
                </LinkContainer>
              </Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
