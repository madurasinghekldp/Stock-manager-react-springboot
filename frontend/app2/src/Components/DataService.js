import axios from "axios";
 class DataService {

    
    userLogin(username,password){
        let basicAuthHeader = 'Basic '+window.btoa(username+":"+password)
        return axios.get("http://localhost:8080/user/login",
        {
            headers : {authorization:basicAuthHeader}
        }
        )
    }
    retrieveAllData(username){
        return axios.get(`http://localhost:8080/jpa/user/${username}/data`)
    }
    retrieveData(username,id){
        return axios.get(`http://localhost:8080/jpa/user/${username}/data/${id}`)
    }
    deleteData(username,id){
        return axios.delete(`http://localhost:8080/jpa/user/${username}/data/${id}`)
    }
    updateData(username,id,data){
        return axios.put(`http://localhost:8080/jpa/user/${username}/data/${id}`,data)
    }
    createData(username,data){
        return axios.post(`http://localhost:8080/jpa/user/${username}/data`,data)
    }
 }
 export default new DataService()