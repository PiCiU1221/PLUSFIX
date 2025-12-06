import { Button } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SortIcon from '@mui/icons-material/Sort';

interface SortButtonProps {
    label: string;
    state: 'asc' | 'desc' | null;
    onClick: () => void;
}

function SortButton({ label, state, onClick }: SortButtonProps) {
    const isActive = state !== null;

    return (
        <Button
            fullWidth
            size="large"
            onClick={onClick}
            variant={isActive ? "contained" : "outlined"}
            color={isActive ? "primary" : "inherit"}
            startIcon={state === 'asc' ? <ArrowUpwardIcon /> : state === 'desc' ? <ArrowDownwardIcon /> : <SortIcon />}
            sx={{
                height: '100%',
                borderColor: !isActive ? 'rgba(0, 0, 0, 0.23)' : undefined,
                color: !isActive ? 'text.secondary' : undefined,
                '&:hover': !isActive ? {
                    borderColor: 'text.primary',
                    color: 'text.primary',
                    backgroundColor: 'transparent'
                } : undefined
            }}
        >
            {label}
        </Button>
    );
}

export default SortButton;