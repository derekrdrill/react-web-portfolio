import React from 'react';
import styled from 'styled-components';
import { Button, Chip, Grid, Typography } from '@mui/material';

import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';
import { GithubContext } from '../context/GithubContext';

import { GithubUserProfileBio } from './GithubUserProfileBio';

export const getBlog = blog => blog ?? 'N/A';
export const getTwitterUsername = twitter_username => twitter_username ?? 'N/A';

export const GithubUserProfileTop = () => {
  const { darkMode } = React.useContext(DarkLightModeContext);

  const {
    user: { avatar_url, blog, hireable, html_url, location, login, name, twitter_username, type },
  } = React.useContext(GithubContext);

  return (
    <Grid container spacing={1}>
      <Grid item sm={12} md={3} xl={2}>
        <ProfileImage darkMode={darkMode} src={avatar_url} />
        <ProfileNames component='h6' variant='subtitle1'>
          {name}
        </ProfileNames>
        <ProfileNames component='h6' variant='subtitle2'>
          {login}
        </ProfileNames>
      </Grid>
      <Grid item sm={12} md={9} xl={10}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography component='h4' variant='h5'>
              {name}
            </Typography>
            <ChipsContainer>
              {type && (
                <Chip
                  label={type}
                  color='success'
                  variant={darkMode ? 'outlined' : 'filled'}
                  size='small'
                />
              )}
              {hireable && (
                <Chip
                  label='Hireable'
                  color='secondary'
                  variant={darkMode ? 'outlined' : 'filled'}
                  size='small'
                />
              )}
            </ChipsContainer>
          </Grid>
          <Grid item xs={12}>
            <Typography component='p' variant='subtitle1'>
              <GithubUserProfileBio />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <VisitProfileButton
              color='info'
              darkMode={darkMode}
              href={html_url}
              size='large'
              target='_blank'
              variant={darkMode ? 'outlined' : 'contained'}
            >
              Visit Profile
            </VisitProfileButton>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12} sm={3}>
                <Typography component='h6' variant='subtitle2'>
                  Location
                </Typography>
                <Typography component='h6' variant='subtitle1'>
                  {location}
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ display: { xs: 'block', lg: 'none' } }}>
                <hr />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography component='h6' variant='subtitle2'>
                  Website
                </Typography>
                <Typography component='h6' variant='subtitle1'>
                  {getBlog(blog)}
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ display: { xs: 'block', lg: 'none' } }}>
                <hr />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography component='h6' variant='subtitle2'>
                  Twitter
                </Typography>
                <Typography component='h6' variant='subtitle1'>
                  {getTwitterUsername(twitter_username)}
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ display: { xs: 'block', lg: 'none' } }}>
                <hr />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export const ChipsContainer = styled.div({
  display: 'grid',
  gridGap: 10,
  gridTemplateColumns: '100px 100px',
});

export const ProfileImage = styled.img(({ darkMode }) => ({
  background: 'black',
  maxHeight: 189,
  maxWidth: 189,
  opacity: darkMode ? 0.7 : 0.9,
}));

export const ProfileNames = styled(Typography)({
  color: 'beige',
  transform: 'translate(10px, -50px)',
});

export const VisitProfileButton = styled(Button)(({ darkMode }) => [
  !darkMode && {
    ':hover': {
      textDecoration: 'none',
      color: 'white',
    },
  },
]);
