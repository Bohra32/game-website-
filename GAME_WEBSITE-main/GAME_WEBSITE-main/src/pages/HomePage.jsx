import React, { useState, useEffect } from "react";
import GameCard from "../components/GameCard";
import { Pagination } from "react-bootstrap";
import useIsMobile from "../hooks/useIsMobile";
import "../styles/HomePage.css";
import useScreenSize from "../hooks/useScreenSize";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const HomePage = () => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 6;
  const isMobile = useIsMobile();
  const screenSize = useScreenSize();
  const savedGames = useSelector((state) => state.games.savedGames); // ✅ used below

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [sortBy, setSortBy] = useState("popularity");

  const location = useLocation();
  const searchTerm = new URLSearchParams(location.search).get("q") || "";

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games?key=${import.meta.env.VITE_RAWG_API_KEY}`
        );
        setGames(response.data.results);
        setFilteredGames(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching games:", error);
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  useEffect(() => {
    let filtered = games;

    if (selectedCategory) {
      filtered = filtered.filter((game) =>
        game.genres.some((genre) => genre.name === selectedCategory)
      );
    }
    if (selectedTag) {
      filtered = filtered.filter((game) =>
        game.tags.some((tag) => tag.name === selectedTag)
      );
    }
    if (selectedYear) {
      filtered = filtered.filter((game) =>
        game.released?.includes(selectedYear)
      );
    }

    if (searchTerm) {
      filtered = filtered.filter((game) =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortBy === "popularity") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "release") {
      filtered.sort((a, b) => new Date(b.released) - new Date(a.released));
    }

    setFilteredGames(filtered);
    setCurrentPage(1);
  }, [selectedCategory, selectedTag, selectedYear, sortBy, games, searchTerm]);

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);

  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="home-container">
      <aside className={isMobile ? "filter-row" : "filter-sidebar"}>
        <h4 className="text-center mx-auto">Filters</h4>
        <div className={isMobile ? "filter-row" : "filter-container"}>
          <div className="filter-group">
            <label>Category:</label>
            <select onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="">All</option>
              <option value="Action">Action</option>
              <option value="Adventure">Adventure</option>
              <option value="RPG">RPG</option>
              <option value="Shooter">Shooter</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Tags:</label>
            <select onChange={(e) => setSelectedTag(e.target.value)}>
              <option value="">All</option>
              <option value="Multiplayer">Multiplayer</option>
              <option value="Singleplayer">Singleplayer</option>
              <option value="Open World">Open World</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Release Year:</label>
            <select onChange={(e) => setSelectedYear(e.target.value)}>
              <option value="">All</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Sort By:</label>
            <select onChange={(e) => setSortBy(e.target.value)}>
              <option value="popularity">Popularity</option>
              <option value="release">Release Date</option>
            </select>
          </div>
        </div>
      </aside>

      <div className="games-content">
        <h2 className="text-center mb-4 text-primary">🎮 Game Listings</h2>
        {searchTerm && (
          <p className="text-center text-muted">
            Showing results for <strong>"{searchTerm}"</strong>
          </p>
        )}
        <div className="games-grid">
          {loading ? (
            [...Array(gamesPerPage)].map((_, index) => (
              <div key={index} className="card skeleton-card">
                <div className="skeleton skeleton-image"></div>
                <div className="card-body">
                  <div className="skeleton skeleton-title"></div>
                  <div className="skeleton skeleton-text"></div>
                </div>
              </div>
            ))
          ) : filteredGames.length > 0 ? (
            currentGames.map((game) => (
              <GameCard key={game.id} game={game} savedGames={savedGames} /> // ✅ pass savedGames
            ))
          ) : (
            <p className="text-center w-100">
              🚫 No games found. Try a different filter or search.
            </p>
          )}
        </div>

        {filteredGames.length > 0 && (
          <Pagination className="pagination justify-content-center mt-5">
            <Pagination.Prev
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {Array.from({ length: totalPages }, (_, i) => (
              <Pagination.Item
                key={i + 1}
                active={currentPage === i + 1}
                onClick={() => goToPage(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default HomePage;
