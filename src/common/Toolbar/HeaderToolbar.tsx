import React, { Dispatch, SetStateAction } from "react";
import {
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Tooltip,
  Select,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FilterListIcon from "@mui/icons-material/FilterList";

interface HeaderToolbarProps {
  title: string;
  setOpenAddModal: Dispatch<SetStateAction<boolean>>;
}

const HeaderToolbar: React.FC<HeaderToolbarProps> = ({
  title,
  setOpenAddModal,
}) => {
  // Sample filter options
  const filterOptions = [
    { label: "All", value: "all" },
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
  ];

  const addEntity = () => {
    if (title === "EVENTS" || "APPLICATIONS") {
      setOpenAddModal(true);
    }
  };

  return (
    <Toolbar
      variant="dense"
      sx={{
        width: "100%",
        marginTop: "20px",
        backgroundColor: "#2196F3", // Blue background color
        color: "white", // Text color
        borderRadius: "8px", // Border radius
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Box shadow
        padding: "8px 16px", // Padding
        alignItems: "center", // Center items vertically
        justifyContent: "space-between", // Space evenly
        "& .MuiInputBase-input": {
          color: "white", // Input text color
        },
        "& .MuiSelect-root": {
          color: "white", // Select text color
        },
        "& .MuiSelect-icon": {
          color: "white", // Select icon color
        },
        "& .MuiIconButton-root": {
          color: "white", // Icon button color
        },
        "@media (prefers-color-scheme: dark)": {
          // Media query for dark theme
          backgroundColor: "#1976D2", // Light bluish background color for dark theme
        },
      }}
    >
      <div>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
      </div>
      {/* Search Box */}
      <div style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "16px",
            backgroundColor: "rgba(255, 255, 255, 0.1)", // Search box background color
            borderRadius: "4px", // Search box border radius
            padding: "4px 8px", // Search box padding
          }}
        >
          <SearchIcon />
          <InputBase
            placeholder="Search..."
            inputProps={{ "aria-label": "search" }}
          />
        </div>
        {/* Filter Dropdown */}
        <div>
          <Select
            label="Filter"
            value="all"
            sx={{
              minWidth: "120px",
              color: "white", // Select text color
            }}
          >
            {filterOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {/* Filter Icon */}
          <FilterListIcon sx={{ marginLeft: "16px" }} />
        </div>
      </div>

      {/* Create Icon */}
      <Tooltip title="Create">
        <IconButton color="primary" onClick={addEntity}>
          <AddCircleIcon fontSize="large" />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

export default HeaderToolbar;
