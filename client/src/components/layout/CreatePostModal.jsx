import React, { useState } from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Slide from '@material-ui/core/Slide';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import ChipInput from 'material-ui-chip-input';

import { createPost } from '../../store/post/post-actions';
import { useDispatch } from 'react-redux';

const style = {
  position: 'absolute',
  top: '35%',
  left: '35%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 10,
};

const CreatePostModal = () => {
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [createPostState, setCreatePostState] = useState({
    title: '',
    postBody: '',
    description: '',
    tags: [],
  });

  const { title, postBody, description } = createPostState;

  const onSubmitCreatePost = (e) => {
    e.preventDefault();
    dispatch(createPost(createPostState));
    setTimeout(() => {
      setCreatePostState({
        title: '',
        postBody: '',
        description: '',
        tags: [],
      });
      setOpenModal(false);
    }, 1000);
  };
  const onChange = (e) => {
    setCreatePostState({
      ...createPostState,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddChip = (chip) => {
    setCreatePostState({
      ...createPostState,
      tags: [...createPostState.tags, chip],
    });
  };
  const handleDeleteChip = (chip, index) => {
    setCreatePostState({
      ...createPostState,
      tags: createPostState.tags.filter((chip, i) => i !== index),
    });
  };

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-create-post"
        aria-describedby="modal-modal-description"
      >
        <Slide direction="down" in={openModal} mountOnEnter unmountOnExit>
          <Box sx={style}>
            <form onSubmit={onSubmitCreatePost}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Title"
                name="title"
                autoComplete="title"
                autoFocus
                value={title}
                onChange={onChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Description"
                name="description"
                autoComplete="description"
                autoFocus
                value={description}
                onChange={onChange}
              />
              <TextField
                name="postBody"
                id="outlined-textarea"
                label="Multiline Placeholder"
                placeholder="Placeholder"
                multiline
                value={postBody}
                onChange={onChange}
              />
              <ChipInput
                value={createPostState.tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip, index) => handleDeleteChip(chip, index)}
              />
              <Button type="submit" variant="contained" endIcon={<SendIcon />}>
                Send
              </Button>
            </form>
          </Box>
        </Slide>
      </Modal>
      <Button onClick={handleOpenModal}>Create New Post</Button>
    </div>
  );
};

export default CreatePostModal;
