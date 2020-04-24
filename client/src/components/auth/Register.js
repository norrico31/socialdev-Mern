import React, { Fragment, useState } from 'react'

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    // Destructure from useState
    const { name, email, password, password2 } = formData;

    const onSubmitHandle = (e) => {
        e.preventDefault();
        if(password !== password2) {
           console.log('Passwords do not match');
        } else {
            console.log(formData);
        }
    }

    const onChangeForm = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up
            </h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form onSubmit={(e) => onSubmitHandle(e) } className="form">

                <div className="form-group">
                <input type="text" placeholder="Name" name="name" required value={ name } onChange={(e) => onChangeForm(e)} />
                </div>

                <div className="form-group">
                <input type="email" placeholder="Email Address" name="email" required value={ email } onChange={(e) => onChangeForm(e)}/>
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
            <p className="my-1">Already have an account? <a href="login.html">Sign In</a></p>
        </Fragment>
    )
}

export default Register
