/* eslint-disable no-console */
import express from "express";
import { CLOSE_DB, CONNECT_DB } from "~/config/mongodb";
import exitHook from "async-exit-hook";
import { env } from "~/config/environment";

const START_SERVER = () => {
  const app = express();

  const port = 2003;
  const hostname = "localhost";

  app.get("/", async (req, res) => {
    res.end("<h1>Hello World!</h1>");
  });

  app.listen(port, hostname, () => {
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
