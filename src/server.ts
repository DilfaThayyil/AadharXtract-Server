import express from 'express';
import dotenv from 'dotenv';
import ocrRoutes from './routes/ocr.routes';
import cors from "cors";
import { BACKENDURL, FRONTENTURL, PORT } from './config/env';

dotenv.config();

const app = express();

app.use(cors({
    origin: FRONTENTURL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }));

app.use(express.json());
app.use('/api', ocrRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at ${BACKENDURL}`);
});
