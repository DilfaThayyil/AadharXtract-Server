import { Request, Response } from 'express';
import vision from '@google-cloud/vision';
import { extractAadhaarDetails } from '../utils/extractAadhar';


const client = new vision.ImageAnnotatorClient();

export const processAadhaar = async (req: Request, res: Response): Promise<void> => {
  try {
    const files = req.files as {
      front?: Express.Multer.File[];
      back?: Express.Multer.File[];
    };

    if (!files.front || !files.back) {
      res.status(400).json({ success: false, message: 'Both front and back images are required.' });
      return;
    }

    const frontBuffer = files.front[0].buffer;
    const backBuffer = files.back[0].buffer;

    const [frontResult] = await client.textDetection({ image: { content: frontBuffer } });
    const [backResult] = await client.textDetection({ image: { content: backBuffer } });
    const frontText = frontResult.fullTextAnnotation?.text || '';
    const backText = backResult.fullTextAnnotation?.text || '';
    console.log("*******fronteText******** : ",frontText)
    console.log("*******backText********* : ",backText)
    const data = extractAadhaarDetails(frontText, backText);
console.log("-----------------data--------------------",data)
    const frontBase64 = `data:image/png;base64,${frontBuffer.toString('base64')}`;
    const backBase64 = `data:image/png;base64,${backBuffer.toString('base64')}`;

    res.json({
      success: true,
      message: 'Aadhaar data extracted successfully',
      data: {
        ...data,
        frontImage: frontBase64,
        backImage: backBase64
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error processing Aadhaar images' });
  }
};
