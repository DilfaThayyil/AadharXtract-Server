import { Request, Response } from 'express';
import { ExtractAadharData } from '../../application/use-cases/ExtractAadharData';
import { HttpStatusCode } from '../../utils/httpStatusCode';
import { messageConstants } from '../../constants/messageContants';

export const processAadhaar = async (req: Request, res: Response): Promise<void> => {
  try {
    const files = req.files as { front?: Express.Multer.File[]; back?: Express.Multer.File[] };

    if (!files?.front || !files?.back) {
      res.status(HttpStatusCode.BAD_REQUEST).json({ success: false, message: messageConstants.ERROR });
      return;
    }

    const result = await ExtractAadharData.execute(files.front[0].buffer, files.back[0].buffer);

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: messageConstants.SUCCESS,
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: messageConstants.FAILURE,
    });
  }
};
