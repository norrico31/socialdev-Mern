import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types'


import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

const Register = ({ setAlert, register }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    // Destructure from useState
    const { name, email, password, password2 } = formData;

    const onSubmitHandle = async (e) => {
        e.preventDefault();
        if(password !== password2) {
           setAlert('Passwords do not match', 'danger');
        } else {
            register({ name, email, password });
        }
    }

    const onChangeForm = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form onSubmit={(e) => onSubmitHandle(e) } className="form">

                <div className="form-group">
                <input type="text" placeholder="Name" name="name"  value={ name } onChange={(e) => onChangeForm(e)} />
                </div>

                <div className="form-group">
                <input type="email" placeholder="Email Address" name="email" value={ email } onChange={(e) => onChangeForm(e)}/>
                <small className="form-text">This site uses Gravatar, so if you want a profile image, use a Gravatar email</small>
                </div>

                <div className="form-group">
                <input type="password" placeholder="Password" name="password" minLength="6" value={ password } onChange={(e) => onChangeForm(e)}/>
                </div>

                <div className="form-group">
                <input type="password" placeholder="Confirm Password" name="password2" minLength="6" value={ password2 } onChange={(e) => onChangeForm(e)}/>
                </div>
                
                <input type="submit" value="Register" className="btn btn-primary" />
            </form>
            <p className="my-1">Already have an account? <Link to="/login">Sign In</Link></p>
        </Fragment>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired
};

export default connect(null, { setAlert, register })(Register);


// connect is takes 2 things. 
// first is the state that you want to map
// second is going to be an object with any actions you want to use
// sample props.setAlert. props is parameter on Register
// props is now destructure using setAlert in Register parameter