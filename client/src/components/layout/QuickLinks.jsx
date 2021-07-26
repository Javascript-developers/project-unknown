import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';

import useStyles from '../../styles/layout/quick-links.styles';

const links = [
  { title: 'Home', link: '/', icon: '🏡' },
  { title: 'Bookmarks', link: '/bookmarks', icon: '📜' },
  { title: 'About', link: '/about', icon: '💬' },
  { title: 'Tags', link: '/tags', icon: '🏷️' },
  { title: 'Contact', link: '/contact', icon: '📧' },
  { title: 'FAQ', link: '/faq', icon: '💡' },
];

const QuickLinks = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography variant="h6">Quick Links</Typography>
      <Box className={classes.itemsContainer}>
        {links.map((link, i) => (
          <Link to={`${link.link}`} key={i} className={classes.linkItem}>
            <Typography variant="h6" className={classes.icon}>
              {link.icon}
            </Typography>
            <Typography variant="body1">{link.title}</Typography>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default QuickLinks;
