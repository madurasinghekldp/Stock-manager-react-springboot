import React,{Component} from 'react';
import moment from 'moment';
import { ErrorMessage, Field, Form, Formik} from 'formik';
import DataService from './DataService';
import AuthenticationService from './AuthenticationService';

class EditComponent extends Component {
    constructor(props){
        super(props);
        this.state={
           id:this.props.params.id,name:'',stock:1000,targetDate:moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit=this.onSubmit.bind(this)
        this.validate=this.validate.bind(this)
    }
    componentDidMount(){
        if(this.state.id==-1){
            return
        }
        let user = AuthenticationService.getLoggedInUser()
        DataService.retrieveData(user,this.state.id)
        .then(
            response=>this.setState({
                name:response.data.name,
                stock:response.data.stock,
                targetDate:moment(response.data.targetDate).format('YYYY-MM-DD')
            })
        )
    }
    onSubmit(values){
        let user = AuthenticationService.getLoggedInUser()
        if(this.state.id==-1){
        DataService.createData(user,{
            //id:this.state.id,
            name:values.name,
            stock:values.stock,
            targetDate:values.targetDate
        })
        .then(
            ()=>{this.props.navigate(`/data/${user}`)}
        )
        }
        else{
            DataService.updateData(user,this.state.id,{
                id:this.state.id,
                name:values.name,
                stock:values.stock,
                targetDate:values.targetDate
            })
            .then(
                ()=>{this.props.navigate(`/data/${user}`)}
            )
        }
    }
    validate(values){
        let error={}
        if(values.name.length == 0){error.name='Enter a name..!'}
        else if(values.stock<0){error.stock='Enter a valid amount..!'}
        else if(!moment(values.targetDate).isValid()){error.targetDate='Enter valid Date..!'}
        return error
    }
    render(){
        let name=this.state.name
        let stock=this.state.stock
        let targetDate=this.state.targetDate
        
        return(
            <div>
                <h1>Data</h1>
                <div className="container">
                    <Formik initialValues={{name,stock,targetDate}} 
                onSubmit={this.onSubmit} validate={this.validate} validateOnChange={false} 
                validateOnBlur={false} enableReinitialize={true}>
                    {
                        (props)=>(
                            <Form>
                                <ErrorMessage name="name" component="div" className="alert alert-warning"/> 
                                <ErrorMessage name="stock" component="div" className="alert alert-warning"/> 
                                <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                                <fieldset className="form-group">
                                    <label>Name</label>
                                    <Field className="form-control" type="text" name="name"></Field>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Stock</label>
                                    <Field className="form-control" type="text" name="stock"></Field>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field className="form-control" type="date" name="targetDate"></Field>
                                </fieldset>
                                <button className="btn btn-success" type="submit">Save</button>
                            </Form>
                            )
                    }
                    </Formik>
                </div>
            </div>
        )
    }
}
export default EditComponent