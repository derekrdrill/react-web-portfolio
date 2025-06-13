import React from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import { Typography, List, ListItem } from '@mui/material';

import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';

import { ABOUT_ME_TEXT, ABOUT_ME_TITLE } from '../constants/ABOUT_ME_TEXT';
import bitmojiChillinWithBirds from '../../../assets/bitmoji_chillinWithBirds1.png';

const AboutMe = ({ id }) => {
  const { darkMode } = React.useContext(DarkLightModeContext);

  return (
    <>
      <PageBodyStyle darkMode={darkMode} />
      <AboutMeContainer darkMode={darkMode} id={id} fluid>
        <Row>
          <Col className='py-3'>
            <AboutMePageTitle
              className='text-center'
              component='h1'
              darkMode={darkMode}
              variant='h3'
            >
              ABOUT ME
            </AboutMePageTitle>
          </Col>
        </Row>
        <Row>
          <AboutMeTextContainer
            darkMode={darkMode}
            xs={{ span: 10, order: 'last', offset: 1 }}
            lg={{ span: 5, order: 'first', offset: 1 }}
          >
            <AboutMeTitle component='h2' darkMode={darkMode} variant='h5'>
              {ABOUT_ME_TITLE}
            </AboutMeTitle>
            {ABOUT_ME_TEXT.map(aboutMeParagraph => (
              <AboutMeText
                key={aboutMeParagraph.id}
                darkMode={darkMode}
                variant='subtitle1'
                component='p'
              >
                {aboutMeParagraph.text}
              </AboutMeText>
            ))}
          </AboutMeTextContainer>
          <AboutMeBitmojiContainer xs={12} lg={6}>
            <AboutMeBitmoji src={bitmojiChillinWithBirds} alt='Chillin with birds' />
          </AboutMeBitmojiContainer>
        </Row>
      </AboutMeContainer>
    </>
  );
};

AboutMe.propTypes = {
  id: PropTypes.string,
};

export default AboutMe;

const PageBodyStyle = createGlobalStyle(({ darkMode }) => ({
  body: {
    backgroundColor: darkMode ? '#030200' : 'whitesmoke',
  },
}));

export const AboutMeContainer = styled(Container)(({ darkMode }) => ({
  paddingBottom: 200,
  paddingTop: 30,
  borderTop: '2px solid transparent',
  borderImage: darkMode
    ? 'linear-gradient(to right, rgba(248, 184, 255, 1), skyblue, gainsboro)'
    : 'linear-gradient(to right, rgba(176, 52, 197, 1), rgba(86, 206, 210, 1))',
  borderImageSlice: 1,
}));

export const AboutMePageTitle = styled(Typography)(({ darkMode }) => ({
  fontFamily: 'Shizuru',
  fontWeight: darkMode ? 'normal' : 'bold',
  color: darkMode ? 'gainsboro' : 'darkslategray',
}));

export const AboutMeTitle = styled(Typography)(({ darkMode }) => ({
  fontFamily: 'Shizuru',
  fontSize: 20,
  color: darkMode ? 'gainsboro' : 'darkslategray',
}));

export const AboutMeTextContainer = styled(Col)(({ darkMode }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
  padding: 20,
  height: 550,
  overflowY: 'auto',
  border: '1px dashed #383838',
  borderRadius: 2,
  backgroundColor: darkMode ? '#303030' : '#eee5c1',
}));

export const AboutMeBitmoji = styled.img({
  height: 300,
  width: 325,
});

export const AboutMeBitmojiContainer = styled(Col)({
  textAlign: 'center',
  paddingTop: 75,
  paddingBottom: 20,
});

export const AboutMeText = styled(Typography)(({ darkMode }) => ({
  fontFamily: 'Kufam',
  color: darkMode ? 'gainsboro' : '#333333',
  marginBottom: 15,
}));

export const AboutMeList = styled(List)({
  color: '#FFFFFF',
});

export const AboutMeListItem = styled(ListItem)(({ darkMode }) => ({
  fontFamily: 'Kufam',
  color: darkMode ? 'gainsboro' : '#333333',
}));
