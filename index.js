import express from "express";
import getPhones from "./routes/getphones.js";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.use("/phones", getPhones);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to CellSync API",
    endpoints: {
      phones: "/phones",
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
