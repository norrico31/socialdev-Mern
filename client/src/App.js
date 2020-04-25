import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import './index.css';

// Redux
import { Provider } from 'react-redux';
import reduxStore from './reduxStore';

const App = () => (
    <Provider store={reduxStore}>
        <Router>
            <Fragment>
                <Navbar />
                <Route exact path="/" component ={ Landing } / >
                    <div className="container">
                        <Switch>
                            <Route exact path="/register" component={ Register } />
                            <Route exact path="/login" component={ Login } />
                        </Switch>
                    </div>
            </Fragment>
        </Router>
    </Provider>
)
    

export default App;
