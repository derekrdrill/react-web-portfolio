import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import { Grid, Typography, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { AlertComponent as Alert } from '../../Alert/components/AlertComponent';
import { DynamicFormInputs } from '../../DynamicFormInputs/components/DynamicFormInputs';

import { AlertContext } from '../../Alert/context/AlertContext';
import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';

import { handleAlert } from '../../Alert/context/AlertActions';
import { formInputsGenerator } from '../../../utils/formInputsGenerator';

import { CONNECT_TYPES } from '../constants/CONNECT_TYPES';
import { CONNECT_FORM_INPUTS } from '../constants/CONNECT_FORM_INPUTS';
import bitmojiWaterCooler from '../../../assets/bitmoji_waterCooler.png';

const ConnectWithMe = ({ id }) => {
  const connectTypes = CONNECT_TYPES;

  const { alertDispatch } = React.useContext(AlertContext);
  const { darkMode } = React.useContext(DarkLightModeContext);

  const [form1, setForm1] = useState(formInputsGenerator(CONNECT_FORM_INPUTS[0].inputs));
  const [form2, setForm2] = useState(formInputsGenerator(CONNECT_FORM_INPUTS[1].inputs));

  const handleMessageSend = async () => {
    const { firstName, lastName, email, phone } = form1;
    const { message } = form2;

    if (firstName && lastName && email && message) {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/send-email/${email}/${firstName}/${lastName}/${message}/${phone}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        },
      ).catch(e => console.warn(e));

      if (response.ok) {
        const messageData = await response.json();
        handleAlert(messageData.message, 'Email sent', 'success', alertDispatch);

        setForm1({ firstName: '', lastName: '', email: '', phone: '' });
        setForm2({ message: '' });
      }
    } else {
      handleAlert(
        'You must enter a first name, last name, email and message',
        'Message cannot send',
        'error',
        alertDispatch,
      );
    }
  };

  return (
    <>
      <PageBodyStyle darkMode={darkMode} />
      <ContactPageContainer id={id} darkMode={darkMode} container>
        <TitleContainer item xs={12}>
          <TitleText darkMode={darkMode} variant='h3' component='h2'>
            {`LET'S CONNECT`}
          </TitleText>
          <DescriptionText darkMode={darkMode} variant='h6' component='p'>
            {`Fire up an email, check out my LinkedIn, see this project in Github or send me a message right here!`}
          </DescriptionText>
        </TitleContainer>
        <ConnectTypeContainer item xs={12} lg={4}>
          <Grid container>
            {connectTypes.map(connect => (
              <Grid key={connect.id} item xs={4} lg={12}>
                <Grid container justifyContent='center'>
                  <StyledLink href={connect.href} target={connect.target}>
                    <ContactIcon darkMode={darkMode} icon={connect.icon} />
                  </StyledLink>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </ConnectTypeContainer>
        <DirectConnectContainer item xs={12} lg={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={5}>
              <DynamicFormInputs
                inputs={CONNECT_FORM_INPUTS[0].inputs}
                form={form1}
                setForm={setForm1}
              />
            </Grid>
            <Grid item xs={12} lg={7}>
              <DynamicFormInputs
                inputs={CONNECT_FORM_INPUTS[1].inputs}
                form={form2}
                setForm={setForm2}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent='space-between'>
            <div>
              <Alert />
            </div>
            <div>
              <Button variant='contained' color='warning' onClick={handleMessageSend}>
                Send
              </Button>
            </div>
          </Grid>
        </DirectConnectContainer>
        <Grid item xs={12}>
          <Grid container justifyContent={{ xs: 'flex-start', lg: 'flex-end' }}>
            <StyledBitmojiImage src={bitmojiWaterCooler} />
          </Grid>
        </Grid>
      </ContactPageContainer>
    </>
  );
};

ConnectWithMe.propTypes = {
  id: PropTypes.string,
};

export default ConnectWithMe;

const PageBodyStyle = createGlobalStyle(({ darkMode }) => ({
  body: {
    backgroundColor: darkMode ? '#030200' : 'whitesmoke',
  },
}));

export const ContactIcon = styled(FontAwesomeIcon)(({ darkMode }) => ({
  height: 100,
  width: 100,
  color: 'beige',
  path: {
    fill: darkMode ? '#36454F' : '#66abc7',
  },
  ':hover': {
    path: {
      fill: darkMode ? '#367993' : '#8fc2d6',
    },
  },
}));

export const ContactPageContainer = styled(Grid)(({ darkMode }) => ({
  padding: '50px 0',
  borderTop: '2px solid transparent',
  borderImage: darkMode
    ? 'linear-gradient(to right, rgba(248, 184, 255, 1), skyblue, gainsboro)'
    : 'linear-gradient(to right, rgba(176, 52, 197, 1), rgba(86, 206, 210, 1))',
  borderImageSlice: 1,
}));

export const ConnectTypeContainer = styled(Grid)({
  transform: 'translateY(-10px)',
});

export const TitleContainer = styled(Grid)({
  paddingRight: '2%',
  display: 'block',
  textAlign: 'right',
});

export const TitleText = styled(Typography)(({ darkMode }) => ({
  fontFamily: 'Shizuru',
  fontWeight: darkMode ? 'normal' : 'bold',
  color: darkMode ? 'beige' : '#759CC9',
  marginBottom: 10,
}));

export const DescriptionText = styled(Typography)(({ darkMode }) => ({
  fontFamily: 'Kufam',
  color: darkMode ? 'beige' : '#759CC9',
}));

export const DirectConnectContainer = styled(Grid)({
  padding: '2% 2% 0 2%',
});

export const StyledBitmojiImage = styled.img({
  width: 225,
  height: 240,
  transform: 'translateY(-65px)',
});

export const StyledLink = styled.a({
  padding: 15,
});
