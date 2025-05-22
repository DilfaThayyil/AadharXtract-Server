import { ImageAnnotatorClient, protos } from '@google-cloud/vision';
import { IOcrService } from '../interfaces/IOcrServices';
import { GOOGLE_APPLICATION_CREDENTIALS } from '../../config/env';

export class OcrService implements IOcrService {
    private client: ImageAnnotatorClient;
  
    constructor() {
      this.client = new ImageAnnotatorClient({
        keyFilename: GOOGLE_APPLICATION_CREDENTIALS,
      });
    }

  async extractTextFromImage(buffer: Buffer): Promise<string> {
    const [result]: [protos.google.cloud.vision.v1.IAnnotateImageResponse] =
      await this.client.textDetection({ image: { content: buffer } });

    return result.fullTextAnnotation?.text || '';
  }
}
