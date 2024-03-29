import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Grid, TextField, Typography, Button } from '@mui/material';

import { DarkLightModeContext } from '../../../DarkLightMode/context/DarkLightModeContext';

import { DynamicList } from '../../../DynamicList/DynamicList';
import { DynamicFormInputs } from '../../../DynamicFormInputs/components/DynamicFormInputs';

import { formInputsGenerator } from '../../../../utils/formInputsGenerator';
import { BASIC_JOB_APP_INPUTS } from '../../constants/BASIC_JOB_APP_INPUTS';

export const BasicJobApplication = () => {
  const { darkMode } = React.useContext(DarkLightModeContext);
  const [form, setForm] = useState(formInputsGenerator(BASIC_JOB_APP_INPUTS));

  return (
    <JobAppContainer darkMode={darkMode} container spacing={2}>
      <JobAppTitleContainer container>
        <Grid item xs={12}>
          <JobAppTitleText darkMode={darkMode} variant='h4'>
            Application for Employment
          </JobAppTitleText>
        </Grid>
      </JobAppTitleContainer>
      <FileUploadContainer darkMode={darkMode} item xs={12}>
        <Typography component='h5'>Upload supporting documents</Typography>
        <FileUploadScrollContainer container darkMode={darkMode}>
          <DynamicList addColor='forestgreen' removeColor='maroon'>
            <FileUpload darkMode={darkMode} type='file' />
          </DynamicList>
        </FileUploadScrollContainer>
      </FileUploadContainer>
      <JobAppInputsContainer item xs={12}>
        <DynamicFormInputs inputs={BASIC_JOB_APP_INPUTS} form={form} setForm={setForm} />
      </JobAppInputsContainer>
      <Grid container justifyContent='flex-end'>
        <Grid item xs={12} md={6} lg={4}>
          <Link to='/app-complete'>
            <SubmitButton color='info' fullWidth size='large' variant='contained'>
              Submit Application
            </SubmitButton>
          </Link>
        </Grid>
      </Grid>
    </JobAppContainer>
  );
};

export const JobAppContainer = styled(Grid)(({ darkMode }) => ({
  backgroundColor: darkMode ? '#303030' : '#F5F5F5',
  border: darkMode ? 'none' : '1px solid lightgrey',
  borderRadius: 10,
  boxShadow: darkMode ? '5px 3px 3px lightgrey' : '5px 3px 3px grey',
  height: '100vh',
  marginTop: 35,
  padding: '20px 20px 10px 30px',
  textAlign: 'center',
  width: '80%',
}));

export const JobAppInputsContainer = styled(Grid)({
  marginTop: 20,
});

export const JobAppTitleContainer = styled(Grid)({
  marginBottom: 30,
});

export const JobAppTitleText = styled(Typography)(({ darkMode }) => ({
  color: darkMode ? 'beige' : 'inherit',
}));

export const SubmitButton = styled(Button)({
  marginTop: 50,
});

export const FileUploadContainer = styled(Grid)(({ darkMode }) => ({
  'h1,h2,h3,h4,h5,h6': {
    color: darkMode ? '#E8DED1' : 'inherit',
  },
  background: darkMode ? '#808080' : '#FAFAFA',
  border: darkMode ? 'none' : '1px dashed gainsboro',
  borderRadius: 6,
  boxShadow: darkMode ? '3px 2px 5px lightgrey' : '1px 1px 2px grey',
  padding: 20,
}));

export const FileUploadScrollContainer = styled(Grid)(({ darkMode }) => ({
  backgroundColor: darkMode ? '#8a8a8a' : '#f7f7f7',
  borderRadius: 5,
  marginTop: 20,
  maxHeight: 250,
  overflowY: 'auto',
  padding: 10,
}));

export const FileUpload = styled(TextField)(({ darkMode }) => ({
  '.MuiInputBase-root': {
    backgroundColor: darkMode ? '#c7c7c7' : 'beige',
  },
}));
