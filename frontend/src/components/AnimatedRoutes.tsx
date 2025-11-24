import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import AnimatedRoute from "./AnimatedRoute";
import type { JSX } from "react";

interface RouteConfig {
    path: string;
    element: JSX.Element;
}

export default function AnimatedRoutes({ routes }: { routes: RouteConfig[] }) {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                {routes.map(({ path, element }) => (
                    <Route
                        key={path}
                        path={path}
                        element={<AnimatedRoute>{element}</AnimatedRoute>}
                    />
                ))}
            </Routes>
        </AnimatePresence>
    );
}
