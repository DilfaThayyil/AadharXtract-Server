import { Request, Response } from 'express';
import vision from '@google-cloud/vision';
import { extractAadhaarDetails } from '../utils/extractAadhar';
import { GOOGLE_APPLICATION_CREDENTIALS } from '../config/env';
import { HttpStatusCode } from '../constants/httpStatusCode';
import { messageConstants } from '../constants/messageContants';

const credentials = JSON.parse(GOOGLE_APPLICATION_CREDENTIALS as string);

const client = new vision.ImageAnnotatorClient({
  credentials
});

export const processAadhaar = async (req: Request, res: Response): Promise<void> => {
  try {
    const files = req.files as {
      front?: Express.Multer.File[];
      back?: Express.Multer.File[];
    };

    if (!files.front || !files.back) {
      res.status(HttpStatusCode.BAD_REQUEST).json({ success: false, message: messageConstants.ERROR });
      return;
    }

    const frontBuffer = files.front[0].buffer;
    const backBuffer = files.back[0].buffer;

    const [frontResult] = await client.textDetection({ image: { content: frontBuffer } });
    const [backResult] = await client.textDetection({ image: { content: backBuffer } });
    const frontText = frontResult.fullTextAnnotation?.text || '';
    const backText = backResult.fullTextAnnotation?.text || '';
    const data = extractAadhaarDetails(frontText, backText);
    const frontBase64 = `data:image/png;base64,${frontBuffer.toString('base64')}`;
    const backBase64 = `data:image/png;base64,${backBuffer.toString('base64')}`;

    res.json({
      success: true,
      message: messageConstants.SUCCESS,
      data: {
        ...data,
        frontImage: frontBase64,
        backImage: backBase64
      }
    });
  } catch (error) {
    console.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: messageConstants.FAILURE });
  }
};
