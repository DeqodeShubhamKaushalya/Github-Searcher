import express from 'express';
import profileController from '../controllers/profile.controller';

const router = express.Router();
router.post('/:handle/profile', profileController.profile);

export default router;
