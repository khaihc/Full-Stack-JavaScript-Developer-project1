import supertest from 'supertest';
import { Response } from 'superagent';
const app = require('../src/index.ts');
import ImageCheckerMiddleware from '../src/middleware/image.middleware';
import { transform } from '../src/utils/imageProcessor';

describe('ImageMiddleware', () => {
  let imageMiddleware: ImageCheckerMiddleware;

  beforeEach(() => {
    imageMiddleware = new ImageCheckerMiddleware();
  });

  describe('getFileExtension', () => {
    it('should return the correct file extension', () => {
      // Testing various file extensions
      expect(imageMiddleware['getFileExtension']('test.png')).toBe('.png');
      expect(imageMiddleware['getFileExtension']('test.jpeg')).toBe('.jpeg');
      expect(imageMiddleware['getFileExtension']('test.jpg')).toBe('.jpg');
      expect(imageMiddleware['getFileExtension']('test')).toBe('');
    });
  });

  describe('isImageValid', () => {
    it('should return true for valid image extensions', async () => {
      // Valid image extensions should return true
      await expectAsync(imageMiddleware.isImageValid('image.png')).toBeResolvedTo(true);
      await expectAsync(imageMiddleware.isImageValid('image.jpeg')).toBeResolvedTo(true);
      await expectAsync(imageMiddleware.isImageValid('image.jpg')).toBeResolvedTo(true);
    });

    it('should return false for invalid image extensions', async () => {
      // Invalid image extensions should return false
      await expectAsync(imageMiddleware.isImageValid('image.txt')).toBeResolvedTo(false);
      await expectAsync(imageMiddleware.isImageValid('image.gif')).toBeResolvedTo(false);
    });
  });

  describe('isEndpointValid', () => {
    it('should return true for valid endpoint', async () => {
      // Testing valid image endpoints
      await expectAsync(imageMiddleware.isEndpointValid('/images/test.png')).toBeResolvedTo(true);
      await expectAsync(imageMiddleware.isEndpointValid('/images/another-image.jpg')).toBeResolvedTo(true);
    });

    it('should return false for invalid endpoint', async () => {
      // Testing invalid endpoints
      await expectAsync(imageMiddleware.isEndpointValid('/not-images/test.png')).toBeResolvedTo(false);
      await expectAsync(imageMiddleware.isEndpointValid('/other-endpoint')).toBeResolvedTo(false);
    });
  });
});

// API tests for image processing
describe('GET /api/images', () => {
  it('should return 200 OK for valid image request', (done) => {
    supertest(app)
      .get('/api/images?filename=full-stack&width=1000&height=500')
      .expect(200)
      .end((err: any, res: Response) => {
        if (err) throw err;
        expect(res.status).toBe(200);
        done();
      });
  });

  it('should return 400 Bad Request for invalid parameters', (done) => {
    supertest(app)
      .get('/api/images?filename=invalid-image&width=abc&height=xyz')
      .expect(400)
      .end((err: any, res: Response) => {
        if (err) throw err;
        expect(res.status).toBe(400);
        done();
      });
  });
});

// Test for image processing function
describe('Image Processing', () => {
  it('should process the image without throwing an error', async () => {
    const testFilePath = 'src/images/fullstack.png';
    const testWidth = 1000;
    const testHeight = 500;
    const testThumbPath = 'build/images/fullstack-thumbnail.png';

    await expect(async () => {
      await transform(testFilePath, testWidth, testHeight, testThumbPath);
    }).not.toThrow();
  });
});