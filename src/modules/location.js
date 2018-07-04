import { removeItem, replaceItem } from '../libs/functions';

export const ADD_LOCATION = 'location/ADD_LOCATION';
export const REMOVE_LOCATION = 'location/REMOVE_LOCATION';
export const EDIT_LOCATION = 'location/EDIT_LOCATION';
export const EDIT_FORM_NAME = 'location/EDIT_FORM_NAME';
export const EDIT_FORM_ADDRESS = 'location/EDIT_FORM_ADDRESS';
export const EDIT_FORM_LATITUDE = 'location/EDIT_FORM_LATITUDE';
export const EDIT_FORM_LONGITUDE = 'location/EDIT_FORM_LONGITUDE';
export const EDIT_FORM_CATEGORIES = 'location/EDIT_FORM_CATEGORIES';
export const CLEAR_FORM = 'location/CLEAR_FORM';

const initialState = {
  locations: [],
  formName: '',
  formAddress: '',
  formLatitude: 0,
  formLongitude: 0,
  formCategories: []
};

export default (state = initialState, action) => {
  /* Checks if location's id equals to the id specified by the action */
  let locationFinder = location => {
    return location.id === action.id;
  };

  switch (action.type) {
    case ADD_LOCATION:
      return {
        ...state,
        locations: [
          ...state.locations,
          {
            id: `id${new Date().getTime()}`,
            name: action.name,
            address: action.address,
            latitude: action.latitude,
            longitude: action.longitude,
            categories: action.categories
          }
        ]
      };

    case REMOVE_LOCATION:
      return {
        ...state,
        locations: removeItem(state.locations, locationFinder, action)
      };

    case EDIT_LOCATION:
      return {
        ...state,
        locations: replaceItem(
          state.locations,
          locationFinder,
          action,
          action.location
        )
      };

    case EDIT_FORM_NAME:
      return {
        ...state,
        formName: action.name
      };

    case EDIT_FORM_ADDRESS:
      return {
        ...state,
        formAddress: action.address
      };

    case EDIT_FORM_LATITUDE:
      return {
        ...state,
        formLatitude: action.latitude
      };

    case EDIT_FORM_LONGITUDE:
      return {
        ...state,
        formLongitude: action.longitude
      };

    case EDIT_FORM_CATEGORIES:
      return {
        ...state,
        formCategories: action.categories
      };

    case CLEAR_FORM:
      return {
        ...state,
        formName: '',
        formAddress: '',
        formLatitude: 0,
        formLongitude: 0,
        formCategories: []
      };

    default:
      return state;
  }
};

// Add location to locations array
export const addLocation = (name, address, latitude, longitude, categories) => {
  return dispatch => {
    dispatch({
      type: ADD_LOCATION,
      name,
      address,
      latitude,
      longitude,
      categories
    });
  };
};

// Find location with specified ID and remove it
export const removeLocation = id => {
  return dispatch => {
    dispatch({
      type: REMOVE_LOCATION,
      id
    });
  };
};

// Find location with specified ID and replace it with given location
export const editLocation = (id, location) => {
  return dispatch => {
    dispatch({
      type: EDIT_LOCATION,
      id,
      location
    });
  };
};

// Edit cached form name
export const editLocationFormName = name => {
  return dispatch => {
    dispatch({
      type: EDIT_FORM_NAME,
      name
    });
  };
};

// Edit cached form address
export const editLocationFormAddress = address => {
  return dispatch => {
    dispatch({
      type: EDIT_FORM_ADDRESS,
      address
    });
  };
};

// Edit cached form latitude
export const editLocationFormLatitude = latitude => {
  return dispatch => {
    dispatch({
      type: EDIT_FORM_LATITUDE,
      latitude
    });
  };
};

// Edit cached form longitude
export const editLocationFormLongitude = longitude => {
  return dispatch => {
    dispatch({
      type: EDIT_FORM_LONGITUDE,
      longitude
    });
  };
};

// Edit cached form categories
export const editLocationFormCategories = categories => {
  return dispatch => {
    dispatch({
      type: EDIT_FORM_CATEGORIES,
      categories
    });
  };
};

// Clears cached form
export const clearForm = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_FORM
    });
  };
};
