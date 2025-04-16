import React, { useState, useEffect } from "react";
import {
  Navbar as BootstrapNavbar,
  Nav,
  Container,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaSearch } from "react-icons/fa";
import useIsMobile from "../hooks/useIsMobile";
import MobileNavbar from "./MobileNavbar";
import Login from "./Login";
import useScreenSize from "../hooks/useScreenSize";

let debounceTimer;

const MyNavbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const { isMobile: isSmall, isMedium } = useScreenSize();


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get("q") || "");
  }, [location.search]);

  
  useEffect(() => {
    if (debounceTimer) clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      const currentParams = new URLSearchParams(location.search);
      if (searchTerm.trim()) {
        currentParams.set("q", searchTerm);
        navigate(`${location.pathname}?${currentParams.toString()}`, { replace: true });
      } else {
        currentParams.delete("q");
        navigate(`${location.pathname}?${currentParams.toString()}`, { replace: true });
      }
    }, 500); 

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  return isSmall || isMedium ? (
    <MobileNavbar />
  ) : (
    <BootstrapNavbar expand="lg" bg="dark" variant="dark" className="py-1 shadow" fixed="top">
      <Container>
        <Link to="/" className="navbar-brand fw-bold">
          🎮 GameZone
        </Link>

        <BootstrapNavbar.Toggle aria-controls="navbar-content">
          <FaBars className="text-light" />
        </BootstrapNavbar.Toggle>

        <BootstrapNavbar.Collapse id="navbar-content">
          <Nav className="ms-auto d-flex align-items-center w-100">
            {/* Live Search */}
            <Form className="d-flex mx-auto w-50" onSubmit={(e) => e.preventDefault()}>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Search games..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="warning" type="submit">
                               <FaSearch />
                </Button>
              </InputGroup>
            </Form>

            <Button as={Link} to="/library" variant="outline-light" className="rounded-pill px-4 py-2 mx-3">
              📚 Library
            </Button>
            <Login />
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default MyNavbar;
