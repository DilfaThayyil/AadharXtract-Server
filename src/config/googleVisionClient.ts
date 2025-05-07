import vision from '@google-cloud/vision';
import path from 'path';
import { GOOGLE_APPLICATION_CREDENTIALS } from './env';

if (!GOOGLE_APPLICATION_CREDENTIALS) {
  throw new Error('Missing GOOGLE_APPLICATION_CREDENTIALS environment variable');
}

const client = new vision.ImageAnnotatorClient({
  keyFilename: path.join(__dirname, GOOGLE_APPLICATION_CREDENTIALS),
});

export default client;
