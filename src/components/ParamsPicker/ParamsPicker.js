import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

const style = {
  width: 150,
  height: 50
};

class ParamsPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      availableGenres: [],
      randomMovies: [],
      genre: '',
      ratings: '',
      year: '',
      selectedMovie: 0,
      randomPage: 0,
      yourMovie: undefined,
      initialMovie: {}
    };
  }

  //makes api call to TMDB to get list of genres available
  componentDidMount() {
    axios
      .get(
        'https://api.themoviedb.org/3/genre/movie/list?api_key=754007c908587eeaa8a0798e4a168614&language=en-US'
      )
      .then(response => {
        let genres = response.data.genres;
        this.setState({
          availableGenres: genres
        });
        console.log(this.state.initialMovie);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentWillMount() {
    axios
      .get(
        'https://api.themoviedb.org/3/movie/346364?api_key=754007c908587eeaa8a0798e4a168614&language=en-US'
      )
      .then(response => {
        let initialMovie = response.data;
        this.setState({
          initialMovie: initialMovie
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  //Set the state with the genre, rating, and year selected
  movieParams = e => {
    if (e.target.id === 'genre_dropdown') {
      this.setState({
        genre: e.target.value
      });
    } else if (e.target.id === 'rating_dropdown') {
      this.setState({
        ratings: e.target.value
      });
    } else {
      this.setState({
        year: e.target.value
      });
    }
  };

  //uses the state to make api call to TMDB and get list of movies meeting criteria
  submitParams = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=754007c908587eeaa8a0798e4a168614&include_adult=false&include_video=false&page=1&primary_release_year=${
          this.state.year
        }&vote_average.gte=${this.state.ratings}&with_genres=${
          this.state.genre
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
        this.setState({
          randomPage: randomPage
        });
        return axios
          .get(
            `https://api.themoviedb.org/3/discover/movie?api_key=754007c908587eeaa8a0798e4a168614&include_adult=false&include_video=false&page=1&primary_release_year=${
              this.state.year
            }&vote_average.gte=${this.state.ratings}&with_genres=${
              this.state.genre
            }&page=${this.state.randomPage}`
          )
          .then(response => {
            this.setState({
              randomMovies: response.data.results
            });
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

  //selects the random movie to be displayed from the list of movies with matching criteria
  pickRandomMovie = () => {
    let randomMovies = this.state.randomMovies;
    let moviePick = Math.floor(Math.random() * randomMovies.length);
    this.setState({
      yourMovie: randomMovies[moviePick]
    });
  };

  render() {
    let year = new Date().getFullYear();
    let yearArray = [];
    for (let i = year; i >= 1895; i--) {
      yearArray.push(i);
    }

    return (
      <div>
        <h1 className="text-align">Random Movie Picker</h1>
        <div className="text-align flex justify-center">
          <div className="select_holder">
            <div>
              <div className="flex justify-between">
                <div>
                  <h3>Genre</h3>
                  <select id="genre_dropdown" onChange={this.movieParams}>
                    <option value="" disabled selected>
                      Select genre...
                    </option>
                    {this.state.availableGenres.map(genre => {
                      return (
                        <option key={genre.id} value={genre.id}>
                          {genre.name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div>
                  <h3>Ratings</h3>
                  <select id="rating_dropdown" onChange={this.movieParams}>
                    <option value="" disabled selected>
                      Select rating...
                    </option>
                    {[9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map(num => {
                      return (
                        <option key={num} value={num}>
                          {num}+
                        </option>
                      );
                    })}
                  </select>
                </div>

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
              </div>
            </div>
            <div className="find_movie">
              {this.state.genre || this.state.year || this.state.ratings ? (
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
            {this.state.yourMovie ? (
              <div key={this.state.yourMovie.id}>
                <h2>{this.state.yourMovie.title}</h2>
                <div className="no_image">
                  <img
                    src={`http://image.tmdb.org/t/p/w500/${
                      this.state.yourMovie.poster_path
                    }`}
                    alt="No poster available"
                  />
                </div>
                <p>{this.state.yourMovie.overview}</p>
              </div>
            ) : (
              <div key={this.state.initialMovie.id}>
                <h2>{this.state.initialMovie.title}</h2>
                <div className="no_image">
                  <img
                    src={`http://image.tmdb.org/t/p/w500/${
                      this.state.initialMovie.poster_path
                    }`}
                    alt="No poster available"
                  />
                </div>
                <p>{this.state.initialMovie.overview}</p>
              </div>
            )}
          </div>
        </div>
        <img className="tmdb" src={require('../../tmdb.png')} />
        <p className="attribution">
          This product uses the TMDb API but is not endorsed or certified by
          TMDb.
        </p>
      </div>
    );
  }
}

export default ParamsPicker;
