import React, { Component } from 'react';
import GenrePicker from '../GenrePicker';
import RatingPicker from '../RatingPicker';
import YearPicker from '../YearPicker';
import YourMovie from '../YourMovie';
import InitialMovie from '../InitialMovie';
import FindMovie from '../FindMovie';
import { connect } from 'react-redux';

class ParamsPicker extends Component {
  render() {
    return (
      <div>
        <div className="header flex align-items-center">
          <img
            className="tmdb"
            src={require('../../tmdb.png')}
            alt="TMDB logo"
          />
          <h2>MOVIE PICKER</h2>
        </div>

        <div className="flex flex-wrap justify-center text-align">
          <div className="">
            <div>
              <GenrePicker />
              <RatingPicker />
              <YearPicker />
            </div>
            <FindMovie />
          </div>
          <div className="movie_holder">
            {this.props.yourMovie ? <YourMovie /> : <InitialMovie />}
          </div>
        </div>

        <p className="attribution text-align">
          This product uses the TMDb API but is not endorsed or certified by
          TMDb.
        </p>
      </div>
    );
  }
}

const mapStateToProps = ({ state }) => ({
  yourMovie: state.yourMovie,
  initialMovie: state.initialMovie
});

export default connect(mapStateToProps)(ParamsPicker);
