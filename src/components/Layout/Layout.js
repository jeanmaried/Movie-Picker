import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import GenrePicker from '../GenrePicker';
import RatingPicker from '../RatingPicker';
import YearPicker from '../YearPicker';
import YourMovie from '../YourMovie';
import InitialMovie from '../InitialMovie';
import { connect } from 'react-redux';
import {
  getYourMovie,
  getRandomPage,
  getRandomMovies
} from '../../redux/modules/state';
import axios from 'axios';

const style = {
  width: 150,
  height: 50
};

class ParamsPicker extends Component {
  submitParams = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=754007c908587eeaa8a0798e4a168614&include_adult=false&include_video=false&page=1&primary_release_year=${
          this.props.chosenYear
        }&vote_average.gte=${this.props.chosenRating}&with_genres=${
          this.props.chosenGenre
        }`
      )
      .then(response => {
        let totalPages = response.data.total_pages;
        let randomPage;
        if (totalPages <= 1) {
          randomPage = 1;
        } else {
          randomPage = Math.floor(Math.random() * totalPages + 1);
        }
        this.props.dispatch(getRandomPage(randomPage));

        return axios
          .get(
            `https://api.themoviedb.org/3/discover/movie?api_key=754007c908587eeaa8a0798e4a168614&include_adult=false&include_video=false&page=1&primary_release_year=${
              this.props.chosenYear
            }&vote_average.gte=${this.props.chosenRating}&with_genres=${
              this.props.chosenGenre
            }&page=${this.props.randomPage}`
          )
          .then(response => {
            let randomMovies = response.data.results;
            this.props.dispatch(getRandomMovies(randomMovies));
            this.pickRandomMovie();
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  pickRandomMovie = () => {
    let randomMovies = this.props.randomMovies;
    let moviePick = Math.floor(Math.random() * randomMovies.length);

    let yourMovie = randomMovies[moviePick];

    this.props.dispatch(getYourMovie(yourMovie));
  };

  render() {
    return (
      <div>
        <h1 className="text-align">Random Movie Picker</h1>
        <div className="text-align flex justify-center">
          <div className="select_holder">
            <div>
              <div className="flex justify-between">
                <GenrePicker />
                <RatingPicker />
                <YearPicker />
              </div>
            </div>
            <div className="find_movie">
              {this.props.chosenGenre ||
              this.props.chosenYear ||
              this.props.chosenRating ? (
                <RaisedButton
                  label="Find movie"
                  style={style}
                  onClick={this.submitParams}
                />
              ) : (
                <RaisedButton
                  label="Find movie"
                  style={style}
                  onClick={this.submitParams}
                  disabled={true}
                />
              )}
            </div>
          </div>
          <div className="movie_holder">
            {this.props.yourMovie ? <YourMovie /> : <InitialMovie />}
          </div>
        </div>
        <img className="tmdb" src={require('../../tmdb.png')} alt="TMDB logo" />
        <p className="attribution">
          This product uses the TMDb API but is not endorsed or certified by
          TMDb.
        </p>
      </div>
    );
  }
}

const mapStateToProps = ({ state }) => ({
  chosenGenre: state.chosenGenre,
  chosenRating: state.chosenRating,
  chosenYear: state.chosenYear,
  randomMovies: state.randomMovies,
  selectedMovie: state.selectedMovie,
  randomPage: state.randomPage,
  yourMovie: state.yourMovie,
  initialMovie: state.initialMovie
});

export default connect(mapStateToProps)(ParamsPicker);
