import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@clerk/clerk-react";  
import { useNavigate } from "react-router-dom"; 
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { removeGame, setSavedGames } from "../redux/slices/gameSlice";  

const Library = () => {
  const dispatch = useDispatch();
  const savedGames = useSelector((state) => state.games.savedGames);
  const { userId, isLoaded } = useAuth(); 
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [userId, isLoaded, navigate]);

  useEffect(() => {
    if (userId) {
      const savedGamesFromLocalStorage = JSON.parse(localStorage.getItem("savedGames")) || [];
      dispatch(setSavedGames(savedGamesFromLocalStorage));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (userId) {
      localStorage.setItem("savedGames", JSON.stringify(savedGames));
    }
  }, [userId, savedGames]);

  return (
    <Container className="mt-5 pt-5 text-white">
      <h2 className="text-center">🎮 My Game Library</h2>
      <Row>
        {savedGames.length === 0 ? (
          <p className="text-center">No games saved yet. Start adding your favorites!</p>
        ) : (
          savedGames.map((game) => (
            <Col key={game.id} md={4} className="mb-4">
              <Card className="bg-dark text-light">
                <Card.Img variant="top" src={game.background_image} />
                <Card.Body>
                  <Card.Title>{game.name}</Card.Title>
                  <Card.Text>
                    <strong>Rating:</strong> {game.rating} ⭐<br />
                    <strong>Platforms:</strong> {game.platforms?.map(p => p.platform.name).join(", ") || "Unknown"}<br />
                    <strong>Genres:</strong> {game.genres?.map(g => g.name).join(", ") || "Unknown"}
                  </Card.Text>
                  <Button 
                    variant="danger"
                    onClick={() => dispatch(removeGame(game.id))}
                  >
                    Remove from Library ❌
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default Library;
