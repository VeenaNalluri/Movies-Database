const fs = require('fs');
const _ = require('lodash');

let movies = fs.readFileSync('../data/movies.json');
let users = fs.readFileSync('../data/users.json');

movies = JSON.parse(movies); 
users = JSON.parse(users); 

// console.log(movies)
// console.log(_.values(movies));

test = _.forEach(movies)
// console.log(test)

let all = []
_.each(movies, function (value, key) {
    // console.log(value, key)
    value.movieId = key 
    all.push(value)
});

console.log(all)

console.log(delete movies[2])
console.log(delete movies[2])



bcrypt.hash('anudeep123', 10, function(err, hash) {
    console.log("hash", hash)
  });