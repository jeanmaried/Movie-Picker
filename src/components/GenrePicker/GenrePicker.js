import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getGenre, getAvailableGenres } from '../../redux/modules/state';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class GenrePicker extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 'Select genre...' };
  }

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

  movieParams = (event, index, value) => {
    this.setState({
      value: value
    });
    this.props.dispatch(getGenre(value));
  };

  render() {
    return (
      <div className="flex">
        <h4>Genre</h4>
        <DropDownMenu
          value={this.state.value}
          id="genre_dropdown"
          onChange={this.movieParams}
        >
          {this.props.availableGenres.map(genre => {
            return (
              <MenuItem
                key={genre.id}
                value={genre.id}
                primaryText={genre.name}
              />
            );
          })}
        </DropDownMenu>
      </div>
    );
  }
}

const mapStateToProps = ({ state }) => ({
  availableGenres: state.availableGenres
});

export default connect(mapStateToProps)(GenrePicker);
