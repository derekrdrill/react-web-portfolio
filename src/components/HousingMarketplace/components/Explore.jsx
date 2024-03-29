import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import styled, { createGlobalStyle } from 'styled-components';
import { Chip, Grid, Typography } from '@mui/material';

import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';

import { ChangeSlideArrow } from './ChangeSlideArrow';
import { LoaderSpinner } from '../../LoaderSpinner/LoaderSpinner';

import rentCategoryImg from '../../../assets/rentCategoryImage.jpeg';
import sellCategoryImg from '../../../assets/sellCategoryImage.jpeg';

import { history } from '../../../index';

const Explore = () => {
  const token = sessionStorage.getItem('token');

  const { darkMode } = useContext(DarkLightModeContext);

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);

  !token && history.push('/housing-marketplace/auth');

  const fetchListings = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/get-listings/both`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).catch(e => console.warn(e));

    if (response.ok) {
      const { listings } = await response.json();
      setListings(listings);
    }
  };

  useEffect(
    /* istanbul ignore next */
    () => {
      fetchListings();
      setLoading(false);
    },
    [],
  );

  return (
    <>
      <PageBodyStyle darkMode={darkMode} />
      <MainContainer>
        <TitleContainer>
          <Typography component='h6' variant='h4'>
            Explore
          </Typography>
        </TitleContainer>
        {loading ? (
          <LoaderSpinner open />
        ) : (
          <>
            <QuickLinksContainer>
              <Typography paragraph>Quick Links</Typography>
              {listings.length > 0 && (
                <Grid container>
                  <Grid item xs={12}>
                    <QuickLinksSlider
                      autoplay
                      autoplaySpeed={2500}
                      dots
                      lazyLoad
                      nextArrow={<ChangeSlideArrow arrowType='next' darkMode={darkMode} />}
                      pauseOnHover
                      prevArrow={<ChangeSlideArrow arrowType='prev' darkMode={darkMode} />}
                      responsive={[
                        {
                          breakpoint: 1024,
                          settings: {
                            slidesToShow: 3,
                          },
                        },
                        {
                          breakpoint: 900,
                          settings: {
                            slidesToShow: 2,
                          },
                        },
                        {
                          breakpoint: 600,
                          settings: {
                            fade: true,
                            slidesToShow: 1,
                            speed: 1000,
                          },
                        },
                      ]}
                      speed={500}
                      slidesToShow={4}
                      slidesToScroll={1}
                    >
                      {listings.map((listing, key) => (
                        <QuickLinks key={key} image={listing.imageUrls[0]}>
                          <QuickLinksLink to={`/housing-marketplace/listing/${listing._id}`}>
                            <QuickLinksNameContainer>
                              <QuickLinksName paragraph>{listing.name}</QuickLinksName>
                            </QuickLinksNameContainer>
                            <QuickLinksPriceContainer>
                              <QuickLinksPriceChip
                                label={`$${listing.discountedPrice
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${
                                  listing.type === 'rent' ? ' / month' : ''
                                }`}
                              />
                            </QuickLinksPriceContainer>
                          </QuickLinksLink>
                        </QuickLinks>
                      ))}
                    </QuickLinksSlider>
                  </Grid>
                </Grid>
              )}
            </QuickLinksContainer>
            <div>
              <Typography paragraph>Listings</Typography>
              <Grid container spacing={1}>
                <Grid item xs={6} md={4}>
                  <Link to='/housing-marketplace/category/rent'>
                    <CategoryImage src={rentCategoryImg} alt='rent' />
                  </Link>
                  <CategoryTitle paragraph>For rent</CategoryTitle>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Link to='/housing-marketplace/category/sell'>
                    <CategoryImage src={sellCategoryImg} alt='sell' />
                  </Link>
                  <CategoryTitle paragraph>For sale</CategoryTitle>
                </Grid>
              </Grid>
            </div>
          </>
        )}
      </MainContainer>
    </>
  );
};

export default Explore;

const PageBodyStyle = createGlobalStyle(({ darkMode }) => ({
  body: {
    backgroundColor: darkMode && '#292929',
    'h1, h2, h3, h4, h5, h6, p': {
      color: darkMode && 'beige',
    },
  },
}));

const MainContainer = styled.div({
  padding: 20,
  marginBottom: 100,
});

const QuickLinks = styled.div(({ image }) => ({
  ':hover': {
    opacity: 0.8,
  },
  background: `url(${image}) center no-repeat`,
  backgroundSize: 'cover',
  borderRadius: 5,
  cursor: 'pointer',
  minHeight: 225,
}));

const QuickLinksLink = styled(Link)({
  textDecoration: 'none',
});

const QuickLinksNameContainer = styled.div({
  backgroundColor: 'black',
  margin: '100px 0px 0px 5px',
  maxWidth: '50%',
  opacity: 0.8,
  paddingLeft: 5,
});

const QuickLinksSlider = styled(Slider)({
  '.slick-slide': {
    borderRight: 'white solid 5px',
  },
  margin: 10,
});

const QuickLinksPriceContainer = styled.div({
  margin: '40px 0px 0px 5px',
});

const QuickLinksPriceChip = styled(Chip)({
  '&.MuiChip-root': {
    backgroundColor: 'white',
    color: '#4d3536',
  },
});

const QuickLinksName = styled(Typography)({
  color: 'white',
});

const QuickLinksContainer = styled.div({
  marginBottom: 50,
});

const TitleContainer = styled.div({
  padding: '10px 0',
});

const CategoryImage = styled.img({
  ':hover': {
    opacity: 0.8,
  },
  borderRadius: 15,
  height: '85%',
  width: '100%',
});

const CategoryTitle = styled(Typography)({
  marginTop: 10,
});
