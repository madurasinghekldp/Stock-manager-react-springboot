import React,{Component} from 'react';
import AuthenticationService from './AuthenticationService';
import DataService from './DataService';


class LoginComponent extends Component{

    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            showSuccessMessage:false,
            showFailMessage:false
        }
        this.handleChange=this.handleChange.bind(this)
        this.loginClicked=this.loginClicked.bind(this)
    }

    handleChange(event){
        this.setState({[event.target.name]:event.target.value})
    }

    loginClicked(){
        DataService.userLogin(this.state.username,this.state.password)
        .then(
           ()=> {
                AuthenticationService.successfullLogin(this.state.username,this.state.password)
                this.props.navigate(`/data/${this.state.username}`)
                this.setState({showSuccessMessage:true})
                this.setState({showFailMessage:false})
            }
        )
        
        .catch(
            ()=>{
                this.setState({showSuccessMessage:false})
                this.setState({showFailMessage:true})
            }
        )
    }

    render(){
        return(
            <div>
                <h1>Login</h1>
                <div className="container">
                {this.state.showSuccessMessage && <div className="alert alert-success">Login success</div>}
                {this.state.showFailMessage && <div className="alert alert-warning">Login fail</div>}
                User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                <button className="btn btn" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
            )
            }
}

export default LoginComponent