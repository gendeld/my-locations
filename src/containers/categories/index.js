import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Category from '../../components/category';
import LocationInput from '../../components/locationInput';
import SectionHeader from '../../components/sectionHeader';
import Nothing from '../../components/nothing';
import {
  addCategory,
  removeCategory,
  editCategoryName,
  editCategoryFormName
} from '../../modules/category';

// A container for existing categories and a form for creating new ones
class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 0, // Container opacity for transitions
      categoryNameValue: !!props.formName ? props.formName : '', // Add category forms' name value
      categoryNameInitialized: false // Did the user start writing category name
    };
  }

  // Transition: after component has mounted, set it’s opacity to 1
  componentDidMount() {
    let $this = this;
    setTimeout(() => {
      $this.setState({ opacity: 1 });
    }, 150);
  }

  // Transition: when the component is about to unmount, set it’s opacity to 0
  componentWillUnmount() {
    this.setState({ opacity: 0 });
  }

  // Receives input event and sets its value to state
  inputChange(event) {
    if (!!event) {
      let stateOb = {};
      stateOb.categoryNameValue = event.target.value;
      if (this.state.categoryNameInitialized === false) {
        stateOb.categoryNameInitialized = true;
      }
      this.props.editCategoryFormName(stateOb.categoryNameValue);
      this.setState(stateOb);
    }
  }

  // If value is valid, add category through reducer and reset form, otherwise, show the error
  addCategory() {
    if (this.state.categoryNameValue.length > 0) {
      this.props.addCategory(this.state.categoryNameValue);
      this.props.editCategoryFormName('');
      this.setState({ categoryNameValue: '', categoryNameInitialized: false });
    } else {
      this.setState({ categoryNameInitialized: true });
    }
  }

  render() {
    const { categories, removeCategory, editCategoryName } = this.props;
    const { opacity, categoryNameValue, categoryNameInitialized } = this.state;
    return (
      <div
        className={
          opacity === 0 ? 'long-transition opacity-zero' : 'long-transition'
        }>
        <h1>Categories</h1>
        <div>
          <SectionHeader>Add category</SectionHeader>
          <div>
            <LocationInput
              title="Name"
              initialized={categoryNameInitialized}
              value={categoryNameValue}
              onChange={this.inputChange.bind(this)}
            />
            <button
              className="submit-button"
              onClick={this.addCategory.bind(this)}>
              Add
            </button>
          </div>
        </div>
        <div style={{ height: 100 }} />
        <div className="full-width">
          <SectionHeader>Current categories</SectionHeader>
          {categories.length === 0 ? (
            <Nothing />
          ) : (
            categories.map(category => {
              return (
                <Category
                  key={category.id}
                  removeCategory={removeCategory}
                  editCategoryName={editCategoryName}
                  category={category}
                />
              );
            })
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.category.categories,
  formName: state.category.formName
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addCategory,
      removeCategory,
      editCategoryName,
      editCategoryFormName
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories);
