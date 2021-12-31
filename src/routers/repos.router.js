import express from 'express';
import reposController from '../controllers/repos.controller';
import profileController from '../controllers/profile.controller';

const router = express.Router();
router.post('/:handle/repositories', reposController.getRepositories);
router.post('/:handle/profile', profileController.profile);

module.exports = router;
