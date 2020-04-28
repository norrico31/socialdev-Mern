import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // Destructure from useState
    const { email, password } = formData;

    const onSubmitHandle = async (e) => {
        e.preventDefault();
        
        login(email, password)
    }

    const onChangeForm = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    // Redirect if logged in using isAuthenticated boolean
    if(isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
            <form onSubmit={(e) => onSubmitHandle(e) } className="form">

                <div className="form-group">
                <input type="email" placeholder="Email Address" name="email" required value={ email } onChange={(e) => onChangeForm(e)}/>
                </div>

                <div className="form-group">
                <input type="password" placeholder="Password" name="password" minLength="6" value={ password } onChange={(e) => onChangeForm(e)}/>
                </div>
                
                <input type="submit" value="Sign In" className="btn btn-primary" />
            </form>
            <p className="my-1">Don't have an account? <Link to="/register">Sign Up</Link></p>
        </Fragment>
    )
}


Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login, mapStateToProps })(Login);
