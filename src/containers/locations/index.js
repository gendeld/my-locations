import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from '../../components/icon';
import Location from '../../components/location';
import SectionHeader from '../../components/sectionHeader';
import LocationForm from '../../components/locationForm';
import Nothing from '../../components/nothing';
import {
  addLocation,
  removeLocation,
  editLocation,
  editLocationFormName,
  editLocationFormAddress,
  editLocationFormLatitude,
  editLocationFormLongitude,
  editLocationFormCategories,
  clearForm
} from '../../modules/location';
import Modal from 'react-modal';
import './style.css';

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,.5)'
  },
  content: {
    padding: '60px 60px 40px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80vw',
    height: 640
  }
};

// A container for existing locations and a form for creating new ones
class Locations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 0, // Container opacity for transitions
      modalIsOpen: false, // Flag that determines if location editing modal is open

      // Details for the location now being edited in modal
      editedLocationId: '',
      editedLocationName: '',
      editedLocationAddress: '',
      editedLocationLatitude: 0,
      editedLocationLongitude: 0,
      editedLocationCategories: [],

      categoryOptionMap: this.mapCategories(props.categories), // Select input options
      categoryIdMap: this.mapCategoryIds(props.categories) // Category names mapped to their IDs
    };
  }

  // Transition: after component has mounted, set it’s opacity to 1
  componentDidMount() {
    let $this = this;
    this._mounted = true;
    setTimeout(() => {
      $this.setState({ opacity: 1 });
    }, 150);
  }

  // When receiving props, if component has mounted and categories have changed, remap them
  componentWillReceiveProps(nextProps) {
    if (
      this._mounted === true &&
      nextProps.categories !== this.props.categories
    ) {
      let categoryIdMap = this.mapCategoryIds(nextProps.categories);
      let categoryOptionMap = this.mapCategories(nextProps.categories);
      this.setState({ categoryIdMap, categoryOptionMap });
    }
  }

  // Transition: when the component is about to unmount, set it’s opacity to 0
  componentWillUnmount() {
    this.setState({ opacity: 0 });
  }

  // Maps categories to Select input options
  mapCategories(categories) {
    return categories.map(category => {
      return { value: category.id, label: category.name };
    });
  }

  // Maps categories’ names to their IDs
  mapCategoryIds(categories) {
    let categoryIdMap = {};
    categories.forEach(category => {
      categoryIdMap[category.id] = category.name;
    });
    return categoryIdMap;
  }

  // Edit location using reducer and close editing modal, receives new location attributes
  editLocation(
    locationNameValue,
    locationAddressValue,
    locationLatitudeValue,
    locationLongitudeValue,
    locationCategoriesValue
  ) {
    const { editedLocationId } = this.state;
    if (!!editedLocationId) {
      let location = {
        id: editedLocationId,
        name: locationNameValue,
        address: locationAddressValue,
        latitude: locationLatitudeValue,
        longitude: locationLongitudeValue,
        categories: locationCategoriesValue
      };
      this.props.editLocation(editedLocationId, location);
    }
    this.closeModal();
  }

  // Add location using reducer and close editing modal, receives new location attributes
  addLocation(
    locationNameValue,
    locationAddressValue,
    locationLatitudeValue,
    locationLongitudeValue,
    locationCategoriesValue
  ) {
    this.props.addLocation(
      locationNameValue,
      locationAddressValue,
      locationLatitudeValue,
      locationLongitudeValue,
      locationCategoriesValue
    );
    this.props.clearForm();
  }

  // Opens location editing modal, receives location we want to edit
  openModal(location) {
    const { id, name, address, latitude, longitude, categories } = location;
    this.setState({
      modalIsOpen: true,
      editedLocationId: id,
      editedLocationName: name,
      editedLocationAddress: address,
      editedLocationLatitude: latitude,
      editedLocationLongitude: longitude,
      editedLocationCategories: categories
    });
  }

  // Closes location editing modal
  closeModal() {
    this.setState({
      modalIsOpen: false,
      editedLocationId: '',
      editedLocationName: '',
      editedLocationAddress: '',
      editedLocationLatitude: 0,
      editedLocationLongitude: 0,
      editedLocationCategories: []
    });
  }

  render() {
    const {
      categories,
      locations,
      removeLocation,
      formName,
      formAddress,
      formLatitude,
      formLongitude,
      formCategories
    } = this.props;
    const {
      editedLocationName,
      editedLocationAddress,
      editedLocationLatitude,
      editedLocationLongitude,
      editedLocationCategories,
      modalIsOpen,
      categoryOptionMap,
      categoryIdMap,
      opacity
    } = this.state;
    return (
      <div className={opacity === 0 ? 'opacity-zero' : ''}>
        <h1>Locations</h1>
        <div>
          <SectionHeader>Add location</SectionHeader>
          {categories.length === 0 ? (
            <Nothing>Create some categories first...</Nothing>
          ) : (
            <LocationForm
              categoryOptionMap={categoryOptionMap}
              categoryIdMap={categoryIdMap}
              name={formName}
              address={formAddress}
              latitude={formLatitude}
              longitude={formLongitude}
              categories={formCategories}
              editLocationFormName={this.props.editLocationFormName}
              editLocationFormAddress={this.props.editLocationFormAddress}
              editLocationFormLatitude={this.props.editLocationFormLatitude}
              editLocationFormLongitude={this.props.editLocationFormLongitude}
              editLocationFormCategories={this.props.editLocationFormCategories}
              addLocation={this.addLocation.bind(this)}
            />
          )}
        </div>
        <div style={{ height: 100 }} />
        <div className="full-width">
          <SectionHeader>Current locations</SectionHeader>
          {locations.length === 0 ? (
            <Nothing />
          ) : (
            <div className="row">
              {locations.map(location => {
                return (
                  <Location
                    key={location.id}
                    location={location}
                    openModal={this.openModal.bind(this)}
                    removeLocation={removeLocation}
                    categoryIdMap={categoryIdMap}
                  />
                );
              })}
            </div>
          )}
        </div>
        <Modal
          style={modalStyles}
          isOpen={modalIsOpen}
          onRequestClose={this.closeModal.bind(this)}>
          <div
            className="row center close"
            onClick={this.closeModal.bind(this)}>
            <Icon name="close" color="#000" size="24" />
          </div>
          {modalIsOpen && (
            <LocationForm
              isForEdit={true}
              categoryOptionMap={categoryOptionMap}
              categoryIdMap={categoryIdMap}
              name={editedLocationName}
              address={editedLocationAddress}
              latitude={editedLocationLatitude}
              longitude={editedLocationLongitude}
              categories={editedLocationCategories}
              addLocation={this.editLocation.bind(this)}
            />
          )}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  locations: state.location.locations,
  formName: state.location.formName,
  formAddress: state.location.formAddress,
  formLatitude: state.location.formLatitude,
  formLongitude: state.location.formLongitude,
  formCategories: state.location.formCategories,
  categories: state.category.categories
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addLocation,
      removeLocation,
      editLocation,
      editLocationFormName,
      editLocationFormAddress,
      editLocationFormLatitude,
      editLocationFormLongitude,
      editLocationFormCategories,
      clearForm
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Locations);
