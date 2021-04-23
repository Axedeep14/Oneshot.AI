import { BrowserRouter as Router,Route,Switch,Link} from "react-router-dom";
import Home from './Component/Home.jsx'
import CollegeByState from './Component/CollegeByState'
import CollegeByCourse from './Component/CollegeByCourse'
import CollegeDetails from './Component/CollegeDetails'
import StudentDetails from './Component/StudentDetails'
import StudentList from './Component/StudentList'
import CollegeList from './Component/CollegeList';
import './App.css';

const App = () => {

  return (
    <div className ="App">
      <Router>
          <nav className="navbar navbar-expand-sm navbar-dark" style={{backgroundColor: "#A93434"}}>
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/collegebystate" className="nav-link">College By State</Link>
              </li>
              <li className="nav-item">
                 <Link to="/collegebycourse" className="nav-link">College By Course</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/collegebystate" component={CollegeByState}/>
            <Route path="/collegebycourse" component={CollegeByCourse} />
            <Route path="/collegeDetails/:id" component={CollegeDetails} />
            <Route path="/studentDetails/:id" component={StudentDetails} />
            <Route path="/studentList/:college_id" component={StudentList} />
            <Route path="/collegeList/:case/:key/" component={CollegeList} />
          </Switch>
      </Router> 
    </div>
  );
}

export default App;


