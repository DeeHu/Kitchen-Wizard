import { Button, Paper, TextField, Typography } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import useStyles from './styles';
import { useState, useEffect } from 'react';

const Form = ({ currentId, setCurrentId }) => {
  // Constants
  const classes = useStyles();
  const dispatch = useDispatch();
  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
  const [formData, setFormData] = useState({ creator: '', title: '', description: '', tags: '', selectedFile: '' });

  // useEffect
  useEffect(() => {
    if (post) setFormData(post);
  }, [post]);

  // Event handlers
  const handleInputChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });
  const handleTagChange = (event) => setFormData({ ...formData, tags: event.target.value.split(',') });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (currentId === 0) {
        await dispatch(createPost(formData));
      } else {
        await dispatch(updatePost(currentId, formData));
      }
      clearForm();
    } catch (error) {
      console.log(error);
    }
  };

  const clearForm = () => {
    setCurrentId(0);
    setFormData({ creator: '', title: '', description: '', tags: '', selectedFile: '' });
  };

  // Render
  const renderInputs = () => (
    <>
      <TextField name="creator" variant="outlined" label="Creator" fullWidth value={formData.creator} onChange={handleInputChange} />
      <TextField name="title" variant="outlined" label="Title" fullWidth value={formData.title} onChange={handleInputChange} />
      <TextField name="description" variant="outlined" label="Description" fullWidth value={formData.description} onChange={handleInputChange} />
      <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={formData.tags} onChange={handleTagChange} />
      <div className={classes.fileInput}>
        <FileBase type="file" multiple={false} onDone={({ base64 }) => setFormData({ ...formData, selectedFile: base64 })} />
      </div>
    </>
  );

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a recipe</Typography>
        {renderInputs()}
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="outlined" color="secondary" size="small" onClick={clearForm} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
