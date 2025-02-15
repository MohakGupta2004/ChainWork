import express from 'express';
import { getMessages, createMessage } from '../controllers/messageController';

const router = express.Router();

router.get('/:roomId', getMessages);
router.post('/:roomId', createMessage);

export default router; 