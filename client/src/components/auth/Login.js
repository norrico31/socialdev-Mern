import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // Destructure from useState
    const { email, password } = formData;

    const onSubmitHandle = async (e) => {
        e.preventDefault();
        
        console.log('Success');
    }

    const onChangeForm = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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

export default Login
