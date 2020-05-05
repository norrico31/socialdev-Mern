import React, { Fragment } from 'react'

const NotFound = () => {
    return (
        <Fragment>
            <h1 className="x-large text-primary"><i className="fas fa-exclamation-triangle"></i> {' '}404 Page Not Found</h1>
            <p className="large">Sorry, the page you are looking for is not found</p>
        </Fragment>
    )
}

export default NotFound
