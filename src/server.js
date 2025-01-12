/* eslint-disable no-console */
import express from "express";
import { CLOSE_DB, CONNECT_DB } from "~/config/mongodb";
import exitHook from "async-exit-hook";
import { env } from "~/config/environment";
import { APIs_V1 } from "~/routes/v1";
import { errorHandlingMiddleware } from "~/middlewares/errorHandlingMiddleware";

const START_SERVER = () => {
  const app = express();

  // Cho phép server nhận dữ liệu req.body là json data
  app.use(express.json());

  app.use("/v1", APIs_V1);

  // Middleware xử lý lỗi tập trung
  app.use(errorHandlingMiddleware);

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`Server is running at http://${env.APP_HOST}:${env.APP_PORT}/`);
  });

  // Thực hiện các tác vụ cleanup trước khi dừng server
  exitHook(() => {
    CLOSE_DB();
  });
};

// IIFE để kết nối db và start server (mục đích chủ yếu để dùng async await và try catch để xử lý lỗi kết nối db)
(async () => {
  try {
    await CONNECT_DB();
    console.log("Connected to MongoDB Cloud Atlas!");
    START_SERVER();
  } catch (error) {
    console.error(error);
    // Nếu có lỗi thì dừng con server lại
    process.exit(0);
  }
})();
