const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Bot está vivo!");
});

app.listen(3000, () => {
  console.log("Servidor keep-alive está rodando na porta 3000");
});
