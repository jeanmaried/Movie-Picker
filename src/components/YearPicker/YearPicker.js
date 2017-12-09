import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getYear } from '../../redux/modules/state';

class YearPicker extends Component {
  movieParams = e => {
    this.props.dispatch(getYear(e.target.value));
  };

  render() {
    let year = new Date().getFullYear();
    let yearArray = [];
    for (let i = year; i >= 1895; i--) {
      yearArray.push(i);
    }

    return (
      <div>
        <h3>Year</h3>
        <select id="year_dropdown" onChange={this.movieParams}>
          <option value="" disabled selected>
            Select year...
          </option>
          {yearArray.map(year => {
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

const mapStateToProps = ({ state }) => ({
  chosenYear: state.chosenYear
});

export default connect(mapStateToProps)(YearPicker);
