export const headerReducer = (state, action) => {
  switch (action.type) {
    case 'SET_IS_SLIDE_DOWN_MENU_OPEN':
      return {
        ...state,
        isSlideDownMenuOpen: action.isSlideDownMenuOpen,
      };
    default:
      return state;
  }
};
