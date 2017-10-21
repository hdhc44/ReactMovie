import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

class App extends Component {

  state = {}
  componentDidMount(){ 
    this._getMovies();
  } 
  _renderMovies=()=>{
    const movies = this.state.movies.map((movie)=>{
      return <Movie 
        title={movie.title_english} 
        poster={movie.medium_cover_image} 
        genres={movie.genres}
        key={movie.id}
        synopsis={movie.synopsis}
       />
    })
    return movies;
  }

  _getMovies=async()=>{
    const movies = await this._callApi()
    this.setState({
      movies
    })
  }

  _callApi=()=>{
    return fetch('https://yts.ag/api/v2/list_movies.json')
    .then(res => res.json())
    .then(json => json.data.movies)
    .catch(err => console.log(err))
  }
  render() {
    return (
      <div className="App">
        {this.state.movies ? this._renderMovies() : "loading"}
      </div>
    );
  }
}

export default App;
