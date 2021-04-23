import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Chart } from "react-google-charts";

const StateName = (props) => (
    <tr>
        <td>{props.sn}</td>
        <td>{props.curstate.statename}</td>
        <td>{props.curstate.count}</td>
        <td>
            <Link to={"/collegeList/bystate/" + props.curstate.statename } >View</Link>
        </td>
    </tr>
);


class CollegeByState extends Component {

    constructor(props) {
        super(props);
        this.state = 
        { states: [] ,
            options : {
             title: "States vs. Total Colleges comparison",
             is3D : true,
            }, 
            data : []
    };
    }


    componentDidMount() {
        axios.get("/college/getcountbystates")
            .then((response) => {
                console.log(response);
                let keys = Object.keys(response.data);
                let statearray = []; 
                let dataarray= [["States", "Total Colleges"]];
                for (var i = 0; i < keys.length; i++) {

                    let arr = [];
                    arr.push(keys[i])
                    arr.push(response.data[keys[i]])
                    let curstate = {
                        statename: keys[i],
                        count: response.data[keys[i]],
                    };
                    statearray.push(curstate);
                    dataarray.push(arr);
                }
                this.setState({ ...this.state, states: statearray, data : dataarray });
            })
            .catch(function (error) {
                console.log(error);
                alert("Something went wrong");
            });
    }

    StateList() {
        return this.state.states.map(function (currentstate, i) {
            return <StateName curstate={currentstate} sn={i + 1} key={i} />;
        });
    }

    render(){
    return (
        <div className=" pt-5 pb-5">
            <h2 class="text-center">Colleges Based On States</h2>
            <div style={{
           padding: "5em",
           display: "flex",
           justifyContent: "space-around",
           marginTop: "80px",
        }}>
           <div style={{width:"50%"}}>
            <Chart
                        chartType="PieChart"
                        data={this.state.data}
                        options={this.state.options}
                        width= "100%"
                        height ="700px"
                        style = {{marginLeft : "auto", marginRight : "auto", width : "100%"}}
                        legendToggle
            />
            </div>
            <div className="table-responsive bg-light" id="tb" style={{width:"50%" , height : "600px"}}>
                <table
                    className="table table-bordered table-hover text-center"
                >
                    <thead
                        style={{ backgroundColor: "#A93434", color: "#f0f0f0" }}
                    >
                        <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">State</th>
                            <th scope="col">Total Colleges</th>
                            <th scope="col">View</th>
                        </tr>
                    </thead>
                    <tbody>{this.StateList()}</tbody>
                </table>
            </div>
       </div>  
    </div>
  
    );
    }
}

export default CollegeByState;