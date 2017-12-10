import React, { Component } from 'react';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import {
  getYourMovie,
  getRandomPage,
  getRandomMovies
} from '../../redux/modules/state';

const style = {
  width: 150
};

class FindMovie extends Component {
  submitParams = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=754007c908587eeaa8a0798e4a168614&include_adult=false&include_video=false&page=1&primary_release_year=${
          this.props.chosenYear
        }&vote_average.gte=${this.props.chosenRating}&vote_average.lte=${this
          .props.chosenRating + 1}&with_genres=${this.props.chosenGenre}`
      )
      .then(response => {
        let totalPages = response.data.total_pages;
        console.log(totalPages);
        let randomPage;
        if (totalPages <= 1) {
          randomPage = 1;
        } else {
          randomPage = Math.floor(Math.random() * 1000);
        }
        this.props.dispatch(getRandomPage(randomPage));

        return axios
          .get(
            `https://api.themoviedb.org/3/discover/movie?api_key=754007c908587eeaa8a0798e4a168614&include_adult=false&include_video=false&page=1&primary_release_year=${
              this.props.chosenYear
            }&vote_average.gte=${
              this.props.chosenRating
            }&vote_average.lte=${this.props.chosenRating + 1}&with_genres=${
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
    );
  }
}

const mapStateToProps = ({ state }) => ({
  chosenGenre: state.chosenGenre,
  chosenRating: state.chosenRating,
  chosenYear: state.chosenYear,
  randomMovies: state.randomMovies,
  randomPage: state.randomPage,
  yourMovie: state.yourMovie
});

export default connect(mapStateToProps)(FindMovie);
