import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./layout/Layout";
import LandingPage from "./pages/user/LandingPage";
import SearchPage from "./pages/user/SearchPage";
import FavoritesPage from "./pages/user/FavoritesPage";
import ShowDetailsPage from "./pages/user/ShowDetailsPage";
import RatingPage from "./pages/user/RatingPage";
import AnimatedRoutes from "./components/AnimatedRoutes";
import ModeratorDashboard from "./pages/moderator/ModeratorDashboard";
import ModeratorLogin from "./pages/moderator/ModeratorLogin";
import SettingsPage from "./pages/user/SettingsPage";
import WatchedPage from "./pages/user/WatchedPage";

type AppProps = {
    mode: "light" | "dark";
    setMode: React.Dispatch<React.SetStateAction<"light" | "dark">>;
};

function App({ mode, setMode }: AppProps) {
    const routes = [
        { path: "/", element: <LandingPage /> },
        { path: "/search", element: <SearchPage /> },
        { path: "/favorites", element: <FavoritesPage /> },
        { path: "/watched", element: <WatchedPage /> },
        { path: "/details/:id", element: <ShowDetailsPage /> },
        { path: "/rate/:id", element: <RatingPage /> },
        { path: "/moderator-login", element: <ModeratorLogin /> },
        { path: "/moderator", element: <ModeratorDashboard /> },

        // dark mode setters for the SettingsPage
        { path: "/settings", element: <SettingsPage mode={mode} setMode={setMode} /> },
    ];

    return (
        <Router>
            <Layout>
                <AnimatedRoutes routes={routes} />
            </Layout>
        </Router>
    );
}

export default App;
