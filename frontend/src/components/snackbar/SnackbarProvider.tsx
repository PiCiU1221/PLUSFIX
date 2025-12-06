import {useState, type ReactNode, useCallback} from "react";
import { Snackbar, Alert } from "@mui/material";
import { SnackbarContext } from "./SnackbarContext";

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('info');

    const showMessage = useCallback((msg: string, sev: 'success' | 'error' | 'info' | 'warning' = 'info') => {
        setMessage(msg);
        setSeverity(sev);
        setOpen(true);
    }, []);

    const handleClose = () => setOpen(false);

    return (
        <SnackbarContext.Provider value={{ showMessage }}>
            {children}

            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};