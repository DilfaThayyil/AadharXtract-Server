import { IOcrService } from '../../infrastructure/interfaces/IOcrService';
import { extractAadhaarDetails } from '../../utils/extractAadhar';
import { OcrService } from '../../infrastructure/services/ocr.service';
import { isValidAadhaarBack, isValidAadhaarFront } from '../../utils/validateAadharText';

export class ExtractAadharData {
  static async execute(frontBuffer: Buffer, backBuffer: Buffer) {
    const ocrService: IOcrService = new OcrService();

    const frontText = await ocrService.extractTextFromImage(frontBuffer);
    const backText = await ocrService.extractTextFromImage(backBuffer);
    if (!isValidAadhaarFront(frontText) && !isValidAadhaarBack(backText)) {
      throw new Error("Both sides does not appear to be a valid Aadhaar card.");
    }
    if (!isValidAadhaarBack(backText)) {
      throw new Error("Back side does not appear to be a valid Aadhaar card.");
    }
    if (!isValidAadhaarFront(frontText)) {
      throw new Error("front side does not appear to be a valid Aadhaar card.");
    }
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
