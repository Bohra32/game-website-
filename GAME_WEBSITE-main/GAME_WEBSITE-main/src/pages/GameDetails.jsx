import { useParams } from "react-router-dom";
import { Spinner, Row, Col, Card, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { fetchGameDetails } from "../api";
import "../styles/GameDetails.css"; // Import updated CSS

function GameDetailPage() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    if (!id) return;

    const loadGameDetails = async () => {
      setIsLoading(true);
      try {
        console.log("Fetching game details for ID:", id);
        const result = await fetchGameDetails(id);
        console.log("Game Details:", result);
        setGame(result);
      } catch (err) {
        console.error("Error fetching game details:", err);
        setError(err);
      }
      setIsLoading(false);
    };

    loadGameDetails();
  }, [id]);

  if (isLoading) return <p className="loading">Loading game details...</p>;
  if (error) return <p className="error">Error: {error.message}</p>;
  if (!game) return <p className="error">No game found.</p>;

  return (
    <Container className="game-detail-container mt-4">
      <Row className="align-items-start">
        <Col md={7} className="game-info">
          <h2 className="text-danger mt-5">{game.name}</h2>
          <div className="game-rating">
            {Array.from({ length: Math.round(game.rating) }, (_, i) => (
              <span key={i} className="star">⭐</span>
            ))}
            <span className="rating-text"> {game.rating} / 5</span>
          </div>
          <p className="game-release">🗓 Released: {game.released || "Unknown"}</p>
          <p className="game-description">
            {showFullDescription
              ? game.description_raw
              : `${game.description_raw?.substring(0, 150) ?? ''}...`}
            <span className="read-more" onClick={() => setShowFullDescription(!showFullDescription)}>
              {showFullDescription ? " Show Less" : " Read More"}
            </span>
          </p>
          <GameAttributes game={game} />
        </Col>

       
        <Col md={5} className="game-trailer">
          <GameTrailer gameId={game.id} />
        </Col>
      </Row>

     
      <Row className="mt-4">
        <Col>
          <GameScreenshots gameId={game.id} />
        </Col>
      </Row>
    </Container>
  );
}

const GameAttributes = ({ game }) => (
  <div className="game-attributes mt-3 text-primary ">
    <p><strong>Platforms:</strong> {game.parent_platforms?.map(({ platform }) => platform.name).join(', ') || "N/A"}</p>
    <p><strong>Metascore:</strong> {game.metacritic ?? "N/A"}</p>
    <p><strong>Genres:</strong> {game.genres?.map((genre) => genre.name).join(', ') || "N/A"}</p>
    <p><strong>Publishers:</strong> {game.publishers?.map((publisher) => publisher.name).join(', ') || "N/A"}</p>
  </div>
);

const GameScreenshots = ({ gameId }) => {
  const [screenshots, setScreenshots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScreenshots = async () => {
      try {
        console.log("Fetching screenshots for game ID:", gameId);
        const response = await fetch(`https://api.rawg.io/api/games/${gameId}/screenshots?key=${import.meta.env.VITE_RAWG_API_KEY}`);
        if (!response.ok) throw new Error("Failed to fetch screenshots");
        const data = await response.json();
        setScreenshots(data.results || []);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };

    fetchScreenshots();
  }, [gameId]);

  if (isLoading) return null;
  if (error) return <p className="error">Error loading screenshots: {error}</p>;
  if (screenshots.length === 0) return <p className="no-content">No screenshots available.</p>;

  return (
    <Row className="game-screenshots">
      {screenshots.map((file) => (
        <Col md={4} key={file.id} className="mb-3">
          <Card className="screenshot-card">
            <Card.Img src={file.image} alt="Screenshot" />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

const GameTrailer = ({ gameId }) => {
  const [trailer, setTrailer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        console.log("Fetching trailer for game ID:", gameId);
        const response = await fetch(`https://api.rawg.io/api/games/${gameId}/movies?key=${import.meta.env.VITE_RAWG_API_KEY}`);
        if (!response.ok) throw new Error("Failed to fetch trailer");
        const data = await response.json();
        setTrailer(data.results.length > 0 ? data.results[0] : null);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };

    fetchTrailer();
  }, [gameId]);

  if (isLoading) return <Spinner animation="border" />;
  if (error) return <p className="error">Error loading trailer: {error}</p>;
  if (!trailer) return <p className="no-content">No trailer available.</p>;

  return (
    <video controls className="trailer-video" src={trailer.data[480]} poster={trailer.preview} />
  );
};

export default GameDetailPage;
