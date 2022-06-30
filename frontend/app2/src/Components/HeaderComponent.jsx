import React,{Component} from "react";
import { Link} from "react-router-dom";
import WithRouter from "./WithRouter";
import AuthenticationService from "./AuthenticationService";

class HeaderComponent extends Component{
    render(){
        const isUserLoggedIn=AuthenticationService.isUserLoggedIn()
        let username=AuthenticationService.getLoggedInUser()
        return(
            
                <header>
                <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <ul className="navbar-nav">
                {!isUserLoggedIn && <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
                </li>}
                {<li className="nav-item">
                <Link className="nav-link" to="/home">Home</Link>
                </li>}
                {isUserLoggedIn && <li className="nav-item">
                <Link className="nav-link" to={`/data/${username}`}>Data</Link>
                </li>}
                {/* {isUserLoggedIn && <li className="nav-item">
                <Link className="nav-link" to="/edit">Edit</Link>
                </li>} */}
                {isUserLoggedIn && <li className="nav-item">
                <Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link>
                </li>}
                </ul>
                </nav>
                </header>
            
        )}
}
export default WithRouter(HeaderComponent)