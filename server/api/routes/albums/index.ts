import express from 'express';
import AlbumController from '../../controllers/AlbumController';

const router = express.Router();

router.get('', AlbumController.getAlbums)
router.get('/:id', AlbumController.getAlbum);

export default router;