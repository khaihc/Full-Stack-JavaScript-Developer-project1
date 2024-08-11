import express from 'express';
import { handleImageTypeError } from '../controllers/image-type-error.controller';

const imageRouter = express.Router();

imageRouter.get('/images', handleImageTypeError);

export default imageRouter;
