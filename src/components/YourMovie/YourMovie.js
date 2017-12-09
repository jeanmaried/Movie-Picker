import React, { Component } from 'react';
import { connect } from 'react-redux';

class YourMovie extends Component {
  render() {
    return (
      <div key={this.props.yourMovie.id}>
        <h2>{this.props.yourMovie.title}</h2>
        <div className="no_image">
          <img
            src={`http://image.tmdb.org/t/p/w500/${
              this.props.yourMovie.poster_path
            }`}
            alt="No poster available"
          />
        </div>
        <p>{this.props.yourMovie.overview}</p>
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

export default connect(mapStateToProps)(YourMovie);
