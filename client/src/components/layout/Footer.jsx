import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { Instagram, Facebook, Twitter, GitHub } from '@material-ui/icons';

import useStyles from '../../styles/layout/footer.styles';

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.bg}>
      <Container maxWidth="lg" className={classes.root}>
        <Typography variant="subtitle2" gutterBottom>
          This project is made with passion by @quatre and first project in his
          portofolio
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Thechnologies used: NodeJs | MongoDB | ReactJs | Express | © 2021.
        </Typography>
        <div>
          <Instagram className={classes.iconSocialLink} />
          <Facebook className={classes.iconSocialLink} />
          <Twitter className={classes.iconSocialLink} />
          <GitHub className={classes.iconSocialLink} />
        </div>
      </Container>
    </div>
  );
};

export default Footer;
