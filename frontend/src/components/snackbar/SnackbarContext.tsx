import { createContext, useContext } from "react";

export interface SnackbarContextType {
    showMessage: (message: string, severity?: 'success' | 'error' | 'info' | 'warning') => void;
}

export const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error("useSnackbar must be used within a SnackbarProvider");
    }
    return context;
};