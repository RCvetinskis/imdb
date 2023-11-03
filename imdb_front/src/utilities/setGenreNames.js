const setGenreNames = (data, genres) => {
  const genreMap = genres.reduce((map, genre) => {
    map[genre.id] = genre.name;
    return map;
  }, {});

  const updatedData = { ...data };
  if (updatedData.results && Array.isArray(updatedData.results)) {
    updatedData.results.forEach((item) => {
      if (item.genre_ids && Array.isArray(item.genre_ids)) {
        item.genre_names = item.genre_ids.map((id) => genreMap[id]);
      }
    });
  }

  return updatedData;
};
export { setGenreNames };
