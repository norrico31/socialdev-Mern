import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import ProfileForm from '../profile-forms/ProfileForm';
import EditProfile from '../profile-forms/EditProfile';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/AddEducation';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';

const Routes = () => {
    return (
        <div className="container">
            <Alert />
            <Switch>
                <Route exact path="/register" component={ Register } />
                <Route exact path="/login" component={ Login } />
                <Route exact path="/profiles" component={ Profiles } />
                <Route exact path="/profile/:id" component={ Profile } /> {/* to get the /:id from the url use match method in the component you want to use */}
                <PrivateRoute exact path="/dashboard" component={ Dashboard } />
                <PrivateRoute exact path="/create-profile" component={ ProfileForm } />
                <PrivateRoute exact path="/edit-profile" component={ EditProfile } />
                <PrivateRoute exact path="/add-experience" component={ AddExperience } />
                <PrivateRoute exact path="/add-education" component={ AddEducation } />
                <PrivateRoute exact path="/posts" component={ Posts } />
                <PrivateRoute exact path="/post/:id" component={ Post } />{/* to get the /:id from the url use match method in the component you want to use */}
                <Route exact component={NotFound} />
            </Switch>
        </div>
    )
}

export default Routes
