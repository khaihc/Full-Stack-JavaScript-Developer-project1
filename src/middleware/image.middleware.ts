class ImageMiddleware {
  private getFileExtension(filename: string): string {
    const urlParts = filename.split('.');
    if (urlParts.length > 1) {
      return `.${urlParts[urlParts.length - 1].toLowerCase()}`;
    }
    return '';
  }

  async isImageValid(filename: string): Promise<boolean> {
    try {
      const validImageExtensions = ['.png', '.jpeg', '.jpg'];
      const extension = this.getFileExtension(filename);
      return validImageExtensions.includes(extension);
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  }

  async isEndpointValid(url: string): Promise<boolean> {
    try {
      return url.includes('/images');
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  }
}

export default ImageMiddleware;
