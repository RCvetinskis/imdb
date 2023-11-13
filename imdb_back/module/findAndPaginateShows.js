module.exports = async (
  collection,
  query,
  page,
  limit,
  showsGenres,
  showsLanguages,
  moviesYearOnly,
  tvShowYearOnly,
  sortValue
) => {
  const totalResults = await collection.countDocuments(query);
  const totalPages = Math.ceil(totalResults / limit);
  const showsToSkip = (Number(page) - 1) * limit;
  const paginatedShows = await collection
    .find(query)
    .skip(showsToSkip)
    .limit(limit)
    .sort(sortValue);

  return {
    results: paginatedShows,
    total_pages: totalPages,
    total_results: totalResults,
    page: Number(page),
    genres: showsGenres,
    languages: showsLanguages,
    primary_release_year: moviesYearOnly,
    first_air_date_year: tvShowYearOnly,
  };
};
