const users = require('../data').users
const uuid = require('uuid/v1');
const _ = require('lodash');
const bcrypt = require('bcrypt');

exports.getRating = userId => {
    if (users[userId]) {
        const ratings = users[userId].rating;
        let allRatings = []
        _.each(ratings, function (value, key) {
            const obj = {}
            obj.movieId = key 
            obj.rating = value
            allRatings.push(obj)
        });
        return allRatings;
    }
    console.log('user doesnt exist');
    return [];
}

exports.authenticate = body => {
    console.log("body", body)
    if (users.hasOwnProperty(body.username)) {
        const password = users[body.username].password
        const res = bcrypt.compareSync(body.password, password)
        if (res) {
            console.log("Password correct");
            return true;
        } else {
            console.log("Password wrong");
            return false;
        }
    }
    console.log(body.username)
    console.log('user doesnt exist');
    return false;
}