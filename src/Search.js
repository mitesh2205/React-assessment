import React, { useState } from "react";
import './styles.css';

const moviesData = [
  { title: "The Matrix", rating: 7.5, category: "Action" },
  { title: "Focus", rating: 6.9, category: "Comedy" },
  { title: "The Lazarus Effect", rating: 6.4, category: "Thriller" },
  { title: "Everly", rating: 5.0, category: "Action" },
  { title: "Maps to the Stars", rating: 7.5, category: "Drama" }
];

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRatingChange = (e) => {
    const value = parseInt(e.target.value);
    setSelectedRatings(
      e.target.checked
        ? [...selectedRatings, value]
        : selectedRatings.filter((rating) => rating !== value)
    );
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 10 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {Array.from({ length: fullStars }, () => '★').join('')}
        {halfStar ? '☆' : ''}
        {Array.from({ length: emptyStars }, () => '☆').join('')}
      </>
    );
  };

  const filteredMovies = moviesData.filter((movie) => {
    const matchesTitle = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = selectedRatings.length
      ? selectedRatings.includes(Math.floor(movie.rating))
      : true;
    const matchesDropdownCategory = selectedCategory
      ? movie.category === selectedCategory
      : true;
    return matchesTitle && matchesRating && matchesDropdownCategory;
  });

  const isFiltered = searchTerm || selectedRatings.length || selectedCategory;

  return (
    <div className="Search">
      <h2>Search Movies</h2>
      <div>
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="dropdown">
          <button className="dropbtn">Rating</button>
          <div className="dropdown-content">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((rating) => (
              <label key={rating}>
                <input
                  type="checkbox"
                  value={rating}
                  onChange={handleRatingChange}
                />
                {Array.from({ length: rating }, (_, index) => '★').join('')}
              </label>
            ))}
          </div>
        </div>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">Category</option>
          {["Action", "Comedy", "Thriller", "Drama"].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      {isFiltered && (
        <ul>
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <li key={movie.title}>
                <div><strong>{movie.title}</strong></div>
                <div>{renderStars(movie.rating)}</div>
                <div>{movie.category}</div>
              </li>
            ))
          ) : (
            <li>No movies found.</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Search;
