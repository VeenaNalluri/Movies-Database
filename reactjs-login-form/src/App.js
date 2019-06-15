import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import Login from './components/login/Login';
import Movies from './components/movies/movies1';
import Title from './components/movies/title1';
import Admin from './components/movies/admin';

import PrivateRoute from './components/router/PrivateRoute'

// class App extends Component {
// 	render() {
// 		return (
// 			<div className="App">
// 				<Login />
// 			</div>
// 		);
// 	}
// }

class App extends Component {
	render() {
		return (
			<Router>
				<div className="app-routes"></div>
			<Switch>
				<Route path="/login" component={Login} />
				<Route path="/movies" component={Movies} />
				<Route path="/title/:movieId" component={Title} />
				<Route path="/admin" component={Admin} />
				</Switch>
			</Router>	
		)}
};
  
export default App;
