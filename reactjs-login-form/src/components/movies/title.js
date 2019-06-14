import React, { Component } from "react";
import { getMovie } from "services/movies";
import MaterialTable from 'material-table'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom'
import { object } from "prop-types";
import './title.sass';

class Title extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            message: 'Loading...',
            // classes: useStyles()
        }
    }

    componentDidMount() {
        //GET message from server using fetch api
        const { movieId } = this.props.match.params
        console.log('handle', movieId)
        getMovie(movieId)
          .then(res => { 
              console.log(res.data);
              return res.data;
          })
          .then(data => this.setState({message: data, loading: false}));
    }
    render() {  
      const {message, loading, classes} = this.state;
      console.log("in title", message);
      var newArr = Object.keys(message);
      console.log("keys",newArr);
      var values = Object.values(message)
      console.log("values",values)
      var array = Object.keys(values)
      console.log("array", array)
      var arrayValues = Object.keys(values[2])
      var comments = Object.values(values[2])
      console.log("comments", comments)
      var commentKey = Object.keys(comments[0])
      console.log('commentKey', commentKey)
      var commentValue = Object.values(comments[0])
      var userComment = Object.values(commentValue[0])
      console.log("userComment",userComment)
      console.log("commentValue", commentValue)
      console.log("Array Values", arrayValues)
     //var userRating = Object.keys(commentValue[1])
      //console.log("User Rating", userRating)
      if (loading) {
        return null;
      }
      
      return (
        <div className='Title'>
          <h3>Movie: {message.title}</h3>
          <h3>Avg Rating: {message.average_ratings}</h3>
         <h3>Description: {message.description}</h3>
         <h3>User comment:{userComment}</h3>
         <h3>User rating: {commentValue[1]}</h3>

        </div>

      );
    }
  }

  export default Title;