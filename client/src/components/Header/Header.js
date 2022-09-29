import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// dùng hook useNavigate để chuyển trang
const Header = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);
  const navigate = useNavigate();

  const handleLogin = () => {
    // ấn vào login sẽ chuyển trang
    navigate("/login");
  };

  const handleRegister = () => {
    // ấn vào login sẽ chuyển trang
    navigate("/register");
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        {/* <Navbar.Brand href="#home">Hoang</Navbar.Brand> */}
        <NavLink to="/" className="navbar-brand fs-1   ">
          MoonCoin
        </NavLink>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link fs-5">
              Home
            </NavLink>
            <NavLink to="/admins" className="nav-link fs-5">
              Dashboard
            </NavLink>
            <NavLink to="/crypto" className="nav-link fs-5">
              Crypto
            </NavLink>

            {/* <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/users">Users</Nav.Link>
            <Nav.Link href="/admins">Admin</Nav.Link> */}
          </Nav>
          <Nav>
            {/* <button className="btn-login" onClick={() => handleLogin()}>
              Login
            </button>

            <button className="btn-signup" onClick={() => handleRegister()}>
              Sign up
            </button> */}

            {isAuthenticated === false ? (
              <>
                <button className="btn-login" onClick={() => handleLogin()}>
                  Login
                </button>

                <button className="btn-signup" onClick={() => handleRegister()}>
                  Sign up
                </button>
              </>
            ) : (
              <NavDropdown title="Settings" id="basic-nav-dropdown">
                <NavDropdown.Item>Log out</NavDropdown.Item>
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
