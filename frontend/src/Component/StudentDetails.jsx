import React , { Component } from 'react'
import axios from 'axios';

class StudentDetail extends Component {

    constructor(props){
        super(props);
        this.state={
            _id:'',
            name : '',
            year_of_batch : '',
            college_id : '',
            skills:''
        };
    }

    componentDidMount(){
        axios.get('/student/getbyid/'+this.props.match.params.id)
        .then(response => {
           console.log("details loaded")
           const data = response.data;
           let str ="";
           for(var i =0;i<data.skills.length;i++)
           {
                str+= data.skills[i];
                if(i!=data.skills.length-1)
                {
                    str+= " , ";
                }
               
           }
           data.skills=str;
            this.setState({
              _id: data._id ,
              name : data.name,
              year_of_batch : data.year_of_batch,
              college_id : data.college_id,
              skills : data.skills
            });
        })
        .catch(function (error) {
            alert("something went wrong")
            console.log(error);
        })  
    }

        render() {
            return (
            <div class="pt-5 pb-5 pr-5 pl-5">
            <h2 class="text-center">Student Details</h2>
            <div class="row">
                <div class="col-3"></div>
                <div class="col-6">
                
                    <table class="table table-bordered table-light " style={{backgroundColor: "#f7f7f7"}}>
                        <tbody>
                        <tr>
                            <td class="text-center">ID</td>
                            <td class="text-center">:</td>
                            <td class="text-center">{this.state._id}</td>
                        </tr>
                        <tr>
                            <td class="text-center">Name</td>
                            <td class="text-center">:</td>
                            <td class="text-center">{this.state.name}</td>
                        </tr>
                        <tr>
                            <td class="text-center">Year of Batch</td>
                            <td class="text-center">:</td>
                            <td class="text-center">{this.state.year_of_batch}</td>
                        </tr>
                        <tr>
                            <td class="text-center">College Id</td>
                            <td class="text-center">:</td>
                            <td class="text-center">{this.state.college_id}</td>
                        </tr>
                        <tr>
                            <td class="text-center">Skills</td>
                            <td class="text-center">:</td>
                            <td class="text-center">{this.state.skills}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-3"></div>
            </div>
            </div>
            );
        }

}

export default StudentDetail;