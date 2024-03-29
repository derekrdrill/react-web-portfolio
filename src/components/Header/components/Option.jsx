import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Divider, Grid, MenuItem } from '@mui/material/';

export const Option = ({ darkMode, handleModalOpen, handleClose, option }) => {
  const { title, icon, href, target, divider, modal } = option;

  const menuItem = (
    <StyledMenuItem darkMode={darkMode} onClick={modal ? handleModalOpen : handleClose}>
      <Grid className='menu-item' container spacing={3}>
        <Grid item xs={2}>
          {icon}
        </Grid>
        <Grid item xs={9}>
          {title}
        </Grid>
      </Grid>
    </StyledMenuItem>
  );

  return (
    <>
      {href ? (
        <StyledMenuLink className='link' darkMode={darkMode} href={href} target={target}>
          {menuItem}
        </StyledMenuLink>
      ) : (
        menuItem
      )}
      {divider && <Divider />}
    </>
  );
};

Option.propTypes = {
  darkMode: PropTypes.bool,
  handleModalOpen: PropTypes.func,
  handleClose: PropTypes.func,
  option: PropTypes.object,
};

export const StyledMenuItem = styled(MenuItem)(({ darkMode }) => ({
  ':hover': {
    backgroundColor: darkMode ? 'black' : 'slategrey',
    color: darkMode ? 'white' : 'slategrey',
    a: {
      color: darkMode ? 'white' : 'slategrey',
    },
  },
}));

export const StyledMenuLink = styled.a({
  color: 'black',
  textDecoration: 'none',
});
