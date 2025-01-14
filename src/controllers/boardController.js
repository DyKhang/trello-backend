import { StatusCodes } from "http-status-codes";
import { boardService } from "~/services/boardService";

const createNew = async (req, res, next) => {
  try {
    // Điều hướng dữ liệu sang tầng service
    const newBoard = await boardService.createNew(req.body);

    // Có kết quả thì trả về phía client
    res.status(StatusCodes.CREATED).json(newBoard);
  } catch (error) {
    next(error);
  }
};

export const boardController = {
  createNew,
};
