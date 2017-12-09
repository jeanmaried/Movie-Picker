import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getGenre, getAvailableGenres } from '../../redux/modules/state';

class GenrePicker extends Component {
  componentDidMount() {
    axios
      .get(
        'https://api.themoviedb.org/3/genre/movie/list?api_key=754007c908587eeaa8a0798e4a168614&language=en-US'
      )
      .then(response => {
        let genres = response.data.genres;
        this.props.dispatch(getAvailableGenres(genres));
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  movieParams = e => {
    this.props.dispatch(getGenre(e.target.value));
  };

  render() {
    console.log(this.props.chosenGenre);
    return (
      <div>
        <h3>Genre</h3>
        <select id="genre_dropdown" onChange={this.movieParams}>
          <option value="" disabled selected>
            Select genre...
          </option>
          {this.props.availableGenres.map(genre => {
            return (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

const mapStateToProps = ({ state }) => ({
  availableGenres: state.availableGenres,
  chosenGenre: state.chosenGenre
});

export default connect(mapStateToProps)(GenrePicker);
