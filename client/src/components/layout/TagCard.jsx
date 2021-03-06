import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Grid, Typography, Box } from '@material-ui/core';
import tagsColors from '../../utils/tagsBackgroundColor';

import useStyles from '../../styles/layout/tag-card';

const TagCard = ({ tag }) => {
  const classes = useStyles();

  let tagColor = tagsColors.find((tagColor) => tagColor.tagName === tag);
  if (!tagColor) {
    tagColor = {
      bg: '#bdc3c7',
      text: 'black',
    };
  }
  return (
    <Grid container elevation={0} component={Paper} className={classes.root}>
      <Grid item xs={12} className={classes.colorContainer}>
        <Box
          style={{
            padding: '10px',
            backgroundColor: tagColor.bg,
            borderRadius: '3px 3px 0 0',
          }}
        ></Box>
      </Grid>
      <Grid item xs={12} className={classes.tagTitleContainer}>
        <Link to={`/t/${tag}`} className={classes.titleLink}>
          <Typography variant="h3" className={classes.tag}>
            <span className={classes.hash}>#</span>
            {tag}
          </Typography>
        </Link>
      </Grid>
    </Grid>
  );
};

export default TagCard;
