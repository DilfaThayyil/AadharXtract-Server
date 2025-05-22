export interface IOcrService {
    extractTextFromImage(buffer: Buffer): Promise<string>;
  }
  