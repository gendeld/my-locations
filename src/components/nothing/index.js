import React from 'react';
import './style.css';

// A stylized empty state
class Nothing extends React.PureComponent {
  render() {
    const { children } = this.props;
    return (
      <div className="nothing row center">
        {!!children ? children : 'Nothing here...'}
      </div>
    );
  }
}

export default Nothing;
