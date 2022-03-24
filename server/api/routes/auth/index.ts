import express from 'express';
import AuthController from '../../controllers/AuthController';

const router = express.Router();

router.get('', AuthController.getAuthorizationFromUser);
router.post('/token', AuthController.getToken);
router.post('/refresh-token', AuthController.getRefreshToken);

export default router;

