import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid, Typography } from '@mui/material';

import { DynamicFormInputs } from '../../../DynamicFormInputs/components/DynamicFormInputs';
import { DynamicList } from '../../../DynamicList/DynamicList';

import { DarkLightModeContext } from '../../../DarkLightMode/context/DarkLightModeContext';

import { formInputsGenerator } from '../../../../utils/formInputsGenerator';

export const JobApplicationSection = ({ section }) => {
  const { darkMode } = React.useContext(DarkLightModeContext);
  const [form, setForm] = useState(formInputsGenerator(section.inputs));

  const inputs = <DynamicFormInputs inputs={section.inputs} form={form} setForm={setForm} />;

  return (
    <JobAppSectionContainer container>
      <Grid item xs={12}>
        <JobAppSectionHeader darkMode={darkMode} variant='h4'>
          {section.title}
        </JobAppSectionHeader>
      </Grid>
      <Grid item xs={12}>
        <JobAppSectionHeader darkMode={darkMode} variant='subtitle1' component='span'>
          {section.instructions}
        </JobAppSectionHeader>
      </Grid>
      {section.dynamicList ? <DynamicList>{inputs}</DynamicList> : inputs}
    </JobAppSectionContainer>
  );
};

JobApplicationSection.propTypes = {
  section: PropTypes.object,
};

export const JobAppSectionContainer = styled(Grid)({
  padding: 20,
});

export const JobAppSectionHeader = styled(Typography)(({ darkMode }) => ({
  color: darkMode ? '#fafafa' : 'inherit',
  paddingBottom: 10,
}));
