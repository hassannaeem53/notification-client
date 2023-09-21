import React, { useState, Dispatch, SetStateAction } from "react";
import {
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Tooltip,
  Select,
  MenuItem,
  Menu,
  Switch,
} from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SortIcon from "@mui/icons-material/Sort";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { ArrowUpward, SortByAlpha } from "@mui/icons-material";

import "./HeaderToolbar.css";

interface HeaderToolbarProps {
  title: string;
  id?: string;
  onSet?: (id: string) => void;
  setSort?: (sort: string) => void;
  setSortby?: (sortby: string) => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  parentName?: string;
  setOpenAddModal: Dispatch<SetStateAction<boolean>>;
  active: boolean;
  onSetActive: () => void;
}

const HeaderToolbar: React.FC<HeaderToolbarProps> = ({
  title,
  id,
  onSet,
  setSort,
  setSortby,
  parentName,
  setOpenAddModal,
  active,
  onSetActive,
  setPage,
}) => {
  // Sample filter options
  const filterOptions = [
    {
      value: "name",
      label: "Name",
    },

    {
      value: "created_at",
      label: "Created At",
    },
    {
      value: "updated_at",
      label: "Updated At",
    },
  ];
  const [ascendingOrder, setAscendingOrder] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("name");
  const [filterAnchor, setFilterAnchor] = useState<null | HTMLElement>(null); // Store anchor element for the filter menu

  const toggleSortingOrder = () => {
    setAscendingOrder((prevOrder) => !prevOrder);
    if (setSort) {
      setSort(ascendingOrder ? "asc" : "desc");
      setPage(1);
    }
  };
  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterAnchor(event.currentTarget); // Open the filter menu
    // setPage(1); //resetting the page to show results
  };

  const handleFilterClose = () => {
    setFilterAnchor(null); // Close the filter menu
  };
  const renderButton = () => {
    if (title == "NOTIFICATIONS") {
      // If props.title is 'notification', render as a Link
      return (
        <Link to={`/notification-preview/${id}`}>
          <IconButton color="primary">
            <AddCircleIcon fontSize="large" />
          </IconButton>
        </Link>
      );
    } else {
      // Otherwise, render without Link
      return (
        <IconButton color="primary" onClick={addEntity}>
          <AddCircleIcon fontSize="large" />
        </IconButton>
      );
    }
  };

  const addEntity = () => {
    if (title === "EVENTS" || title === "APPLICATIONS") {
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
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          {parentName && (
            <div
              className="large-sort"
              style={{
                height: "20px",
                borderLeft: "1px solid white",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            ></div>
          )}
          {parentName && (
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: "#d3d3d3" }}
              className="large-sort"
            >
              {parentName}
            </Typography>
          )}
        </div>
      </div>
      {/* Search Box */}
      <div style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "16px",
            marginLeft: "16px",
            backgroundColor: "rgba(255, 255, 255, 0.1)", // Search box background color
            borderRadius: "4px", // Search box border radius
            padding: "4px 8px", // Search box padding
          }}
        >
          <SearchIcon />
          <InputBase
            placeholder="Search..."
            inputProps={{ "aria-label": "search", maxLength: 20 }}
            onChange={(e) => {
              if (onSet) {
                onSet(e.target.value); // Check if onSet is defined before invoking it
              }
            }}
            style={{
              flex: 1, // Take up remaining space in the flex container
              marginLeft: "8px", // Add some space between the icon and input field
            }}
          />
        </div>
        {/* Filter Dropdown */}
        <div className="small-medium-sort">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Tooltip title="Sort By">
              <IconButton
                onClick={handleFilterClick} // Open filter menu on button click
                color="primary"
                sx={{ marginLeft: "16px" }}
              >
                <SortByAlpha />
              </IconButton>
            </Tooltip>
            {/* Filter Menu */}
            <Menu
              anchorEl={filterAnchor}
              open={Boolean(filterAnchor)}
              onClose={handleFilterClose} // Close filter menu on menu item click or outside click
            >
              {filterOptions.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  onClick={() => {
                    handleFilterClose(); // Close filter menu on menu item click
                    if (setSortby) {
                      setSelectedFilter(option.value);
                      setSortby(option.value);
                    }
                  }}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Menu>
            {/* Filter Icon */}
            {ascendingOrder ? (
              <Tooltip title="Ascending">
                <div>
                  <ArrowUpward
                    sx={{
                      cursor: "pointer",
                      transform: "rotate(180deg)",
                      marginTop: "8px",
                    }}
                    onClick={toggleSortingOrder}
                    fontSize="small"
                  />
                </div>
              </Tooltip>
            ) : (
              <Tooltip title="Descending">
                <div>
                  <ArrowUpward
                    sx={{ cursor: "pointer", marginTop: "8px" }}
                    onClick={toggleSortingOrder}
                    fontSize="small"
                  />
                </div>
              </Tooltip>
            )}
            <Tooltip title={active ? "Active" : "InActive"}>
              <Switch
                checked={active}
                onClick={onSetActive}
                color="default"
                size="medium"
                checkedIcon={<CheckCircleIcon color="default" />}
              />
            </Tooltip>
          </div>
        </div>
        <div className="large-sort">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Tooltip title="Sort By">
              <Select
                label="Filter"
                value={selectedFilter}
                sx={{
                  minWidth: "120px",
                  border: "1px ",
                  color: "white", // Select text color
                }}
                onChange={(e) => {
                  if (setSortby) {
                    setSelectedFilter(e.target.value as string);
                    setSortby(e.target.value as string); // Check if setSort is defined before invoking it
                    setPage(1); //resetting page to show results of filter
                  }
                }}
              >
                {filterOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Tooltip>
            {/* Filter Icon */}

            {ascendingOrder ? (
              <Tooltip title="Descending">
                <div>
                  <SortIcon
                    sx={{
                      marginLeft: "16px",
                      cursor: "pointer",
                      transform: "rotate(180deg)",
                    }}
                    fontSize="large"
                    onClick={toggleSortingOrder}
                  />
                  <ArrowUpward
                    sx={{
                      cursor: "pointer",
                      transform: "rotate(180deg)",
                    }}
                    fontSize="small"
                    onClick={toggleSortingOrder}
                  />
                </div>
              </Tooltip>
            ) : (
              <Tooltip title="Ascending">
                <div>
                  <SortIcon
                    sx={{
                      marginLeft: "16px",
                      cursor: "pointer",
                    }}
                    onClick={toggleSortingOrder}
                    fontSize="large"
                  />
                  <ArrowUpward
                    sx={{
                      cursor: "pointer",
                    }}
                    fontSize="small"
                    onClick={toggleSortingOrder}
                  />
                </div>
              </Tooltip>
            )}
            <Tooltip title={active ? "Active" : "InActive"}>
              <Switch
                checked={active}
                onClick={onSetActive}
                color="default"
                size="medium"
                checkedIcon={<CheckCircleIcon color="default" />}
              />
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Create Icon */}

      <Tooltip title="Create">{renderButton()}</Tooltip>
    </Toolbar>
  );
};

export default HeaderToolbar;
