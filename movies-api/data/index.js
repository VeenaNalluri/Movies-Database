const fs = require('fs');
var currentPath = process.cwd();
console.log("path", currentPath)


let movies = fs.readFileSync('./data/movies.json');
let users = fs.readFileSync('./data/users.json');

movies = JSON.parse(movies); 
users = JSON.parse(users); 

module.exports = { movies, users };