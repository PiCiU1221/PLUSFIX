import { Autocomplete, TextField } from "@mui/material";

interface Option {
    id: number;
    name: string;
}

interface AsyncFilterSelectProps {
    label: string;
    options: Option[];
    value: Option[];
    onChange: (value: Option[]) => void;
    onInputChange: (value: string) => void;
}

function AsyncFilterSelect({ label, options, value, onChange, onInputChange }: AsyncFilterSelectProps) {
    return (
        <Autocomplete
            multiple
            options={options}
            getOptionLabel={(option) => option.name}
            filterOptions={(x) => x}
            value={value}
            onChange={(_, newValue) => onChange(newValue)}
            onInputChange={(_, newInputValue) => onInputChange(newInputValue)}
            renderInput={(params) => <TextField {...params} label={label} />}
            isOptionEqualToValue={(option, value) => option.id === value.id}
        />
    );
}

export default AsyncFilterSelect;