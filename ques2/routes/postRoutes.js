import express from 'express';
import { getPosts } from '../controllers/postController.js';

const router = express.Router();

router.get('/posts', getPosts);

export default router;
