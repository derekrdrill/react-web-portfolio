import React, { useContext, useState } from 'react';
import $ from 'jquery';
import styled from 'styled-components';
import { Button, Typography } from '@mui/material';
import { DynamicFormInputs } from '../../DynamicFormInputs/DynamicFormInputs';
import { AlertContext } from '../../Alert/context/AlertContext';
import { USER_REGISTER_INPUTS } from '../constants/USER_REGISTER_INPUTS';

export const UserRegister = () => {
  const { alertDispatch } = useContext(AlertContext);
  const [userItem, setUserItem] = useState({});

  const handleAlert = msg => {
    alertDispatch({
      type: 'SET_ALERT',
      fadeOut: false,
      payload: { msg: msg, title: 'Sign-up error', type: 'error' },
    });

    setTimeout(() => alertDispatch({ type: 'FADE_ALERT', fadeOut: true }), 2000);
    setTimeout(() => alertDispatch({ type: 'REMOVE_ALERT' }), 2400);
  };

  const handleUserItemChange = e => {
    const itemID = e.currentTarget.id;
    const itemValue = e.currentTarget.value;

    setUserItem({ ...userItem, [itemID]: itemValue });
  };

  const validateUserItem = async userItem => {
    const { email, username, password, confirmPassword } = userItem;

    if (password !== confirmPassword) {
      return 'Passwords do not match';
    } else {
      const response = await fetch(`checkForUser/${email}/${username}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).catch(e => console.warn(e));

      if (response.ok) {
        const { msg } = await response.json();

        if (msg) {
          return msg;
        }
      }
    }

    return null;
  };

  const addUserItem = async userItem => {
    const response = await fetch('addUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userItem),
    }).catch(e => console.warn(e));

    if (!response.ok) {
      console.warn(Promise.reject(response));
    } else {
      $('input').val('');
    }
  };

  const handleSubmit = async () => {
    const validationMsg = await validateUserItem(userItem);

    if (validationMsg) {
      handleAlert(validationMsg);
    } else {
      const { firstName, lastName, email, username, password } = userItem;

      addUserItem({
        firstName: firstName,
        lastName: lastName,
        email: email,
        userName: username,
        password: password,
      });
    }
  };

  return (
    <>
      <RegisterTextContainer>
        <RegisterText component='h4' variant='h4'>
          Sign up
        </RegisterText>
        <RegisterText component='p' variant='p'>
          Fill in all information below to sign up today!
        </RegisterText>
      </RegisterTextContainer>
      <DynamicFormInputs inputs={USER_REGISTER_INPUTS} onChange={handleUserItemChange} />
      <ButtonContainer>
        <Button color='info' fullWidth onClick={handleSubmit} variant='contained'>
          Submit
        </Button>
      </ButtonContainer>
    </>
  );
};

const RegisterTextContainer = styled.div({
  marginTop: '100px',
});

const RegisterText = styled(Typography)({
  margin: '10px 0',
});

const ButtonContainer = styled.div({
  margin: 10,
});
