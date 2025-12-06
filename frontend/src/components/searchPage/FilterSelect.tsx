import { Autocomplete, TextField } from "@mui/material";
import type { Option } from "../../types/Option.tsx";

interface FilterSelectProps {
    label: string;
    multiple?: boolean;
    options?: Option[];
    value: Option | Option[] | null;
    onChange: (value: Option | Option[] | null) => void;
}

function FilterSelect({ label, multiple = false, options = [], value, onChange }: FilterSelectProps) {
    return (
        <Autocomplete
            multiple={multiple}
            options={options || []}
            getOptionLabel={(option) => option.name}
            value={value}
            onChange={(_, newValue) => onChange(newValue)}
            renderInput={(params) => <TextField {...params} label={label} />}
            isOptionEqualToValue={(option, value) => option.id === value.id}
        />
    );
}

export default FilterSelect;