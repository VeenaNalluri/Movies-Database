import React, { Component } from "react";
import { getMovies } from "services/movies";
import MaterialTable from 'material-table'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom'

class Movies extends Component {
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
        getMovies()
          .then(res => { 
              console.log(res.data);
              return res.data;
          })
          .then(data => this.setState({message: data, loading: false}));
    }
    render() {
      const {message, loading, classes} = this.state;
      console.log("daata", message);
      if (loading) {
        return null;
      }
      

      // return (
        
      //   <div style={{ maxWidth: "100%" }}>
      //     {/* <h1>Movies List</h1> */}
      //     <MaterialTable
      //     columns={[
      //       { title: 'Title', field: 'title' },
      //       { title: 'Description', field: 'description' }
      //     ]}
      //     data={message}
      //     title="Movies List"
      //     />
      //   </div>
      // );

      return (
        <Paper style={{width: '100%', overflowX: 'auto'}}>
          <Table style={{fontSize: '40pt'}}>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontSize: '30pt'}}>Title</TableCell>
                <TableCell align="left" style={{fontSize: '30pt'}}>Description</TableCell>
                <TableCell align="left" style={{fontSize: '30pt'}}>Avg Ratings</TableCell>
                {/* <TableCell align="left" style={{fontSize: '30pt'}}>Comments</TableCell> */}
                <TableCell align="left" style={{fontSize: '30pt'}}>MovieId</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {message.map(row => (
                <TableRow key={row.title} style={{minWidth: 650, fontSize: '40pt'}}>
                  <TableCell component="th" scope="row" style={{fontSize: '10pt'}}>
                    {/* {row.title}  */}
                    {/* <a href={row.title}> {row.title} </a> */}
                    {/* <Link to={{ pathname: `/movies/${row.title}` }}>{row.title}</Link> */}
                    <Link to={{ pathname: `/title/${row.movieId}` }} target="_blank">{row.title}</Link>
                  </TableCell>
                  <TableCell align="left" style={{fontSize: '10pt'}}>{row.description}</TableCell>
                  <TableCell align="left" style={{fontSize: '10pt'}}>{row.average_ratings}</TableCell>
                  <TableCell align="left" style={{fontSize: '10pt'}}>{row.comments}</TableCell>
                  <TableCell align="left" style={{fontSize: '10pt'}}>{row.movieId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      );
    }
  }

  export default Movies;