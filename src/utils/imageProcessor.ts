import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

/**
 * Transforms an image by resizing it to the specified width and height
 * and saves it to the specified output path.
 *
 * @param inputPath - The path to the input image file.
 * @param width - The desired width of the output image.
 * @param height - The desired height of the output image.
 * @param outputPath - The path where the resized image will be saved.
 * @returns A promise that resolves when the image has been processed.
 */
export const transform = async (inputPath: string, width: number, height: number, outputPath: string): Promise<void> => {
  try {
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    await sharp(inputPath)
      .resize(width, height)
      .toFile(outputPath);
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
};