import React from "react";

const Genres = ({ data, selectedGenres, setSelectedGenres }) => {
  const genres = [];

  data.forEach((show) => {
    show.genres.forEach((genre) => {
      const genreId = genre.id;
      const existingGenre = genres.find((existing) => existing.id === genreId);
      if (!existingGenre) {
        genres.push({ id: genreId, name: genre.name });
      }
    });
  });

  const addGenre = (genreId) => {
    setSelectedGenres((prevSelectedGenres) => [...prevSelectedGenres, genreId]);
  };

  const removeGenre = (genreId) => {
    setSelectedGenres((prevSelectedGenres) =>
      prevSelectedGenres.filter((selectedGenre) => selectedGenre !== genreId)
    );
  };

  return (
    <div className="genres-container flex flex-wrap gap-5 justify-center ">
      {genres.map((genre) => (
        <div
          className={
            selectedGenres.includes(genre.id) ? "genre selected" : "genre"
          }
          key={genre.id}
          onClick={() => {
            if (selectedGenres.includes(genre.id)) {
              removeGenre(genre.id);
            } else {
              addGenre(genre.id);
            }
          }}
        >
          <p> {genre.name}</p>
          {selectedGenres.includes(genre.id) ? (
            <button
              className="close-current"
              onClick={() => removeGenre(genre.id)}
            >
              x
            </button>
          ) : (
            <></>
          )}
        </div>
      ))}
      <button onClick={() => setSelectedGenres([])}>Clear All</button>
    </div>
  );
};

export default Genres;
