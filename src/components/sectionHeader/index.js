import React from 'react';
import './style.css';

// A stylized header for sections
class SectionHeader extends React.PureComponent {
  render() {
    return (
      <div className="section-header">
        <h2>{this.props.children}</h2>
      </div>
    );
  }
}

export default SectionHeader;
