
import sharp from 'sharp';
import path from 'path';

class ImageService {
  async resizeImage(width: number, height: number, image: Buffer | string): Promise<Buffer> {
    if (typeof image === 'string') {
      const imagePath = path.resolve(image);
      return sharp(imagePath)
        .resize(width, height)
        .toBuffer();
    }
    
    return sharp(image)
      .resize(width, height)
      .toBuffer();
  }
}

export default ImageService;


