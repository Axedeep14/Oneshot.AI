import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Chart } from "react-google-charts";

const options = {
    title: "Courses vs. Total Colleges comparison",
    hAxis: { title: "Courses", viewWindow: { min: 0, max: 5 } },
    vAxis: { title: "Total Colleges", viewWindow: { min: 0, max: 70 } },
    legend: "none"
  };

  const data = [
    ["Courses", "Total Colleges"],
];

const CourseName = (props) => (
    <tr>
        <td>{props.sn}</td>
        <td>{props.curcourse.coursename}</td>
        <td>{props.curcourse.count}</td>
        <td>
            <Link to={"/collegeList/bycourse/" + props.curcourse.coursename}>View</Link>
        </td>
    </tr>
);

class CollegeByCourse extends Component {

    constructor(props) {
        super(props);
        this.state = { courses: [] };
    }

    componentDidMount() {
        axios.get("/college/getcountbycourses")
            .then((response) => {
                console.log(response);
                let keys = Object.keys(response.data);
                let coursearray = [];
                for (var i = 0; i < keys.length; i++) {
                    let curcourse = {
                        coursename: keys[i],
                        count: response.data[keys[i]],
                    };
                    coursearray.push(curcourse);
                }
                this.setState({ ...this.state, courses: coursearray });
            })
            .catch(function (error) {
                console.log(error);
                alert("Something went wrong");
            });
    }

    CourseList() {
        return this.state.courses.map(function (currentcourse, i) {
            let arr = [];
            arr.push(currentcourse.coursename)
            arr.push(currentcourse.count)
            data.push(arr)
            return <CourseName curcourse={currentcourse} sn={i + 1} key={i} />;
        });
    }

    render(){
        return (
<div className="mt-5 mb-5 ml-5 mr-5 pt-5 pb-5 pb-5 pl-3 pr-3">
    <h2 className="text-center">Colleges Based On Courses</h2>
            <div style={{
           //padding: "5em",
           display: "flex",
           justifyContent: "space-around",
           marginTop: "80px",
        }}>
           <div style={{width:"60%"}}>
           <Chart
                        chartType="ColumnChart"
                        data={data}
                        options={options}
                        width="100%"
                        height="400px"
                        style = {{marginLeft : "auto", marginRight : "auto"}}
                        legendToggle
                        />
            </div>
            <div className="table-responsive " id="tb" style={{width:"45%" , height : "400px"}}>
                <table
                    className="table table-bordered table-hover text-center" 
                >
                    <thead style={{backgroundColor: "#A93434", color: "#f0f0f0"}}>
                                <tr>
                                    <th scope="col">S.No</th>
                                    <th scope="col">Course</th>
                                    <th scope="col">Total Colleges</th>
                                    <th scope="col">View</th> 
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.CourseList()
                            }
                            </tbody>
                </table>
            </div>
       </div>  
    </div>
  
        );
        }
    }
    
    export default CollegeByCourse;