import React, { useState } from 'react';

import {
  Typography,
  Toolbar,
  Avatar,
  Button,
  Container,
  AppBar,
  Box,
  InputBase,
} from '@material-ui/core';

import { useHistory } from 'react-router-dom';

import SearchIcon from '@material-ui/icons/Search';

import useStyles from '../../styles/layout/search-bar.styles';

const SearchBar = () => {
  let history = useHistory();
  const classes = useStyles();
  const [input, setInput] = useState('');

  const onChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      history.push({
        pathname: '/search',
        search: `q=${input}`,
        state: { query: input },
      });
      setInput('');
    }
  };
  return (
    <div className={classes.root}>
      <div className={classes.iconWrapper}>
        <SearchIcon />
      </div>
      <InputBase
        className={classes.inputBase}
        placeholder="Search..."
        inputProps={{ 'aria-label': 'search' }}
        value={input}
        onChange={onChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default SearchBar;
