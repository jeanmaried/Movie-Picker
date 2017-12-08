import React, { Component } from 'react';
import axios from 'axios';

class ParamsPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      genres: []
    };
  }

  componentDidMount() {
    axios
      .get(
        'https://api.themoviedb.org/3/genre/movie/list?api_key=754007c908587eeaa8a0798e4a168614&language=en-US'
      )
      .then(response => {
        let genres = response.data.genres;
        this.setState({
          genres: genres
        });
        console.log(this.state.genres);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  movieParams = e => {
    console.log(e.target.value);
  };

  render() {
    let year = new Date().getFullYear();
    let yearArray = [];
    for (let i = year; i >= 1895; i--) {
      yearArray.push(i);
    }
    return (
      <div className="text-align">
        <h1>Pick Random Movie Parameters</h1>
        <div className="flex justify-around">
          <div className="genre_dropdown">
            <h3>Genre</h3>
            <select onChange={this.movieParams}>
              {this.state.genres.map(genre => {
                return (
                  <option key={genre.id} value={genre.name}>
                    {genre.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="rating_dropdown">
            <h3>Rating Range</h3>
            <select onChange={this.movieParams}>
              {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map(num => {
                return (
                  <option key={num} value={num}>
                    {num}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="year_dropdown">
            <h3>Year Range</h3>
            <select onChange={this.movieParams}>
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
    );
  }
}

export default ParamsPicker;

//'https://api.themoviedb.org/3/discover/movie?api_key=754007c908587eeaa8a0798e4a168614&language=en-US&with_genres=35' add this at the end maybe: &language=en-US
