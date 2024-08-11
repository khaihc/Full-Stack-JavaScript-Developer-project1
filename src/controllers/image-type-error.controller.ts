import { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import axios from 'axios';
import ImageService from '../services/image.service';

const imageService = new ImageService();

export const handleImageTypeError = async (req: Request, res: Response, next: NextFunction) => {
  // Process parameters from query string
  try {
    const filename = req.query.filename as string;
    const width = parseInt(req.query.width as string, 10);
    const height = parseInt(req.query.height as string, 10);
    const imageUrl = req.query.url as string;

    if (!width || isNaN(width) || !height || isNaN(height)) {
      return res.status(400).json({ message: 'Missing filename, height, or invalid' });
    }

    // Image URL handling
    if (imageUrl) {
      try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data);

        const resizedImage = await imageService.resizeImage(width, height, imageBuffer);
        res.set('Content-Type', 'image/png');
        res.status(200).send(resizedImage);
      } catch (error) {
        return res.status(400).json({ message: 'Failed to fetch or process image from URL' });
      }
    } 
    // File name handling
    else if (filename) {
      const imagePath = path.join(__dirname, '../images/', `${filename}.jpg`);

      fs.access(imagePath, fs.constants.F_OK, async (err) => {
        if (err) {
          const pngImagePath = path.join(__dirname, '../images/', `${filename}.png`);
          fs.access(pngImagePath, fs.constants.F_OK, async (err) => {
            if (err) {
              return res.status(404).json({ message: 'Invalid input for filename' });
            }

            try {
              const resizedImage = await imageService.resizeImage(width, height, pngImagePath);
              res.set('Content-Type', 'image/png');
              res.status(200).send(resizedImage);
            } catch (error) {
              next(error);
            }
          });
        } else {
          try {
            const resizedImage = await imageService.resizeImage(width, height, imagePath);
            res.set('Content-Type', 'image/jpeg');
            res.status(200).send(resizedImage);
          } catch (error) {
            next(error);
          }
        }
      });
    } else {
      return res.status(400).json({ message: 'No valid image source provided' });
    }
  } catch (err) {
    next(err);
  }
};

