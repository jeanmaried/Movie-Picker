import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRating } from '../../redux/modules/state';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class RatingPicker extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 'Select rating...' };
  }

  movieParams = (event, index, value) => {
    this.setState({
      value: value
    });
    this.props.dispatch(getRating(value));
  };

  render() {
    let ratingsArray = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
    return (
      <div className="flex">
        <h4>Ratings</h4>
        <DropDownMenu
          value={this.state.value}
          id="rating_dropdown"
          onChange={this.movieParams}
        >
          {ratingsArray.map(num => {
            return <MenuItem key={num} value={num} primaryText={num} />;
          })}
        </DropDownMenu>
      </div>
    );
  }
}

const mapStateToProps = ({ state }) => ({
  chosenRating: state.chosenRating
});

export default connect(mapStateToProps)(RatingPicker);
