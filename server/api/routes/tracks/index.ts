import express from 'express';
import TrackController from '../../controllers/TrackController';

const router = express.Router();

router.get('/recommendations', TrackController.getRecommendations)
router.get('/search', TrackController.search);

export default router;