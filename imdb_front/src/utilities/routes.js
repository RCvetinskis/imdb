import MainPage from "../pages/MainPage";
import SearchPage from "../pages/SearchPage";
import TvPage from "../pages/TvPage";
import SettingsPage from "../pages/accPages/SettingsPage";
import LikedMoviesPage from "../pages/accPages/LikedMoviesPage";
import LikedTvShowsPage from "../pages/accPages/LikedTvShowsPage";
import MoviePage from "../pages/MoviePage";
import DiscoverMovies from "../pages/discoverPages/DiscoverMovies";
import DiscoverTv from "../pages/discoverPages/DiscoverTv";
import NotFound from "../pages/NotFound";
import TopRatedMovies from "../pages/topRated/TopRatedMovies";
import TopRatedTv from "../pages/topRated/TopRatedTv";
import SeenTvPage from "../pages/accPages/SeenTvPage";
import SeenMoviesPage from "../pages/accPages/SeenMoviesPage";
import EpisodePage from "../pages/EpisodePage";
import SeasonPage from "../pages/SeasonPage";

const rootRoute = { path: "/", element: <MainPage /> };
const routes = [
  { path: "/home", element: <MainPage /> },
  { path: "/top_movies", element: <TopRatedMovies /> },
  { path: "/top_shows", element: <TopRatedTv /> },
  { path: "/discover/movie", element: <DiscoverMovies /> },
  { path: "/discover/tv", element: <DiscoverTv /> },
  { path: "/movie/:movieId", element: <MoviePage /> },
  { path: "/tv/:tvId", element: <TvPage /> },
  {
    path: "/tv/:tvId/season/:seasonNo",
    element: <SeasonPage />,
  },
  {
    path: "/tv/:tvId/season/:seasonNo/episode/:episodeNo",
    element: <EpisodePage />,
  },
  { path: "/search/:title", element: <SearchPage /> },
  { path: "*", element: <NotFound /> },
];
const accountRoutes = [
  { path: "/settings", element: <SettingsPage /> },
  { path: "/liked_movies", element: <LikedMoviesPage /> },
  { path: "/liked_shows", element: <LikedTvShowsPage /> },
  { path: "/already_seen_movies", element: <SeenMoviesPage /> },
  { path: "/already_seen_tv", element: <SeenTvPage /> },
];

export { accountRoutes, routes, rootRoute };
