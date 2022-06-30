import React,{Component} from 'react';
import moment from 'moment';
import { Card ,Button} from "react-bootstrap";
import DataService from './DataService';
import AuthenticationService from './AuthenticationService';


class DataComponent extends Component {
constructor(props){
    super(props);
    this.state = {
        data_w:[
            // {id:1,name:'Kaluthara',stock:15000,targetDate: new Date()},
            // {id:2,name:'Gampaha',stock:20000,targetDate: new Date()},
            // {id:3,name:'Rathnapura',stock:5000,targetDate: new Date()}
        ],
        message:null
    }
    this.addDataClicked=this.addDataClicked.bind(this)
    this.updateDataClicked=this.updateDataClicked.bind(this)
    this.deleteDataClicked=this.deleteDataClicked.bind(this)
    this.refreshData=this.refreshData.bind(this)
}


    updateDataClicked(id){
        this.props.navigate(`/edit/${id}`)
    }
    addDataClicked(){
    this.props.navigate('/edit/-1')
    }
    deleteDataClicked(id){
        let user = AuthenticationService.getLoggedInUser()
        DataService.deleteData(user,id)
        .then(
            response=>{
                this.setState({message:`Id ${id} successfully deleted.`})
                this.refreshData();
            }
        )
        
    }


    componentDidMount(){
        this.refreshData();
    }
    refreshData(){
        let user = AuthenticationService.getLoggedInUser()
        DataService.retrieveAllData(user)
        .then(response=>{
            this.setState({data_w:response.data})
        }
        )
    }
    render(){
        return(
            <div>
                {this.state.message && <div className="alert-success">{this.state.message}</div>}
                <h1>Warehouse Data</h1> {this.props.params.name}
                <Button variant="success" onClick={this.addDataClicked}>Add</Button>
                
                {
                    this.state.data_w.map(
                        
                        data=>
                        
                        <Card style={{ width: '18rem' }} key={data.id}>
                        <Card.Img variant="top" src='https://www.limkimkeong.com/wp-content/uploads/2018/01/cup-of-tea.jpg'/>
                        <Card.Body>
                        <Card.Title>{data.name}</Card.Title>
                        Stock: <Card.Text>
                            {data.stock}
                        </Card.Text>
                        Date: <Card.Text>
                        {moment(data.targetDate).format('YYYY-MM-DD')}
                        </Card.Text>
                        <Button variant="primary" onClick={()=>this.updateDataClicked(data.id)}>edit</Button>
                        <Button variant="warning" onClick={()=>this.deleteDataClicked(data.id)}>delete</Button>
                        </Card.Body>
                        </Card>
                        
                    )
                }
                
                

            </div> )   
}
}
export default DataComponent