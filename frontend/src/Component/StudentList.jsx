import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Student= props =>(
    <tr>
        <td>{props.sn}</td>
        <td >{props.student._id}</td>
        <td >{props.student.name}</td>
        <td><Link to={"/studentDetails/"+props.student._id}>
              View 
        </Link>
        </td>
    </tr>
)

class StudentList extends Component {
    constructor(props){
        super(props);
        this.state={ studentarray : []};


    }
    componentDidMount(){
        axios.get('/student/getbycollegeid/'+this.props.match.params.college_id)
        .then(response => {
            console.log(response);
            this.setState({...this.state, studentarray: response.data})
        })
        .catch(function (error) {
            console.log(error);
            alert("Something went Wrong")

        })  
    }
    StudentList(){
        return this.state.studentarray.map(function(currentstudent, i) {
          return <Student student={currentstudent} sn={i+1} key={i} />
      })
    }
    render() {
        return (
            <div className=" mt-5 mb-5 ml-5 mr-5 pt-5 pb-5 pl-3 pr-3">
               
            <div style={{
           //padding: "5em",
           marginTop: "80px",
        }}>
             <h2 className="text-center">Student List</h2>
                <div className="container pl-2">
                    <div className="container table-responsive " id="tb" style ={{height : "500px"}}>
                        <table className="table table-bordered text-center" style ={{backgroundColor : "#f7f7f7"}}>
                            <thead style={{backgroundColor: "#A93434", color: "#f0f0f0"}}>
                                <tr>
                                    <th scope="col">S.No</th>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">View</th>
                                </tr>
                            </thead>
                            <tbody>
                               {this.StudentList()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default StudentList;