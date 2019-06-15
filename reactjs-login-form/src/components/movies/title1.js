import React, { Component } from "react";
import { getMovie } from "services/movies";
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


class Title extends Component {
    constructor(props) {
        super(props);
        console.log("in Title cons")
        this.state = {
            loading: true,
            message: 'Loading...',
            comments: [],
        }
    }

    processData(data) {
      console.log("proces", data)
      const res = []
      for (var user in data['comments']) {
        console.log('user', user)
        var comment = data['comments'][user].comment;
        var rating = data['comments'][user].rating;
        console.log(comment, rating)
        res.push({user, comment, rating})
      }
      console.log(res);
      this.setState({comments: res})
      
    }
    componentDidMount() {
        //GET message from server using fetch api
        const { movieId } = this.props.match.params
        console.log('handle', movieId)
        getMovie(movieId)
          .then(res => { 
              console.log('movie data', res.data);
              return res.data;
          })
          .then(data => {
            this.processData(data)
            this.setState({message: data, loading: false})
          });
    }
    
    render() {
      console.log("In Movies")
      const {message, comments, loading} = this.state;
      if (loading) {
        return null;
      }
      <div>
        <h4> Title: message.title</h4>
        </div>
      console.log('view', message)
      const columns = [
        { title: 'User', field: 'user', sorting: false, render: row => <h5>{row.user}</h5> },
        { title: 'Comments', field: 'description', sorting: false, render: row => <h5>{row.comment}</h5> },
        { title: 'Ratings', field: 'average_ratings', render: row => <h5>{row.rating}</h5> }
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
        <h4> Title: {message.title}</h4>
        
          <MaterialTable
            title="RATINGS LIST"
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
            data={comments}
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

  export default Title;