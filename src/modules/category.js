import { removeItem, replaceItem } from '../libs/functions';

export const ADD_CATEGORY = 'category/ADD_CATEGORY';
export const REMOVE_CATEGORY = 'category/REMOVE_CATEGORY';
export const EDIT_CATEGORY_NAME = 'category/EDIT_CATEGORY_NAME';
export const EDIT_FORM_NAME = 'category/EDIT_FORM_NAME';

const initialState = {
  categories: [],
  formName: ''
};

export default (state = initialState, action) => {
  /* Checks if category's id equals to the id specified by the action */
  let categoryFinder = category => {
    return category.id === action.id;
  };

  switch (action.type) {
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [
          ...state.categories,
          { id: `id${new Date().getTime()}`, name: action.name }
        ]
      };

    case REMOVE_CATEGORY:
      return {
        ...state,
        categories: removeItem(state.categories, categoryFinder, action)
      };

    case EDIT_CATEGORY_NAME:
      return {
        ...state,
        categories: replaceItem(state.categories, categoryFinder, action, {
          id: action.id,
          name: action.name
        })
      };

    case EDIT_FORM_NAME:
      return {
        ...state,
        formName: action.name
      };

    default:
      return state;
  }
};

// Add category to categories array
export const addCategory = name => {
  return dispatch => {
    dispatch({
      type: ADD_CATEGORY,
      name
    });
  };
};

// Find category with specified ID and remove it
export const removeCategory = id => {
  return dispatch => {
    dispatch({
      type: REMOVE_CATEGORY,
      id
    });
  };
};

// Find category with specified ID and replace its name
export const editCategoryName = (id, name) => {
  return dispatch => {
    dispatch({
      type: EDIT_CATEGORY_NAME,
      id,
      name
    });
  };
};

export const editCategoryFormName = name => {
  return dispatch => {
    dispatch({
      type: EDIT_FORM_NAME,
      name
    });
  };
};
