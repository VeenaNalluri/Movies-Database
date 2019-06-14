const movies = require('../data').movies
const uuid = require('uuid/v1');
const _ = require('lodash');

exports.create = body => {
    let movieId = body.movieId;
    delete body.movieId;
    if (movies[movieId]) {
        console.log('movieId already exists, creating new movie id')
        movieId = uuid()
    }
    movies[movieId] = body;
    console.log(body)
    return body;
}

exports.update = body => {
    let movieId = body.movieId;
    if (movies[movieId]) {
        console.log('movieId exists.. updating now')
        if ('title' in body) {
            movies[movieId].title = body.title
        }
        if ('description' in body) {
            movies[movieId].description = body.description
        }
        return true;
    } 
    else {
        console.log('no movieId match')
        return false;
    }
}

exports.get = () => {
    let allMovies = []
    _.each(movies, function (value, key) {
        value.movieId = key 
        allMovies.push(value)
    });
    return allMovies
}

exports.getById = id => {
    console.log(movies[id]);
    return movies[id]
}

exports.deleteById = id => {
    if (movies[id]) {
        return delete movies[id]
    }
    return false
}

