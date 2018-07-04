import React from 'react';
import './style.css';

// A stylized location form input with title and invalid state
class LocationInput extends React.Component {
  render() {
    const {
      value,
      type,
      onChange,
      onFocus,
      onBlur,
      title,
      initialized,
      invalidText,
      children
    } = this.props;
    let invalid =
      initialized === true && (!value || value.length === 0) ? 'invalid' : '';
    return (
      <div className={`input-container ${invalid}`}>
        {title && <div className="input-title">{title}</div>}
        {!!children ? (
          children
        ) : (
          <input
            type={type}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        )}
        {!!invalidText && (
          <div className={`error ${invalid ? '' : 'zero-height'}`}>
            <small>{invalidText}</small>
          </div>
        )}
      </div>
    );
  }
}

export default LocationInput;
