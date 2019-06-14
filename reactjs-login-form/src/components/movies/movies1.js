import React, { Component } from "react";
import { getMovies } from "services/movies";
import MaterialTable, { MTableToolbar } from 'material-table';
import TablePagination from '@material-ui/core/TablePagination';
import { Link } from 'react-router-dom'

import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'
import SaveAlt from '@material-ui/icons/SaveAlt'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Add from '@material-ui/icons/Add'
import Check from '@material-ui/icons/Check'
import FilterList from '@material-ui/icons/FilterList'
import Remove from '@material-ui/icons/Remove'
import IconButton from '@material-ui/core/IconButton';


function processData(data) {
  return data
}
class Movies1 extends Component {
    constructor(props) {
        super(props);
        console.log("in movies cons")
        this.state = {
            loading: true,
            message: 'Loading...',
        }
    }

    componentDidMount() {
        console.log("in movies cons")
        getMovies()
          .then(res => { 
              return res.data;
          })
          .then(data => this.setState({message: processData(data), loading: false}));
    }
    
    render() {
      console.log("In Movies")
      const {message, loading} = this.state;
      if (loading) {
        return null;
      }
      
      const columns = [
        { title: 'Title', field: 'title', render: row => <Link to={{ pathname: `/title/${row.movieId}` }} target="_blank" ><h5>{row.title}</h5></Link>},
        { title: 'Description', field: 'description', sorting: false, render: row => <h5>{row.description}</h5> },
        { title: 'Avg Ratings', field: 'average_ratings', render: row => <h5>{row.average_ratings}</h5> },
        { title: 'MovieId', field: 'movieId', sorting: false, render: row => <h5>{row.movieId}</h5> },
      ];
  
      const style1 = {
        // background: '#01579b',
        color: 'red',
        overflow: 'auto',
        maxWidth: '100vw',
        //height: 48,
        fontSize: '16px',
        size: 'large',
        paddingLeft: '10px',
        paddingRight: '10px',
        float: 'right',
        textAlign: 'center',
      };
      return (
        <div>
          <MaterialTable
            title="MOVIES LIST"
            // style={style}
            icons={{ 
              Check: Check,
              DetailPanel: ChevronRight,
              Export: SaveAlt,
              Filter: FilterList,
              FirstPage: FirstPage,
              LastPage: LastPage,
              NextPage: ChevronRight,
              PreviousPage: ChevronLeft,
              Search: Search,
              ThirdStateCheck: Remove,
              size: 'large' 
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
              selection: true,
              paginationType: 'stepped'
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
          </div>
      );
    }
  }

  export default Movies1;