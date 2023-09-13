import React, { useState } from 'react';
import {
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Tooltip,
  Select,
  MenuItem,
} from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import { Rotate } from '@mui/material/Rotate';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

interface HeaderToolbarProps {
  title: string;
  id?: string;
  onSet?: (id: string) => void;
  setSort?: (sort: string) => void;
  setSortby?: (sortby: string) => void;
}

const HeaderToolbar: React.FC<HeaderToolbarProps> = ({
  title,
  id,
  onSet,
  setSort,
  setSortby,
}) => {
  // Sample filter options
  const filterOptions = [
    {
      value: 'name',
      label: 'Name',
    },
    {
      value: 'is_active',
      label: 'Active',
    },
    {
      value: 'created_at',
      label: 'Created At',
    },
    {
      value: 'updated_at',
      label: 'Updated At',
    },
  ];
  const [ascendingOrder, setAscendingOrder] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('name');

  const toggleSortingOrder = () => {
    setAscendingOrder((prevOrder) => !prevOrder);
    if (setSort) {
      setSort(ascendingOrder ? 'asc' : 'desc');
    }
  };
  const renderButton = () => {
    if (title == 'NOTIFICATIONS') {
      // If props.title is 'notification', render as a Link
      return (
        <Link to={`/notification-preview/${id}`}>
          <IconButton color='primary'>
            <AddCircleIcon fontSize='large' />
          </IconButton>
        </Link>
      );
    } else {
      // Otherwise, render without Link
      return (
        <IconButton color='primary'>
          <AddCircleIcon fontSize='large' />
        </IconButton>
      );
    }
  };

  return (
    <Toolbar
      variant='dense'
      sx={{
        width: '100%',
        marginTop: '20px',
        backgroundColor: '#2196F3', // Blue background color
        color: 'white', // Text color
        borderRadius: '8px', // Border radius
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Box shadow
        padding: '8px 16px', // Padding
        alignItems: 'center', // Center items vertically
        justifyContent: 'space-between', // Space evenly
        '& .MuiInputBase-input': {
          color: 'white', // Input text color
        },
        '& .MuiSelect-root': {
          color: 'white', // Select text color
        },
        '& .MuiSelect-icon': {
          color: 'white', // Select icon color
        },
        '& .MuiIconButton-root': {
          color: 'white', // Icon button color
        },
        '@media (prefers-color-scheme: dark)': {
          // Media query for dark theme
          backgroundColor: '#1976D2', // Light bluish background color for dark theme
        },
      }}
    >
      <div>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
      </div>
      {/* Search Box */}
      <div style={{ display: 'flex' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginRight: '16px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Search box background color
            borderRadius: '4px', // Search box border radius
            padding: '4px 8px', // Search box padding
          }}
        >
          <SearchIcon />
          <InputBase
            placeholder='Search...'
            inputProps={{ 'aria-label': 'search' }}
            onChange={(e) => {
              if (onSet) {
                onSet(e.target.value); // Check if onSet is defined before invoking it
              }
            }}
          />
        </div>
        {/* Filter Dropdown */}
        <div>
          <Select
            label='Filter'
            value={selectedFilter}
            sx={{
              minWidth: '120px',
              border: '1px ',
              color: 'white', // Select text color
            }}
            onChange={(e) => {
              if (setSortby) {
                // console.log(e.target.value as string);
                setSelectedFilter(e.target.value as string);
                setSortby(e.target.value as string); // Check if setSort is defined before invoking it
              }
            }}
          >
            {filterOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {/* Filter Icon */}

          {ascendingOrder ? (
            <ArrowDownwardIcon
              sx={{ marginLeft: '16px', cursor: 'pointer' }}
              onClick={toggleSortingOrder}
            />
          ) : (
            <ArrowUpwardIcon
              sx={{ marginLeft: '16px', cursor: 'pointer' }}
              onClick={toggleSortingOrder}
            />
          )}
        </div>
      </div>

      {/* Create Icon */}
      <Tooltip title='Create'>{renderButton()}</Tooltip>
    </Toolbar>
  );
};

export default HeaderToolbar;
