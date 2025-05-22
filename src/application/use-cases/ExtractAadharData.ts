import { IOcrService } from '../../infrastructure/interfaces/IOcrServices';
import { extractAadhaarDetails } from '../../utils/extractAadhar';
import { OcrService } from '../../infrastructure/services/ocrServices';

export class ExtractAadharData {
  static async execute(frontBuffer: Buffer, backBuffer: Buffer) {
    const ocrService: IOcrService = new OcrService();

    const frontText = await ocrService.extractTextFromImage(frontBuffer);
    const backText = await ocrService.extractTextFromImage(backBuffer);

    const data = extractAadhaarDetails(frontText, backText);
    const frontBase64 = `data:image/png;base64,${frontBuffer.toString('base64')}`;
    const backBase64 = `data:image/png;base64,${backBuffer.toString('base64')}`;

    return {
      ...data,
      frontImage: frontBase64,
      backImage: backBase64,
    };
  }
}
