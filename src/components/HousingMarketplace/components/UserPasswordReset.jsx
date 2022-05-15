import React, { useContext, useEffect, useState } from 'react';
import { history } from '../../../index';
import styled from 'styled-components';
import { Button, Typography } from '@mui/material';
import { DynamicFormInputs } from '../../DynamicFormInputs/DynamicFormInputs';
import { UserAuthenticationContext } from '../context/UserAuthenticationContext';
import { AlertContext } from '../../Alert/context/AlertContext';
import { AlertComponent as Alert } from '../../Alert/components/AlertComponent';
import { handleAlert } from '../../Alert/context/AlertActions';

export const UserPasswordReset = () => {
  const pathName = history.location.pathname;
  const token = pathName.slice(pathName.indexOf('/token=') + 7, pathName.length);

  const { passwordIsReset, userAuthenticationDispatch } = useContext(UserAuthenticationContext);
  const { alertDispatch } = useContext(AlertContext);
  const [passwords, setPasswords] = useState({ password: '', confirmPassword: '' });
  const [userFound, setUserFound] = useState(false);
  const [userID, setUserID] = useState(null);

  const handleInputChange = e => {
    const itemID = e.currentTarget.id;
    const itemValue = e.currentTarget.value;

    setPasswords({ ...passwords, [itemID]: itemValue });
  };

  const handlePasswordReset = async () => {
    if (passwords.password === passwords.confirmPassword) {
      const response = await fetch(`../../../../../../updatePassword/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userID, password: passwords.password }),
      }).catch(e => console.warn(e));

      if (response.ok) {
        const { msg } = await response.json();

        if (msg) {
          userAuthenticationDispatch({ type: 'PASSWORD_RESET' });
          handleAlert(msg, 'Success', 'success', alertDispatch);
        }
      }
    } else {
      handleAlert('Passwords do not match', '', 'error', alertDispatch);
    }
  };

  const checkForUserAndToken = async () => {
    const response = await fetch(`../../../../../../find-user-with-token/${token}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).catch(e => console.warn(e));

    if (response.ok) {
      const { userFound, id } = await response.json();

      setUserID(id);
      setUserFound(userFound);

      if (!userFound) {
        alert('The password reset link you are trying to navigate to is dead 💀');
        history.push('/housing-marketplace/auth');
      } else {
      }
    }
  };

  useEffect(() => {
    checkForUserAndToken();
  }, []);

  return (
    <UserPasswordResetContainer>
      {passwordIsReset ? (
        <Typography paragraph>
          Your password has been reset successfully. Click <a href='/housing-marketplace/auth'>here</a> to sign in
        </Typography>
      ) : userFound ? (
        <>
          <TextContainer>
            <Typography component='h6' variant='h6'>
              Reset password below
            </Typography>
          </TextContainer>
          <DynamicFormInputs
            inputs={[
              {
                id: 'password',
                label: 'New Password',
                variant: 'outlined',
                xs: 12,
                fullWidth: true,
                type: 'password',
              },
              {
                id: 'confirmPassword',
                label: 'Confirm New Password',
                variant: 'outlined',
                xs: 12,
                fullWidth: true,
                type: 'password',
              },
            ]}
            onChange={handleInputChange}
          />
          <ButtonContainer>
            <Button
              disabled={!passwords.password || !passwords.confirmPassword}
              fullWidth
              onClick={handlePasswordReset}
              variant='contained'
            >
              Reset password
            </Button>
          </ButtonContainer>
          <AlertContainer>
            <Alert />
          </AlertContainer>
        </>
      ) : (
        <></>
      )}
    </UserPasswordResetContainer>
  );
};

const AlertContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
});

const UserPasswordResetContainer = styled.div({
  margin: '10% 26% 0px 26%',
  textAlign: 'center',
});

const TextContainer = styled.div({
  margin: '100px 0px 20px 0px',
});

const ButtonContainer = styled.div({
  margin: 10,
});
