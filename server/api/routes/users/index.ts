import express from 'express';
import UserController from '../../controllers/UserController';

const router = express.Router();

router.get('/me', UserController.getAuthUser);
router.get('/:id/playlists', UserController.getUserPlaylists);
router.post('/playlists', UserController.createPlaylist);

export default router;