import React from 'react';

// SVG paths
const svgs = {
  pencil:
    'M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z',
  trash:
    'M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z',
  close:
    'M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z'
};

// An icon component
class Icon extends React.PureComponent {
  render() {
    const { name, color, size, onClick } = this.props;
    return (
      <div className="icon">
        <svg
          onClick={onClick}
          style={{ width: size, height: size }}
          viewBox={`0 0 ${size} ${size}`}>
          <path fill={color} d={svgs[name]} />
        </svg>
      </div>
    );
  }
}

export default Icon;
