import express from 'express';

const router = express.Router();
import {getPosts,createPost,updatePost,deletePost,likePost} from '../routes_controllers/posts_controller.js'

router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id',deletePost);
router.patch('/:id/likePost',likePost);

export default router;