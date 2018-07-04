import React from 'react';
import LocationPicker from 'location-picker';
import './style.css';

// Map / Location Picker
class Map extends React.Component {
  constructor(props) {
    super(props);
    this.timestamp = new Date().getTime(); // Used for differentiation between maps
  }

  // Once the component has mounted, initialize map configs and location
  componentDidMount() {
    this._mounted = true;
    this.setLocation(this.props.forcedLng, this.props.forcedLat);
  }

  /* Sets map configs and location,
    receives coordinates entered by user in form,
    if no such coordinates exist, sets the map to user's current location */
  setLocation(forcedLng, forcedLat) {
    const { updateMapCoordinates, disabled } = this.props;
    let options =
      !!forcedLng && !!forcedLat
        ? {
            setCurrentPosition: false,
            lat: forcedLat,
            lng: forcedLng
          }
        : {};
    let lp = new LocationPicker(`map${this.timestamp}`, options, {
      zoom: 15 // You can set any google map options here, zoom defaults to 15
    });
    if (!disabled) {
      // Listen to when user finished interacting with map and send new coordinates to form
      if (!!this.listener) {
        window.google.maps.event.removeListener(this.listener);
      }
      this.listener = window.google.maps.event.addListener(
        lp.map,
        'idle',
        function(event) {
          let location = lp.getMarkerPosition();
          updateMapCoordinates(location.lng, location.lat);
        }
      );
    }
  }

  // If user has entered valid coordinates in form, set them as map's new location
  componentWillReceiveProps(nextProps) {
    if (
      !!this._mounted &&
      !!nextProps.forcedLng &&
      !!nextProps.forcedLat &&
      (nextProps.forcedLng !== this.props.forcedLng ||
        nextProps.forcedLat !== this.props.forcedLat)
    ) {
      this.setLocation(nextProps.forcedLng, nextProps.forcedLat);
    }
  }

  // Only re-render if received new coordinates from form
  shoudlComponentUpdate(nextProps) {
    const { forcedLat, forcedLng } = this.props;
    return (
      nextProps.forcedLat !== forcedLat || nextProps.forcedLng !== forcedLng
    );
  }

  render() {
    const { disabled } = this.props;
    return (
      <div
        className={`map ${disabled && 'disabled'}`}
        id={`map${this.timestamp}`}
      />
    );
  }
}

export default Map;
