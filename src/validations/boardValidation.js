/* eslint-disable no-console */
import Joi from "joi";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";

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
    // Đẩy lỗi qua bên file server.js để xử lý trong middleware lỗi tập trung
    next(
      // Class ApiError được custom dựa trên Error để có thể custom được mã lỗi
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    );
  }
};

export const boardValidation = {
  createNew,
};
