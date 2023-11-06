import React from "react";

const Genres = ({ data, setSelectedGenres }) => {
  const genres = [];
  //   implement x button to clear selected genre
  data.forEach((show) => {
    show.genres.forEach((genre) => {
      const genreId = genre.id;
      const existingGenre = genres.find((existing) => existing.id === genreId);

      if (!existingGenre) {
        genres.push({ id: genreId, name: genre.name });
      }
    });
  });

  return (
    <div className="genres-container flex flex-wrap gap-5 justify-center ">
      {genres.map((genre) => (
        <div
          className="genre"
          key={genre.id}
          onClick={() =>
            setSelectedGenres((prevSelectedGenres) => [
              ...prevSelectedGenres,
              genre.id,
            ])
          }
        >
          {genre.name}
        </div>
      ))}

      <button
        onClick={() => setSelectedGenres([])}
        style={{ fontSize: "16px", marginLeft: "5px" }}
      >
        Clear
      </button>
    </div>
  );
};

export default Genres;
