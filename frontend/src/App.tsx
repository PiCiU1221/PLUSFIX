import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import SearchPage from "./pages/SearchPage";
import FavoritesPage from "./pages/FavoritesPage";
import ShowDetailsPage from "./pages/ShowDetailsPage";
import RatingPage from "./pages/RatingPage";
import AnimatedRoutes from "./components/AnimatedRoutes";

const routes = [
    { path: "/", element: <LandingPage /> },
    { path: "/search", element: <SearchPage /> },
    { path: "/favorites", element: <FavoritesPage /> },
    { path: "/details/:id", element: <ShowDetailsPage /> },
    { path: "/rate/:id", element: <RatingPage /> },
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
