import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getInitialMovie } from '../../redux/modules/state';
import axios from 'axios';

class InitialMovie extends Component {
  componentDidMount() {
    axios
      .get(
        'https://api.themoviedb.org/3/movie/346364?api_key=754007c908587eeaa8a0798e4a168614&language=en-US'
      )
      .then(response => {
        let initialMovie = response.data;
        this.props.dispatch(getInitialMovie(initialMovie));
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div key={this.props.initialMovie.id}>
        <h2>{this.props.initialMovie.title}</h2>
        <div className="no_image">
          <img
            src={`http://image.tmdb.org/t/p/w500/${
              this.props.initialMovie.poster_path
            }`}
            alt="No poster available"
          />
        </div>
        <p>{this.props.initialMovie.overview}</p>
      </div>
    );
  }
}

const mapStateToProps = ({ state }) => ({
  initialMovie: state.initialMovie
});

export default connect(mapStateToProps)(InitialMovie);
