import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getYear } from '../../redux/modules/state';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class YearPicker extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 'Select year...' };
  }

  movieParams = (event, index, value) => {
    this.setState({
      value: value
    });
    this.props.dispatch(getYear(value));
  };

  render() {
    let year = new Date().getFullYear();
    let yearArray = [];
    for (let i = year; i >= 1895; i--) {
      yearArray.push(i);
    }

    return (
      <div className="flex">
        <h4>Year</h4>
        <DropDownMenu
          value={this.state.value}
          id="year_dropdown"
          onChange={this.movieParams}
        >
          {yearArray.map(year => {
            return <MenuItem key={year} value={year} primaryText={year} />;
          })}
        </DropDownMenu>
      </div>
    );
  }
}

const mapStateToProps = ({ state }) => ({
  chosenYear: state.chosenYear
});

export default connect(mapStateToProps)(YearPicker);
