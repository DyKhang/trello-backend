import express from "express";

const app = express();

const hostname = "localhost";
const port = 8071;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, hostname, () => {
  console.log(`Server is running http://${hostname}:${port}/`);
});
