import React from 'react';
import './style.css';

// A user generated category
class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryNameValue: props.category.name, // Category's name input value
      editing: false // Flag that determines if editing is enabled
    };
  }

  // Sets the value of an input event to state's category name value
  inputChange(event) {
    if (!!event) {
      this.setState({ categoryNameValue: event.target.value });
    }
  }

  // Deletes this category using reducer
  removeCategory() {
    const { category } = this.props;
    this.props.removeCategory(category.id);
  }

  /* Check if entered category name is valid and if so submits it using passed down method that interacts with reducer */
  editCategoryName() {
    const { category } = this.props;
    const { editing, categoryNameValue } = this.state;
    if (editing === true) {
      if (categoryNameValue.length > 0) {
        this.props.editCategoryName(category.id, categoryNameValue);
        this.setState({ editing: false });
      }
    } else {
      this.setState({ editing: true });
    }
  }

  render() {
    const { category } = this.props;
    const { editing, categoryNameValue } = this.state;

    // Sets input status: not editing / editing / invalid
    let inputClassName =
      editing !== true
        ? 'zero-width'
        : categoryNameValue.length === 0
          ? 'invalid'
          : '';

    return (
      <div className="existing-category input-container">
        <div className={`inline ${editing === true ? 'zero-width' : ''}`}>
          {category.name}
        </div>
        <input
          className={inputClassName}
          value={categoryNameValue}
          onChange={this.inputChange.bind(this)}
        />
        <div className="distance" />
        <button onClick={this.editCategoryName.bind(this)}>
          {editing === true ? 'Confirm' : 'Edit'}
        </button>
        <div className="distance" />
        <button onClick={this.removeCategory.bind(this)}>Remove</button>
      </div>
    );
  }
}

export default Category;
