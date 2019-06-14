import React, { Component } from "react";
import { getMovies, createMovie, updateMovie, deleteMovie } from "services/movies";
import MaterialTable, { MTableToolbar } from 'material-table';
import TablePagination from '@material-ui/core/TablePagination';
import { Link } from 'react-router-dom'

import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon'
import Search from '@material-ui/icons/Search'
import Edit from '@material-ui/icons/Edit'
import Save from '@material-ui/icons/Save'
import DeleteIcon from '@material-ui/icons/Delete';

import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Add from '@material-ui/icons/Add'
import Check from '@material-ui/icons/Check'
import FilterList from '@material-ui/icons/FilterList'
import Cancel from '@material-ui/icons/Cancel'
import IconButton from '@material-ui/core/IconButton';

class Admin extends Component {
    constructor(props) {
      super(props);
      console.log("in movies cons")
      this.state = {
          loading: true,
          message: 'Loading...',
      }
    }

    componentDidMount() {
        console.log("in admin cons")
        getMovies()
          .then(res => { 
              return res.data;
          })
          .then(data => this.setState({message: data, loading: false}));
    }
    
    render() {
      const {message, loading} = this.state;
      if (loading) {
        return null;
      }
      const columns = [
        { title: 'Title', field: 'title', render: row => <Link to={{ pathname: `/title/${row.movieId}` }} target="_blank" ><h5>{row.title}</h5></Link>},
        { title: 'Description', field: 'description', sorting: false, render: row => <h5>{row.description}</h5> }
      ];
      const style1 = {
        color: 'red',
        overflow: 'auto',
        maxWidth: '100vw',
        fontSize: '16px',
        size: 'large',
        paddingLeft: '10px',
        paddingRight: '10px',
        float: 'right',
        textAlign: 'center',
      };
      return (
          <MaterialTable
            title="ADMIN MOVIES LIST"
            icons={{ 
              Add: Add,
              Cancel: Cancel,
              Delete: DeleteIcon,
              Edit: Edit,
              Save: Save,
              FirstPage: FirstPage,
              LastPage: LastPage,
              NextPage: ChevronRight,
              PreviousPage: ChevronLeft,
              Search: Search
            }}
            
            columns={columns}
            data={message}
            options={{
              headerStyle: {
                backgroundColor: '#01579b',
                color: '#FFF',
                fontSize: 'large',
              },
              searchFieldStyle: {
                backgroundColor: '#252A31',
                color: '#FFF',
                fontSize: 'large',
              },
              pageSize: 5,
              pageSizeOptions: [5, 10, 25, 50, 70, 100],
              paginationType: 'stepped'
            }}
            editable={{
              onRowAdd: newData =>
                new Promise(resolve => {
                  createMovie(newData).then(res => {
                    console.log('new data', newData)
                    console.log('res', res)
                    const message = [...this.state.message];
                    message.push(newData);
                    this.setState({ ...this.state, message });
                    resolve()
                  })
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise(resolve => {
                  updateMovie(newData.movieId, newData).then(res => {
                    console.log('update result', res)
                    const message = [...this.state.message];
                    // console.log("edit", newData,oldData)
                    message[message.indexOf(oldData)] = newData;
                    this.setState({ ...this.state, message });
                    resolve()
                  })
                }),
              onRowDelete: oldData =>
                new Promise(resolve => {
                  console.log('data', oldData);
                  deleteMovie(oldData.movieId).then(res => {
                    console.log('delete result', res)
                    const message = [...this.state.message];
                    message.splice(message.indexOf(oldData), 1);
                    this.setState({ ...this.state, message });
                    resolve();
                  })
                  // setTimeout(() => {
                    
                  //   const message = [...this.state.message];
                  //   message.splice(message.indexOf(oldData), 1);
                  //   this.setState({ ...this.state, message });
                  //   resolve();
                  // }, 1000);
                }),
            }}
            components={{
              Pagination: props => (
                <TablePagination
                  {...props}
                  style={style1}  
                >
                </TablePagination>
              )
          }}
          />
      );
    }
  }

  export default Admin;