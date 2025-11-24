import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import SearchPage from "./pages/SearchPage";
import FavoritesPage from "./pages/FavoritesPage";
import ShowDetailsPage from "./pages/ShowDetailsPage";
import RatingPage from "./pages/RatingPage";

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/favorites" element={<FavoritesPage />} />
                    <Route path="/details/:id" element={<ShowDetailsPage />} />
                    <Route path="/rate/:id" element={<RatingPage />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App
