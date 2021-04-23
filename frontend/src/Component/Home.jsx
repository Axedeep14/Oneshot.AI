import React from "react";

export default function Home(){
    return(
        <div className="pt-5 pb-5 pr-5 pl-5">
            <h2 className="text-center">Oneshot.AI Assignment</h2>
                <div className="container">
                    <table className="table table-bordered table-light" style={{backgroundColor: "#f7f7f7"}} >
                        <tbody>
                        <tr>
                            <td className="text-center">Name</td>
                            <td className="text-center">:</td>
                            <td className="text-center">Deepak Paliwal</td>
                        </tr>
                        <tr>
                            <td className="text-center">College Id</td>
                            <td className="text-center">:</td>
                            <td className="text-center">2017IMG-019</td>
                        </tr>
                        <tr>
                            <td className="text-center">Github Link</td>
                            <td className="text-center">:</td>
                            <td className="text-center"><a href = "https://github.com/Axedeep14/Oneshot.AI.git" > Codes</a></td>
                        </tr>
                        <tr>
                            <td className="text-center">LinkedIn</td>
                            <td className="text-center">:</td>
                            <td className="text-center"><a href = "https://www.linkedin.com/in/axedeep14/" > LinkedIn Profile</a></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
    );
}