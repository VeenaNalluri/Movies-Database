import React, { Component } from "react";
import { getMovies } from "services/movies";
import MaterialTable, { MTableToolbar } from 'material-table';
import TablePagination from '@material-ui/core/TablePagination';
import { Link } from 'react-router-dom'
import { MDBCard, MDBCardHeader, MDBCardBody, MDBTableEditable } from "mdbreact";


function processData(data) {
  return data
}

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
      console.log("In Movies")
      const {message, loading} = this.state;
      if (loading) {
        return null;
      }
      const columns = [ 'Title', 'Description']
      return (
        <MDBCard>
          <MDBCardHeader tag="h3" className="text-center font-weight-bold text-uppercase py-4">
            Table Editable
          </MDBCardHeader>
          <MDBCardBody>
            <MDBTableEditable data={message} columns={columns} striped bordered />
          </MDBCardBody>
        </MDBCard>
      );
      return (
        // <div>
          <MaterialTable
            title="MOVIES LIST"
            // style={style}
            // icons={{ 
            //   Check: Check,
            //   DetailPanel: ChevronRight,
            //   Export: SaveAlt,
            //   Filter: FilterList,
            //   FirstPage: FirstPage,
            //   LastPage: LastPage,
            //   NextPage: ChevronRight,
            //   PreviousPage: ChevronLeft,
            //   Search: Search,
            //   ThirdStateCheck: Remove,
            //   size: 'large' 
            // }}
            
            columns={columns}
            data={message}
            // options={{
            //   headerStyle: {
            //     backgroundColor: '#01579b',
            //     color: '#FFF',
            //     fontSize: 'large',
            //   },
            //   searchFieldStyle: {
            //     backgroundColor: '#252A31',
            //     color: '#FFF',
            //     fontSize: 'large',
            //   },
            //   pageSize: 5,
            //   pageSizeOptions: [5, 10, 25, 50, 70, 100],
            //   selection: true,
            //   paginationType: 'stepped'
            // }}
            editable={{
              onRowAdd: newData =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                    console.log('new data', newData)
                    const message = [...this.state.message];
                    message.push(newData);
                    this.setState({ ...this.state, message });
                  }, 600);
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise(resolve => {
                  setTimeout(() => {
                    const message = [...this.state.message];
                    message[message.indexOf(oldData)] = newData;
                    this.setState({ ...this.state, message });
                    resolve();
                  }, 1000);
                }),
              onRowDelete: oldData =>
                new Promise(resolve => {
                  setTimeout(() => {
                    
                    const message = [...this.state.message];
                    message.splice(message.indexOf(oldData), 1);
                    this.setState({ ...this.state, message });
                    resolve();
                  }, 1000);
                }),
            }}
          //   components={{
          //     Pagination: props => (
          //       <TablePagination
          //         {...props}
          //         style={style1}  
          //       >
          //       </TablePagination>
          //     )
          // }}
          />
          // </div>
      );
    }
  }

  export default Admin;