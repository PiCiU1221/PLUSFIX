import { Container, Typography, Box, Tabs, Tab } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import ModeratorComments from "../../components/moderator/ModeratorComments";
import ModeratorCsvManager from "../../components/moderator/ModeratorCsvManager";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`moderator-tabpanel-${index}`}
            aria-labelledby={`moderator-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ py: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export default function ModeratorDashboard() {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const isAuthenticated = isLoggedIn();

    const [currentTab, setCurrentTab] = useState(0);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/moderator-login", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) {
        return null;
    }

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom fontWeight="bold">
                Moderator's Dashboard
            </Typography>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={currentTab} onChange={handleChange} aria-label="moderator dashboard tabs">
                    <Tab label="Comments Moderation" />
                    <Tab label="CSV Import/Export" />
                </Tabs>
            </Box>

            <CustomTabPanel value={currentTab} index={0}>
                <ModeratorComments />
            </CustomTabPanel>

            <CustomTabPanel value={currentTab} index={1}>
                <ModeratorCsvManager />
            </CustomTabPanel>
        </Container>
    );
}