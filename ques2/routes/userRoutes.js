import express from 'express';
import { getTopUsers } from '../controllers/userController.js';

const router = express.Router();

router.get('/users', getTopUsers);

export default router;
