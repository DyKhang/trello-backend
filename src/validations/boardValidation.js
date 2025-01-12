/* eslint-disable no-console */
import Joi from "joi";
import { StatusCodes } from "http-status-codes";

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict(),
  });

  try {
    // Thêm abortEarly: false để khi có nhiều lỗi validate thì trả về tất cả lỗi
    await correctCondition.validateAsync(req.body, { abortEarly: false });

    // Validate dữ liệu thành công thì cho request đi tiếp đến controller
    next();
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message,
    });
  }
};

export const boardValidation = {
  createNew,
};
