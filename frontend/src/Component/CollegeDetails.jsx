import React , { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

class CollegeDetail extends Component {

    constructor(props){
        super(props);
        this.state={
            _id:'',
            name : '',
            city : '',
            courses:''
        };
    }

    componentDidMount(){
        axios.get('/college/getbyid/'+this.props.match.params.id)
        .then(response => {
           console.log("details loaded")
           const data = response.data;
           let str ="";
           for(var i =0;i<data.courses.length;i++)
           {
                str+= data.courses[i];
                if(i!=data.courses.length-1)
                {
                    str+= " , ";
                }
               
           }
           data.courses=str;
            this.setState({
              _id: data._id ,
              name : data.name,
              city : data.city,
              courses : data.courses
            });
        })
        .catch(function (error) {
            alert("something went wrong")
            console.log(error);
        })  
    }

        render() {
            return (
            <div className="pt-5 pb-5 pr-5 pl-5">
            <h2 className="text-center">College Details</h2>
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                
                    <table class="table table-bordered table-light" style ={{backgroundColor : "#f7f7f7"}}>
                        <tbody>
                        <tr>
                            <td className="text-center">ID</td>
                            <td className="text-center">:</td>
                            <td className="text-center">{this.state._id}</td>
                        </tr>
                        <tr>
                            <td className="text-center">Name</td>
                            <td className="text-center">:</td>
                            <td className="text-center">{this.state.name}</td>
                        </tr>
                        <tr>
                            <td className="text-center">City</td>
                            <td className="text-center">:</td>
                            <td className="text-center">{this.state.city}</td>
                        </tr>
                        <tr>
                            <td className="text-center">Courses</td>
                            <td className="text-center">:</td>
                            <td className="text-center">{this.state.courses}</td>
                        </tr>
                        <tr>
                            <td className="text-center">Similar Colleges</td>
                            <td className="text-center">:</td>
                            <td className="text-center"><Link to={"/collegeList/bysimilarcolleges/"+this.state._id}>Show Colleges </Link></td>
                        </tr>
                        <tr>
                            <td className="text-center">Student List</td>
                            <td className="text-center">:</td>
                            <td className="text-center"><Link to={"/studentList/"+this.state._id}>Show Students </Link> </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-3"></div>
            </div>
            <div>
            </div>
            </div>
            );
        }

}

export default CollegeDetail;