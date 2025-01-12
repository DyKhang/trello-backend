import express from "express";
import { StatusCodes } from "http-status-codes";
import { boardController } from "~/controllers/boardController";
import { boardValidation } from "~/validations/boardValidation";

const Router = express.Router();

Router.route("/")
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: "Note: API get list boards" });
  })
  // Validate dữ liệu trước rồi mới đến controller
  .post(boardValidation.createNew, boardController.createNew);

export const boardRoute = Router;
