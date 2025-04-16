import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button, Form, InputGroup } from "react-bootstrap";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaSearch, FaBars } from "react-icons/fa";
import { X } from "lucide-react";

let debounceTimer;

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();


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

  return (
    <header className="bg-dark shadow-sm fixed-top">
      <Container className="d-flex justify-content-between align-items-center py-2">
        <Link to="/" className="fw-bold text-light text-decoration-none">🎮 GameZone</Link>

        <div className="d-flex gap-5">
          <button
            type="button"
            className="btn btn-outline-light"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
          </button>

          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="success" onClick={() => setIsOpen(false)}>
                Login
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" className="btn btn-outline-light user-btn-lg" onClick={() => setIsOpen(false)} />
          </SignedIn>
        </div>
      </Container>

      {isOpen && (
        <nav className="bg-dark text-light p-3 position-absolute w-100 top-100 start-0 shadow">
          <Form className="d-flex mb-3" onSubmit={(e) => e.preventDefault()}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search games..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="warning" type="button">
                <FaSearch />
              </Button>
            </InputGroup>
          </Form>

          <Nav className="d-flex flex-column gap-2">
            <Button as={Link} to="/library" variant="outline-light" className="w-100" onClick={() => setIsOpen(false)}>
              📚 Library
            </Button>
          </Nav>
        </nav>
      )}
    </header>
  );
};

export default MobileNavbar;
