import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
// import { personalidades } from "../../data/mascotasOptions";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip({
  personalidades = [],
  labelName = "",
  value = "",
  handleChange,
  label = "",
  disabled,
}) {
  const theme = useTheme();
  //   const [personName, setPersonName] = React.useState([]);

  //   const handleChange = (event) => {
  //     const {
  //       target: { value },
  //     } = event;
  //     setPersonName(
  //       // On autofill we get a stringified value.
  //       typeof value === "string" ? value.split(",") : value
  //     );
  //   };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">{labelName}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          name={label}
          multiple
          value={value}
          onChange={handleChange}
          disabled={disabled}
          input={<OutlinedInput id="select-multiple-chip" label={labelName} />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {personalidades.map((item) => (
            <MenuItem
              key={item}
              value={item}
              style={getStyles(item, value, theme)}
            >
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
