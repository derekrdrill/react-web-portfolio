import React from 'react';
import styled from 'styled-components';
import { Grid, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStore,
  faUsers,
  faUserFriends,
  faProjectDiagram,
} from '@fortawesome/fontawesome-free-solid';

import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';
import { GithubContext } from '../context/GithubContext';

export const GithubUserProfileMiddle = () => {
  const { darkMode } = React.useContext(DarkLightModeContext);

  const {
    user: { followers, following, public_gists, public_repos },
  } = React.useContext(GithubContext);

  const data = [
    { id: 1, title: 'Followers', value: followers, icon: faUsers },
    { id: 2, title: 'Following', value: following, icon: faUserFriends },
    { id: 3, title: 'Public Repos', value: public_repos, icon: faProjectDiagram },
    { id: 4, title: 'Public Gists', value: public_gists, icon: faStore },
  ];

  return (
    <Grid container justifyContent={{ md: 'center', lg: 'flex-start' }} spacing={2}>
      {data.map(item => (
        <MiddleSectionItem key={item.id} darkMode={darkMode} item xs={12} md={6} lg={3}>
          <Grid container>
            <Grid item xs={10}>
              <Typography component='h6' variant='subtitle2'>
                {item.title}
              </Typography>
              <Typography component='h5' variant='h5'>
                {item.value}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <FontAwesomeIcon color={darkMode ? 'lightgrey' : 'grey'} icon={item.icon} />
            </Grid>
          </Grid>
        </MiddleSectionItem>
      ))}
    </Grid>
  );
};

export const MiddleSectionItem = styled(Grid)(({ darkMode }) => ({
  border: !darkMode && '2px darkgrey solid',
  borderRadius: 10,
  boxShadow: darkMode && '2px 1px 10px #121326',
  padding: 15,
}));

export const MiddleSectionItemIcon = styled(FontAwesomeIcon)({
  height: '1.5em',
  width: '1.5em',
});
