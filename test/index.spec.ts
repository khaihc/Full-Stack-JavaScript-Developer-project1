import ImageCheckerMiddleware from '../src/middleware/image.middleware';


describe('ImageMiddleware', () => {
    let imageMiddleware: ImageCheckerMiddleware;

    beforeEach(() => {
      imageMiddleware = new ImageCheckerMiddleware();
    });

    describe('getFileExtension', () => {
      it('should return the correct file extension', () => {
        expect(imageMiddleware['getFileExtension']('test.png')).toBe('.png');
        expect(imageMiddleware['getFileExtension']('test.jpeg')).toBe('.jpeg');
        expect(imageMiddleware['getFileExtension']('test.jpg')).toBe('.jpg');
        expect(imageMiddleware['getFileExtension']('test')).toBe('');
      });
    });

    describe('isImageValid', () => {
      it('should return true for valid image extensions', async () => {
        await expectAsync(imageMiddleware.isImageValid('image.png')).toBeResolvedTo(true);
        await expectAsync(imageMiddleware.isImageValid('image.jpeg')).toBeResolvedTo(true);
        await expectAsync(imageMiddleware.isImageValid('image.jpg')).toBeResolvedTo(true);
      });

      it('should return false for invalid image extensions', async () => {
        await expectAsync(imageMiddleware.isImageValid('image.txt')).toBeResolvedTo(false);
        await expectAsync(imageMiddleware.isImageValid('image.gif')).toBeResolvedTo(false);
      });
    });

    describe('isEndpointValid', () => {
      it('should return true for valid endpoint', async () => {
        await expectAsync(imageMiddleware.isEndpointValid('/images/test.png')).toBeResolvedTo(true);
        await expectAsync(imageMiddleware.isEndpointValid('/images/another-image.jpg')).toBeResolvedTo(true);
      });

      it('should return false for invalid endpoint', async () => {
        await expectAsync(imageMiddleware.isEndpointValid('/not-images/test.png')).toBeResolvedTo(false);
        await expectAsync(imageMiddleware.isEndpointValid('/other-endpoint')).toBeResolvedTo(false);
      });
    });
});
