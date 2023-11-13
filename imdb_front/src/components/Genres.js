import React from "react";

const Genres = ({ data, genres, searchParams, setSearchParams }) => {
  let currentPageGenres = [];
  if (!genres) {
    data.forEach((show) => {
      // check if includes dynamicData from server db
      const showGenres = show.dynamicData?.genres || show.genres;
      if (showGenres) {
        showGenres.forEach((genre) => {
          const genreId = genre.id;
          const existingGenre = currentPageGenres.find(
            (existing) => existing.id === genreId
          );
          if (!existingGenre) {
            currentPageGenres.push({ id: genreId, name: genre.name });
          }
        });
      }
    });
  } else {
    currentPageGenres = genres;
  }
  const selectedGenres = searchParams
    .getAll("with_genres")
    .flatMap((genres) => genres.split(",").map(String));
  const addGenre = (genreId) => {
    setSearchParams(
      (prev) => {
        const updatedGenres = [...selectedGenres, genreId];
        prev.set("with_genres", updatedGenres);
        return prev;
      },
      { replace: true }
    );
  };

  const removeGenre = (genreId) => {
    setSearchParams(
      (prev) => {
        const updatedGenres = selectedGenres.filter(
          (genre) => genre !== genreId
        );

        if (updatedGenres.length > 0) {
          prev.set("with_genres", updatedGenres);
        } else {
          prev.delete("with_genres");
        }

        return prev;
      },
      { replace: true }
    );
  };

  return (
    <div className="genres-container flex flex-wrap gap-5 justify-center ">
      {currentPageGenres.map((genre) => (
        <div
          className={
            selectedGenres.includes(genre.id.toString())
              ? "genre selected"
              : "genre"
          }
          key={genre.id}
          onClick={() => {
            if (selectedGenres.includes(genre.id.toString())) {
              removeGenre(genre.id.toString());
            } else {
              addGenre(genre.id.toString());
            }
          }}
        >
          <p> {genre.name}</p>
          {selectedGenres.includes(genre.id.toString()) ? (
            <button
              className="close-current"
              onClick={() => removeGenre(genre.id.toString())}
            >
              x
            </button>
          ) : (
            <></>
          )}
        </div>
      ))}
      <button
        onClick={() =>
          setSearchParams((prev) => {
            prev.delete("with_genres");
            return prev;
          })
        }
      >
        Clear Genres
      </button>
    </div>
  );
};

export default Genres;
