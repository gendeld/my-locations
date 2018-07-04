import React from 'react';
import Select from 'react-select';
import LocationInput from '../locationInput';
import Map from '../map';

// Select input styles
const controlStyles = styles => ({
  ...styles,
  backgroundColor: 'white',
  boxShadow: 0,
  borderRadius: 14,
  borderWidth: 2,
  outline: 0,
  borderColor: 'lightgray'
});

// Texts used if inputs are invalid
const invalidNameText = 'Name field is empty';
const invalidAddressText = 'Address field is empty';
const invalidCategoriesText = 'You must pick at least one category';

// A form for editing and creating locations
class LocationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // User filled coordinates to be passed down to map
      latitude: !!props.latitude ? props.latitude : 0,
      longitude: !!props.longitude ? props.longitude : 0,
      // Location details, if we're editing, initial values are taken from props
      locationNameValue: !!props.name ? props.name : '',
      locationAddressValue: !!props.address ? props.address : '',
      locationLatitudeValue: !!props.latitude ? props.latitude : 0,
      locationLongitudeValue: !!props.longitude ? props.longitude : 0,
      locationCategoriesValue: !!props.categories ? props.categories : [],
      locationNameInitialized: !!props.name ? true : false,
      locationAddressInitialized: !!props.address ? true : false,
      locationLatitudeInitialized: !!props.latitude ? true : false,
      locationLongitudeInitialized: !!props.longitude ? true : false,
      locationCategoriesInitialized:
        !!props.categories && props.categories.length > 0 ? true : false
    };
  }

  /* Once the component has mounted, if we are editing an existing location,
    map categories value to Select input options and apply them to the input */
  componentDidMount() {
    const { categories, categoryIdMap } = this.props;
    if (!!categories && categories.length > 0 && !!categoryIdMap) {
      let value = categories.map(category => {
        return { value: category, label: categoryIdMap[category] };
      });
      this.setSelectValue(value);
    }
  }

  // Sets the value of an input event to attribute of form's state
  inputChange(event, attr) {
    if (!!event) {
      let stateOb = {};
      stateOb[attr] = event.target.value;
      this.setState(stateOb);
    }
  }

  /* When uses finishes to manipulate GUI map, this function is called with the new coordinates,
    it checks that the coordinates didn't come from input and sets the values to state */
  updateMapCoordinates(longitude, latitude) {
    if (this.isLatFocused !== true && this.isLngFocused !== true) {
      let stateOb = {
        locationLongitudeValue: longitude,
        locationLatitudeValue: latitude
      };
      if (!this.state.latitude) {
        stateOb.latitude = latitude;
      }
      if (!this.state.longitude) {
        stateOb.longitude = longitude;
      }
      // Update store for caching purposes
      if (!!this.props.editLocationFormLatitude) {
        this.props.editLocationFormLatitude(latitude);
      }
      if (!!this.props.editLocationFormLongitude) {
        this.props.editLocationFormLongitude(longitude);
      }
      this.setState(stateOb);
    }
  }

  // Sets the name value and marks input as initialized
  changeNameValue(event) {
    if (this.state.locationNameInitialized === false) {
      this.setState({ locationNameInitialized: true });
    }
    // Update store for caching purposes
    if (!!event && !!this.props.editLocationFormName) {
      this.props.editLocationFormName(event.target.value);
    }
    this.inputChange(event, 'locationNameValue');
  }

  // Sets the address value and marks input as initialized
  changeAddressValue(event) {
    if (this.state.locationAddressInitialized === false) {
      this.setState({ locationAddressInitialized: true });
    }
    // Update store for caching purposes
    if (!!event && !!this.props.editLocationFormAddress) {
      this.props.editLocationFormAddress(event.target.value);
    }
    this.inputChange(event, 'locationAddressValue');
  }

  // Sets the latitude value and marks input as initialized
  changeLatitudeValue(event) {
    if (this.isLatFocused === true) {
      let stateOb = {};
      stateOb.latitude = event.target.value;
      if (this.state.locationLatitudeInitialized === false) {
        stateOb.locationLatitudeInitialized = true;
      }
      // Update store for caching purposes
      if (!!this.props.editLocationFormLatitude) {
        this.props.editLocationFormLatitude(stateOb.latitude);
      }
      this.setState(stateOb);
      this.inputChange(event, 'locationLatitudeValue');
    }
  }

  // Sets the longitude value and marks input as initialized
  changeLongitudeValue(event) {
    if (this.isLngFocused === true) {
      let stateOb = {};
      stateOb.longitude = event.target.value;
      if (this.state.locationLongitudeInitialized === false) {
        stateOb.locationLongitudeInitialized = true;
      }
      // Update store for caching purposes
      if (!!this.props.editLocationFormLongitude) {
        this.props.editLocationFormLongitude(stateOb.longitude);
      }
      this.setState(stateOb);
      this.inputChange(event, 'locationLongitudeValue');
    }
  }

  // Sets the categories value and marks input as initialized
  changeCategoriesValue(value) {
    let stateOb = {};

    // Map an array of category IDs
    stateOb.locationCategoriesValue = value.map(category => {
      return category.value;
    });

    // Update store for caching purposes
    if (!!this.props.editLocationFormCategories) {
      this.props.editLocationFormCategories(stateOb.locationCategoriesValue);
    }

    if (this.state.locationCategoriesInitialized === false) {
      stateOb.locationCategoriesInitialized = true;
    }
    this.setState(stateOb);
  }

  // Clears the Select input
  clearSelectValue() {
    if (!!this.selectInput && !!this.selectInput.select) {
      this.selectInput.select.clearValue();
    }
  }

  // Selects values in the Select input
  setSelectValue(value) {
    if (!!this.selectInput && !!this.selectInput.select) {
      this.selectInput.select.setValue(value);
    }
  }

  /* Checks if all new details are valid and if so submits them using passed down method that interacts with reducer,
    otherwise, sets all values as initialized which will show the errors present */
  submit() {
    const { addLocation } = this.props;
    const {
      locationCategoriesValue,
      locationNameValue,
      locationAddressValue,
      locationLatitudeValue,
      locationLongitudeValue
    } = this.state;
    if (
      !!locationCategoriesValue &&
      locationCategoriesValue.length > 0 &&
      !!locationNameValue &&
      !!locationAddressValue &&
      !!locationLatitudeValue &&
      !!locationLongitudeValue
    ) {
      addLocation(
        locationNameValue,
        locationAddressValue,
        locationLatitudeValue,
        locationLongitudeValue,
        locationCategoriesValue
      );
      this.clearSelectValue();
      this.setState({
        locationNameValue: '',
        locationAddressValue: '',
        locationLatitudeValue: 0,
        locationLongitudeValue: 0,
        locationCategoriesValue: [],
        locationNameInitialized: false,
        locationAddressInitialized: false,
        locationLongitudeInitialized: false,
        locationLatitudeInitialized: false,
        locationCategoriesInitialized: false,
        longitude: 0,
        latitude: 0
      });
    } else {
      this.setState({
        locationNameInitialized: true,
        locationAddressInitialized: true,
        locationLongitudeInitialized: true,
        locationLatitudeInitialized: true,
        locationCategoriesInitialized: true
      });
    }
  }

  render() {
    const {
      locationCategoriesInitialized,
      locationNameInitialized,
      locationAddressInitialized,
      locationLatitudeInitialized,
      locationLongitudeInitialized,
      latitude,
      longitude,
      locationCategoriesValue,
      locationNameValue,
      locationAddressValue,
      locationLongitudeValue,
      locationLatitudeValue
    } = this.state;
    const { isForEdit, categoryOptionMap } = this.props;
    return (
      <div className="full-width">
        <div className="float-left location-inputs-container">
          <LocationInput
            title="Name"
            invalidText={invalidNameText}
            initialized={locationNameInitialized}
            value={locationNameValue}
            onChange={this.changeNameValue.bind(this)}
          />
          <LocationInput
            title="Address"
            invalidText={invalidAddressText}
            initialized={locationAddressInitialized}
            value={locationAddressValue}
            onChange={this.changeAddressValue.bind(this)}
          />
          <LocationInput
            title="Latitude"
            initialized={locationLatitudeInitialized}
            type="number"
            value={locationLatitudeValue}
            onChange={this.changeLatitudeValue.bind(this)}
            onFocus={() => {
              this.isLatFocused = true;
            }}
            onBlur={() => {
              this.isLatFocused = false;
            }}
          />
          <LocationInput
            title="Longitude"
            initialized={locationLongitudeInitialized}
            type="number"
            value={locationLongitudeValue}
            onChange={this.changeLongitudeValue.bind(this)}
            onFocus={() => {
              this.isLngFocused = true;
            }}
            onBlur={() => {
              this.isLngFocused = false;
            }}
          />
          <LocationInput
            title="Categories"
            invalidText={invalidCategoriesText}
            initialized={locationCategoriesInitialized}
            value={locationCategoriesValue}>
            <Select
              clearable
              isMulti
              options={categoryOptionMap}
              styles={{ control: controlStyles }}
              onChange={this.changeCategoriesValue.bind(this)}
              ref={ref => {
                this.selectInput = ref;
              }}
            />
          </LocationInput>
          <button className="submit-button" onClick={this.submit.bind(this)}>
            {isForEdit ? 'Edit' : 'Add'}
          </button>
        </div>
        <Map
          forcedLng={longitude}
          forcedLat={latitude}
          updateMapCoordinates={this.updateMapCoordinates.bind(this)}
        />
      </div>
    );
  }
}

export default LocationForm;
