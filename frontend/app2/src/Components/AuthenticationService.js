import axios from "axios";
class AuthenticationService{
    successfullLogin(username,password){
        sessionStorage.setItem('AuthenticatedUser',username);
        this.setAxiosInterceptors(username,password)
    }

    isUserLoggedIn(){
        let user = sessionStorage.getItem('AuthenticatedUser')
        if(user===null) return false
        return true
    }

    getLoggedInUser(){
        let user = sessionStorage.getItem('AuthenticatedUser')
        if(user===null) return ''
        return user
    }

    logout(){
        sessionStorage.removeItem('AuthenticatedUser');
    }

    setAxiosInterceptors(username,password){
        let basicAuthHeader = 'Basic '+window.btoa(username+":"+password)
        axios.interceptors.request.use(
            (config)=>{
                config.headers.authorization=basicAuthHeader
                return config
            }
            
        )    
    }
}

export default new AuthenticationService()