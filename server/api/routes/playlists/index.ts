import express from 'express';
import PlaylistController from '../../controllers/PlaylistController';

const router = express.Router();

router.get('/:id', PlaylistController.getPlaylist);
router.post('/:id/tracks/:trackId', PlaylistController.addTrack);
router.delete('/:id/tracks/:trackId', PlaylistController.removeTrack);

export default router;