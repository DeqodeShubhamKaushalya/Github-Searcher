import express from 'express';
import gitHubHandlerController from '../controllers/github-handler-controller';

const router = express.Router();

router.post('/:handle/repositories', gitHubHandlerController.getRepositories);
router.post('/:handle/profile', gitHubHandlerController.profile);

export default router;
