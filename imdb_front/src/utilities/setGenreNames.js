const setGenreNames = (data, genres) => {
  const genreMap = genres.reduce((map, genre) => {
    map[genre.id] = genre.name;
    return map;
  }, {});

  const updatedData = { ...data };
  if (Array.isArray(updatedData.results)) {
    updatedData.results.forEach((item) => {
      if (item.genre_ids) {
        item.genres = item.genre_ids.map((id) => ({
          id,
          name: genreMap[id],
        }));
      }
    });
  } else if (updatedData) {
    if (updatedData.genre_ids) {
      updatedData.genres = updatedData.genre_ids.map((id) => ({
        id,
        name: genreMap[id],
      }));
    }
  }

  return updatedData;
};
export { setGenreNames };
