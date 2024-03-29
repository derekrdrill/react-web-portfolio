import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { Card } from '../../Card/Card';
import { FeedbackContext } from '../context/FeedbackContext';

export const getFeedbackReviewLabel = edit => (edit ? 'Edit review' : 'Write a review');
export const getSubmitButtonLabel = edit => (edit ? 'Update ' : 'Submit ');
export const isReviewButtonDisabled = (review, rating) => !review || typeof rating !== 'number';

export const FeedbackForm = ({ maxRank }) => {
  const menuItems = new Array(maxRank + 1).fill(null);
  const { addFeedbackItem, feedbackEdit, updateFeedbackItem } = React.useContext(FeedbackContext);

  const [rating, setRating] = useState(null);
  const [review, setReview] = useState('');

  const handleSetRating = (e, value) => setRating(Number(value));
  const handleSetReview = e => setReview(e.currentTarget.value);
  const handleSubmitReview = () => {
    if (!feedbackEdit.edit) {
      addFeedbackItem({
        rating: rating,
        text: review,
      });
    } else {
      updateFeedbackItem({
        _id: feedbackEdit.item.id,
        rating: rating,
        text: review,
      });
    }

    setRating(null);
    setReview('');
  };

  useEffect(
    /* istanbul ignore next */
    () => {
      if (feedbackEdit.edit) {
        setReview(feedbackEdit.item.text);
        setRating(feedbackEdit.item.rating);
      }
    },
    [feedbackEdit],
  );

  return (
    <Card>
      <h2>Feedback Form</h2>
      <Typography component='p' variant='subtitle1'>
        Please rate your experience
      </Typography>
      <FormControl fullWidth>
        <RadioGroup onChange={handleSetRating}>
          <RadioButtonsContainer>
            {menuItems.map((menuItem, menuItemKey) => (
              <div key={menuItemKey}>
                <RatingRadioControl
                  checked={menuItemKey === rating}
                  control={<Radio />}
                  label={menuItemKey}
                  value={menuItemKey}
                />
              </div>
            ))}
          </RadioButtonsContainer>
        </RadioGroup>
      </FormControl>
      <TextField
        fullWidth
        label={getFeedbackReviewLabel(feedbackEdit.edit)}
        minRows={2}
        multiline
        onChange={handleSetReview}
        placeholder={getFeedbackReviewLabel(feedbackEdit.edit)}
        value={review}
      />
      <ButtonContainer>
        <Button
          disabled={isReviewButtonDisabled(review, rating)}
          onClick={handleSubmitReview}
          size='small'
          variant='outlined'
        >
          {getSubmitButtonLabel(feedbackEdit.edit)}
          Review
        </Button>
      </ButtonContainer>
    </Card>
  );
};

FeedbackForm.propTypes = {
  maxRank: PropTypes.number.isRequired,
};

FeedbackForm.defaultProps = {
  maxRank: 10,
};

export const ButtonContainer = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
  padding: '15px 0',
});

export const RadioButtonsContainer = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  margin: '40px 30px',
});

export const RatingRadioControl = styled(FormControlLabel)(({ checked }) => [
  {
    '.MuiRadio-root': {
      display: 'none',
    },
    ':hover': {
      backgroundColor: '#FF77BC',
      color: 'beige',
    },
    backgroundColor: 'lavender',
    borderRadius: 50,
    color: '#333',
    minWidth: 12,
    padding: '25px 30px',
    cursor: 'pointer',
  },
  checked && {
    ':hover': {
      backgroundColor: '#be7dff',
    },
    backgroundColor: '#be7dff',
    color: 'beige',
  },
]);
