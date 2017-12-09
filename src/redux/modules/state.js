const GET_GENRE = 'GET_GENRE';
const GET_RATING = 'GET_RATING';
const GET_YEAR = 'GET_YEAR';
const GET_AVAILABLE_GENRES = 'GET_AVAILABLE_GENRES';
const GET_RANDOM_MOVIES = 'GET_RANDOM_MOVIES';
const GET_SELECTED_MOVIE = 'GET_SELECTED_MOVIE';
const GET_RANDOM_PAGE = 'GET_RANDOM_PAGE';
const GET_YOUR_MOVIE = 'GET_YOUR_MOVIE';
const GET_INITIAL_MOVIE = 'GET_INITIAL_MOVIE';

export const getGenre = genre => ({
  type: GET_GENRE,
  payload: genre
});

export const getRating = rating => ({
  type: GET_RATING,
  payload: rating
});

export const getYear = year => ({
  type: GET_YEAR,
  payload: year
});

export const getAvailableGenres = genres => ({
  type: GET_AVAILABLE_GENRES,
  payload: genres
});

export const getRandomMovies = movies => ({
  type: GET_RANDOM_MOVIES,
  payload: movies
});

export const getSelectedMovie = movie => ({
  type: GET_SELECTED_MOVIE,
  payload: movie
});

export const getRandomPage = page => ({
  type: GET_RANDOM_PAGE,
  payload: page
});

export const getYourMovie = movie => ({
  type: GET_YOUR_MOVIE,
  payload: movie
});

export const getInitialMovie = movie => ({
  type: GET_INITIAL_MOVIE,
  payload: movie
});

export default (
  state = {
    chosenGenre: '',
    chosenRating: '',
    chosenYear: '',
    availableGenres: [],
    randomMovies: [],
    selectedMovie: 0,
    randomPage: 0,
    yourMovie: undefined,
    initialMovie: {}
  },
  action
) => {
  switch (action.type) {
    case GET_GENRE:
      return { ...state, chosenGenre: action.payload };
    case GET_RATING:
      return { ...state, chosenRating: action.payload };
    case GET_YEAR:
      return { ...state, chosenYear: action.payload };
    case GET_AVAILABLE_GENRES:
      return { ...state, availableGenres: action.payload };
    case GET_RANDOM_MOVIES:
      return { ...state, randomMovies: action.payload };
    case GET_SELECTED_MOVIE:
      return { ...state, selectedMovie: action.payload };
    case GET_RANDOM_PAGE:
      return { ...state, randomPage: action.payload };
    case GET_YOUR_MOVIE:
      return { ...state, yourMovie: action.payload };
    case GET_INITIAL_MOVIE:
      return { ...state, initialMovie: action.payload };
    default:
      return state;
  }
};
