import axios from 'axios'
import request from 'request';

export const getMovies = () => {
    return axios.get(`http://localhost:3000/v1/movies`)
      .then(e => e)
      .catch(e => e.response)
}

export const getMovie = id => {
  return axios.get(`http://localhost:3000/v1/movies/${id}`)
    .then(e => e)
    .catch(e => e.response)
}

export const createMovie = payload => {
  return axios.post(`http://localhost:3000/v1/movies`, payload, {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }})
}

export const updateMovie = (id, payload) => {
  return axios.post(`http://localhost:3000/v1/movies/${id}`, payload, {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }})
}

export const deleteMovie = id => {
  console.log('in delete')
  // return axios({
  //     method: 'delete',
  //     url: `http://localhost:3000/v1/movies/41`,
  //     data: null,
  //     headers: {'Content-Type': 'application/json'}
  // })
  return axios.get(`http://localhost:3000/v1/movies/delete/${id}`)
    // .then(e => e.data)
    // .catch(e => e.response)
}