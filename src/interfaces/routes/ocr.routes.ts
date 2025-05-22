import { Router } from "express";
import multer from "multer";
import { processAadhaar } from "../controllers/ocr.controller";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/ocr/process-aadhaar', upload.fields([{ name: 'front', maxCount: 1 },{ name: 'back', maxCount: 1 }]), processAadhaar);

export default router;
