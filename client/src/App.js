import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';

//Private Route
import PrivateRoute from './components/routing/PrivateRoute';

import Dashboard from './components/dashboard/Dashboard';

import { loadUser } from './actions/auth';
import { setAuthToken } from './utils/setAuthToken';

import './index.css';

// Redux
import { Provider } from 'react-redux';
import reduxStore from './reduxStore';


if (localStorage.token) {
    setAuthToken(localStorage.token)
}

const App = () => { 
    useEffect(() => {
        reduxStore.dispatch(loadUser())
    }, [])

    return (
    <Provider store={reduxStore}>
        <Router>
            <Fragment>
                <Navbar />
                <Route exact path="/" component ={ Landing } / >
                    <div className="container">
                        <Alert />
                        <Switch>
                            <Route exact path="/register" component={ Register } />
                            <Route exact path="/login" component={ Login } />
                            <PrivateRoute exact path="/dashboard" component={ Dashboard } />
                        </Switch>
                    </div>
            </Fragment>
        </Router>
    </Provider>
)}
    

export default App;
