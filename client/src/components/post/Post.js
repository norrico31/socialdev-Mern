import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPost } from '../../actions/post';

import Spinner from '../layout/Spinner';

import PostItem from '../posts/PostItem';

const Post = ({ getPost, post: { post, loading }, match }) => {
    useEffect(() => {
        getPost(match.params.id);
    }, [getPost])

    return loading || post === null ? <Spinner /> : <Fragment>
        <Link to="/posts" className="btn"><i className="fas fa-chevron-left"></i>{' '}Posts</Link>
        <PostItem post={post} showActions={false}/>
    </Fragment>
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = ({ post }) => ({
    post: post
})

export default connect(mapStateToProps, { getPost })(Post);
