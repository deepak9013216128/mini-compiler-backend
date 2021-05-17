const path = require("path");
const utils = require("util");
const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const { exec } = require("child_process");
const cors = require("cors");

const rootDir = path.dirname(process.mainModule.filename);
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(fileUpload());
app.use("/api/output/", express.static("output"));

app.post("/api/compile/", async (req, res) => {
  // console.log(req.body);
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json("No files were uploaded.");
  }

  // console.log(req.files);

  inputFile = req.files.inputFile;
  uploadPath = path.join(__dirname, "input", "input.txt");

  if (!inputFile) {
    return res
      .status(400)
      .json("Invalid File name,file name should be inputFile.txt");
  }
  // Use the mv() method to place the file somewhere on your server
  inputFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);
    try {
      compile(res);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  });
});

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message, data });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000.");
});

function execute(command) {
  return utils.promisify(exec)(command);
}
const compile = async (res) => {
  let fileName = "lexOut.txt";
  execute(
    path.join(rootDir, "exe", "lex.exe ") +
      path.join(rootDir, "input", "input.txt > ") +
      path.join(rootDir, "output", "lexOut.txt")
  )
    .then((lex) => {
      fileName = "synOut.txt";
      return execute(
        path.join(rootDir, "exe", "syntax.exe ") +
          path.join(rootDir, "output", "lexOut.txt > ") +
          path.join(rootDir, "output", "synOut.txt")
      );
    })
    .then((syn) => {
      fileName = "machineCodeOut.txt";
      return execute(
        path.join(rootDir, "exe", "codegen.exe ") +
          path.join(rootDir, "output", "synOut.txt > ") +
          path.join(rootDir, "output", "machineCodeOut.txt")
      );
    })
    .then((out) => {
      return res.status(200).json("File uploaded!");
    })
    .catch((err) => {
      console.log("Error: ", err);
      return res.status(400).sendFile(path.join(__dirname, "output", fileName));
    });
};
