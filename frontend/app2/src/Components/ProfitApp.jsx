import React,{Component} from 'react';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import FooterComponent from './FooterComponet';
import HeaderComponent from './HeaderComponent';
import LoginComponent from './LoginComponent';
import HomeComponent from './HomeComponent';
import DataComponent from './DataComponent';
import EditComponent from './EditComponent';
import LogoutComponent from './LogoutComponent';
import AuthenticatedRoute from './AuthenticatedRoute';
import ErrorComponent from './ErrorComponent';
import withNavigation from './WithNavigation';
import withParams from './WithParams';
 class ProfitApp extends Component {

    render() {
        const LoginComponentWithNavigation = withNavigation(LoginComponent);
        const HomeComponentWithNavigation = withNavigation(HomeComponent);
        const DataComponentWithParamsAndNavigation = withParams(withNavigation(DataComponent));
        const EditComponentWithParamsAndNavigation = withParams(withNavigation(EditComponent));
        const LogoutComponentWithNavigation = withNavigation(LogoutComponent);
        const HeaderComponentWithNavigation = withNavigation(HeaderComponent);

        return(
            <div className="ProfitApp">
                <Router>
                <>
                <HeaderComponentWithNavigation/>
                   <Routes>
                    <Route path='/' element={<LoginComponentWithNavigation/>}/>
                    <Route path='/login' element={<LoginComponentWithNavigation/>}/>
                    <Route path='/home' element={<HomeComponentWithNavigation/>}/>
                    <Route path='/data/:name' element={<AuthenticatedRoute><DataComponentWithParamsAndNavigation/></AuthenticatedRoute>}/>
                    <Route path='/edit/:id' element={<AuthenticatedRoute><EditComponentWithParamsAndNavigation/></AuthenticatedRoute>}/>
                    <Route path='/logout' element={<AuthenticatedRoute><LogoutComponentWithNavigation/></AuthenticatedRoute>}/>
                    <Route element={<ErrorComponent/>}/>
                    </Routes>
                <FooterComponent/>
                </>
                </Router>
            </div>)
    }
 }
 export default ProfitApp