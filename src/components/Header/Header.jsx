import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AppBar, Button, Grid, List, Toolbar } from '@mui/material';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

import { HeaderMenu } from './components/HeaderMenu';
import { HeaderImage } from './components/HeaderImage';
import { MoreOptions } from './components/MoreOptions';
import { LoaderSpinner } from '../LoaderSpinner/LoaderSpinner';

import { DarkLightModeContext } from '../DarkLightMode/context/DarkLightModeContext';
import { HeaderContext } from './context/HeaderContext';

import { MORE_OPTIONS } from './constants/MORE_OPTIONS';
import { history } from '../../index';

export const Header = ({ children }) => {
  const currentRoute = history.location.pathname;

  const { darkMode } = useContext(DarkLightModeContext);
  const { isSlideDownMenuOpen, headerDispatch } = useContext(HeaderContext);

  const [loading, setLoading] = useState(null);

  const homeClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(null);
      history.push('/');
    }, 1200);
  };

  return (
    <div>
      <TransparentAppBar elevation={0}>
        <HeaderMainContainer container>
          <HeaderToolBarContainer item xs={12}>
            <HeaderToolBar darkMode={darkMode}>
              <Grid container justifyContent='space-between'>
                <HeaderImage currentRoute={currentRoute} homeClick={homeClick}>
                  {children}
                </HeaderImage>
                <HeaderMenuContainer item display={{ xs: 'none', md: 'block' }}>
                  <HeaderMenu
                    headerType={currentRoute === '/' ? 'main' : 'secondary'}
                    menuType='main'
                  />
                </HeaderMenuContainer>
                <HeaderMenuSmallContainer item display={{ xs: 'block', md: 'none' }}>
                  <HeaderMenuSmallButton
                    darkMode={darkMode}
                    endIcon={
                      isSlideDownMenuOpen ? (
                        <CancelPresentationIcon />
                      ) : (
                        <KeyboardDoubleArrowDownIcon />
                      )
                    }
                    onClick={
                      /* istanbul ignore next */
                      () =>
                        headerDispatch({
                          type: 'SET_IS_SLIDE_DOWN_MENU_OPEN',
                          isSlideDownMenuOpen: !isSlideDownMenuOpen,
                        })
                    }
                  >
                    {`${isSlideDownMenuOpen ? 'Close' : 'Open'} page list`}
                  </HeaderMenuSmallButton>
                </HeaderMenuSmallContainer>
                <MoreOptionsContainer item>
                  <MoreOptions moreOptions={MORE_OPTIONS} />
                </MoreOptionsContainer>
              </Grid>
            </HeaderToolBar>
          </HeaderToolBarContainer>
          <HeaderMenuListItem
            darkMode={darkMode}
            item
            isSlideDownMenuOpen={isSlideDownMenuOpen}
            xs={12}
          >
            <List>
              <HeaderMenu
                headerType={currentRoute === '/' ? 'main' : 'secondary'}
                menuType='list'
              />
            </List>
          </HeaderMenuListItem>
        </HeaderMainContainer>
      </TransparentAppBar>
      <StyledChildContainer>{children}</StyledChildContainer>
      <LoaderSpinner open={loading} />
    </div>
  );
};

Header.propTypes = {
  children: PropTypes.node,
};

export const HeaderMainContainer = styled(Grid)({
  height: 80,
});

export const HeaderMenuContainer = styled(Grid)({
  paddingTop: 20,
});

export const HeaderMenuSmallButton = styled(Button)(({ darkMode }) => ({
  color: darkMode ? 'grey' : 'slategray',
}));

export const HeaderMenuSmallContainer = styled(Grid)({
  paddingTop: 20,
});

export const HeaderMenuListItem = styled(Grid)(({ darkMode, isSlideDownMenuOpen }) => ({
  backgroundColor: darkMode ? '#616161' : 'beige',
  boxShadow: '0 4px 2px -2px darkgray',
  transform: isSlideDownMenuOpen ? 'translateY(0)' : 'translateY(-150%)',
  transition: 'all 0.7s ease-out',
  visibility: isSlideDownMenuOpen ? 'visible' : 'hidden',
  '@media screen and (min-width: 899px)': {
    opacity: 0.4,
    transform: 'translateY(-150%)',
    visibility: 'hidden',
  },
}));

export const HeaderToolBar = styled(Toolbar)(({ darkMode }) => ({
  backgroundColor: darkMode ? '#030200' : 'whitesmoke',
  height: 80,
}));

export const HeaderToolBarContainer = styled(Grid)({
  display: 'block',
  zIndex: 5,
});

export const MoreOptionsContainer = styled(Grid)({
  paddingTop: 10,
});

export const StyledChildContainer = styled.div({
  marginTop: 80,
});

export const TransparentAppBar = styled(AppBar)({
  backgroundColor: 'transparent',
});
