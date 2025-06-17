import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import { headerReducer } from './HeaderReducer';

export const HeaderContext = createContext();

const HeaderProvider = ({ children }) => {
  const initialState = {
    isSlideDownMenuOpen: false,
  };

  const [state, headerDispatch] = useReducer(headerReducer, initialState);

  return (
    <HeaderContext.Provider
      value={{
        headerDispatch,
        ...state,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

HeaderProvider.propTypes = {
  children: PropTypes.node,
};

export default HeaderProvider;
