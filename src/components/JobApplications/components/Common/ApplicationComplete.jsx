import React from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const ApplicationComplete = () => (
  <TextContainer>
    <Typography variant='h5' component='h1'>
      Thank you for your application!
      <br />
      <Link to='/'>Go home</Link>
    </Typography>
  </TextContainer>
);

export default ApplicationComplete;

const TextContainer = styled.div({
  padding: 20,
});
