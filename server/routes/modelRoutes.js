import express from 'express';
import { getModelsController, createModelController ,getAllController} from '../controller/modelController.js';



import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();


router.post('/add', upload.single("file"), createModelController);
router.get('/get/:title', getModelsController);
router.get('/all',getAllController)

export default router;
