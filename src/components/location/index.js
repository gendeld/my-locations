import React from 'react';
import Map from '../map';
import Icon from '../icon';
import './style.css';

// A stylized user generated location
class Location extends React.Component {
  // Opens location editing modal, receives location we want to edit
  openModal() {
    const { location, openModal } = this.props;
    if (!!openModal) {
      openModal(location);
    }
  }

  // Deletes this location using reducer
  removeLocation() {
    const { location, removeLocation } = this.props;
    if (!!removeLocation) {
      removeLocation(location.id);
    }
  }

  render() {
    /* location: displayed location details
      categoryIdMap: maps category names to their IDs */
    const { location, categoryIdMap } = this.props;
    const { name, address, latitude, longitude, categories } = location;
    return (
      <div className="location">
        <Map forcedLng={longitude} forcedLat={latitude} disabled />
        <div className="info">
          <h1>{name}</h1>
          <h2>{address}</h2>
          {!!latitude &&
            !!longitude && (
              <div>
                <small>
                  <b>LAT</b>: {latitude.toFixed(3)}{' '}
                  <span className="narrow">/</span> <b>LNG</b>:{' '}
                  {longitude.toFixed(3)}
                </small>
              </div>
            )}
          <div>
            {!!categoryIdMap &&
              categories.map(categoryId => {
                return !categoryIdMap[categoryId] ? (
                  <div key={categoryId} />
                ) : (
                  <div key={categoryId} className="category-label">
                    <small>{categoryIdMap[categoryId]}</small>
                  </div>
                );
              })}
          </div>
          <div className="icon-container">
            <Icon
              onClick={this.removeLocation.bind(this)}
              name="trash"
              color="#FFF"
              size="24"
            />
            <div className="icon-distance" />
            <Icon
              onClick={this.openModal.bind(this)}
              name="pencil"
              color="#FFF"
              size="24"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Location;
