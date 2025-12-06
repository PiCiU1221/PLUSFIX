import { API_BASE_URL } from "../config.ts";
import {useSnackbar} from "../components/snackbar/SnackbarContext.tsx";

export function useAuth() {
    const { showMessage } = useSnackbar();

    const logout = async () => {
        const token = localStorage.getItem("auth_token");

        localStorage.removeItem("auth_token");
        localStorage.removeItem("user_info");

        try {
            await fetch(`${API_BASE_URL}/api/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                credentials: "include",
            });
        } catch (error) {
            console.error("Logout failed:", error);
            showMessage("Logout failed", "error");
            return;
        }

        showMessage("Successfully logged out", "success");
    };

    const isLoggedIn = () => !!localStorage.getItem("auth_token");

    return { logout, isLoggedIn };
}
