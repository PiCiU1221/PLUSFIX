import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface AnimatedRouteProps {
    children: ReactNode;
}

export default function AnimatedRoute({ children }: AnimatedRouteProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            style={{ width: "100%" }}
        >
            {children}
        </motion.div>
    );
}
