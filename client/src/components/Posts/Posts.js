import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';

import { useSelector } from 'react-redux';
import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
    const classes = useStyles();
    const posts = useSelector((state) => state.posts);

    console.log(posts);
    return (
        <div>
            {!posts.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map((p) => (
                    <Grid key={p._id} item xs={12} sm={6}>
                        <Post post={p} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
            )}
        </div>
    )
}

export default Posts