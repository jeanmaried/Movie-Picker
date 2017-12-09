import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRating } from '../../redux/modules/state';

class RatingPicker extends Component {
  movieParams = e => {
    this.props.dispatch(getRating(e.target.value));
  };

  render() {
    let ratingsArray = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
    return (
      <div>
        <h3>Ratings</h3>
        <select id="rating_dropdown" onChange={this.movieParams}>
          <option value="" disabled selected>
            Select rating...
          </option>
          {ratingsArray.map(num => {
            return (
              <option key={num} value={num}>
                {num}+
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

const mapStateToProps = ({ state }) => ({
  chosenRating: state.chosenRating
});

export default connect(mapStateToProps)(RatingPicker);
