import React from 'react'

const Landing = () => {
    return (
        <div>
            <section className="landing">
                <div className="dark-overlay">
                    <div className="landing-inner">
                        <h1 className="x-large">Developer Connector</h1>
                        <p className="lead">Create Developer profile/portfolio, share posts and get help from other developers</p>
                        <div className="buttons">
                            <a href="login.html" className="btn btn-primary">Sign Up</a>
                            <a href="login.html" className="btn">Sign In</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Landing
