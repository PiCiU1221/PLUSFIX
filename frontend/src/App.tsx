import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./layout/Layout.tsx";
import LandingPage from "./pages/user/LandingPage.tsx";
import SearchPage from "./pages/user/SearchPage.tsx";
import FavoritesPage from "./pages/user/FavoritesPage.tsx";
import ShowDetailsPage from "./pages/user/ShowDetailsPage.tsx";
import RatingPage from "./pages/user/RatingPage.tsx";
import AnimatedRoutes from "./components/AnimatedRoutes";
import ModeratorDashboard from "./pages/moderator/ModeratorDashboard.tsx";
import ModeratorLogin from "./pages/moderator/ModeratorLogin.tsx";
import SettingsPage from "./pages/user/SettingsPage.tsx";
import WatchedPage from "./pages/user/WatchedPage.tsx";

const routes = [
    { path: "/", element: <LandingPage /> },
    { path: "/search", element: <SearchPage /> },
    { path: "/favorites", element: <FavoritesPage /> },
    { path: "/watched", element: <WatchedPage /> },
    { path: "/details/:id", element: <ShowDetailsPage /> },
    { path: "/rate/:id", element: <RatingPage /> },
    { path: "/moderator-login", element: <ModeratorLogin /> },
    { path: "/moderator", element: <ModeratorDashboard /> },
    { path: "/settings", element: <SettingsPage /> },
];

function App() {
    return (
        <Router>
            <Layout>
                <AnimatedRoutes routes={routes} />
            </Layout>
        </Router>
    );
}

export default App;
