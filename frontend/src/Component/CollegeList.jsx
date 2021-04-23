import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const College= props =>(
    <tr>
        <td>{props.sn}</td>
        <td >{props.college._id}</td>
        <td >{props.college.name}</td>
        <td >{props.college.year_founded}</td>
        <td >{props.college.city}</td>
        <td><Link to={"/collegeDetails/"+props.college._id}>
              View 
        </Link>
        </td>
    </tr>
)

class CollegeList extends Component {
    constructor(props){
        super(props);
        this.state={ collegearray : [],Case: ""};


    }
    componentDidMount(){
        let cases = this.props.match.params.case;
        let key =this.props.match.params.key;
        let Case = "";
        let link="";
        if(cases==="bystate")
            {
                link = '/college/getbystate/'+key;
                Case = "State-wise College List";
            }
        if(cases==="bycourse")
            {
                link = '/college/getbycourse/'+key ;
                Case = "Courses-wise College List";
            }
        if(cases==="bysimilarcolleges")
            {
                link= '/college/getsimilarColleges/'+key ;
                Case = "Similar College List";
            }
        axios.get(link)
        .then(response => {
            console.log(response);
            this.setState({...this.state, collegearray: response.data, Case : Case})
        })
        .catch(function (error) {
            console.log(error);
            alert("Something went Wrong")

        })  
    }
    CollegeList(){
        return this.state.collegearray.map(function(currentcollege, i) {
          return <College college={currentcollege} sn={i+1} key={i} />
      })
    }
    render() {
        return (
            <div className=" mt-5 mb-5 ml-5 mr-5 pt-5 pb-5 pl-3 pr-3">
                
            <div style={{
           //padding: "5em",
           marginTop: "80px",
        }}> 
            <h2 className="text-center">{this.state.Case} </h2>
                <div className="container pl-2">
                    <div className="container table-responsive text-center" id="tb" style ={{height : "500px"}} >
                        <table className="table table-bordered " style={{backgroundColor: "#f7f7f7"}}>
                            <thead style={{backgroundColor: "#A93434", color: "#f0f0f0"}}>
                                <tr>
                                    <th scope="col">S.No</th>
                                    <th scope="col">_id</th>
                                    <th scope="col">name</th>
                                     <th scope="col">year_founded</th>
                                    <th scope="col">city</th>
                                    <th scope="col">View</th> 
                                </tr>
                            </thead>
                            <tbody>
                               {this.CollegeList()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default CollegeList;