import { Card, CardContent, Typography } from "@mui/material";

interface ShowCardProps {
    title: string;
    year?: string;
}

function ShowCard({ title, year }: ShowCardProps) {
    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Typography variant="h6">
                    {title}
                    {year ? ` (${year})` : ""}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default ShowCard;
