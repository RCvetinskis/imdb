import MainPage from "../pages/MainPage";
import SearchPage from "../pages/SearchPage";
import TopRated from "../pages/TopRated";
import TvPage from "../pages/TvPage";
import SettingsPage from "../pages/accPages/SettingsPage";
import LikedMoviesPage from "../pages/accPages/LikedMoviesPage";
import LikedTvShowsPage from "../pages/accPages/LikedTvShowsPage";
import MoviePage from "../pages/MoviePage";
import DiscoverPage from "../pages/DiscoverPage";
const rootRoute = { path: "/", element: <MainPage /> };
const routes = [
  { path: "/", element: <MainPage /> },
  { path: "/top_movies", element: <TopRated type={"movie"} /> },
  { path: "/top_shows", element: <TopRated type={"tv"} /> },
  { path: "/discover", element: <DiscoverPage /> },
  { path: "/movie/:movieId", element: <MoviePage /> },
  { path: "/tv/:tvId", element: <TvPage /> },
  { path: "/search/:title", element: <SearchPage /> },
];
const accountRoutes = [
  { path: "/settings", element: <SettingsPage /> },
  { path: "/liked_movies", element: <LikedMoviesPage /> },
  { path: "/liked_shows", element: <LikedTvShowsPage /> },
];

export { accountRoutes, routes, rootRoute };
