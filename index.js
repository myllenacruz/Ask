const express = require("express");
const app = express();
const connection = require("./database/database");

connection
  .authenticate()
  .then(() =>{
    console.log("Sucesso!");
  })
  .catch((msgErro) => {
    console.log(msgErro);
  })

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use (express.urlencoded ({ extended: true }));
app.use (express.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/saveask", (req, res) => {
  let titulo = req.body.titulo;
  let descricao = req.body.descricao;
  res.send(`Recebido! Título: ${titulo} e descricação: ${descricao}`);
});

app.listen(8080, () => {
  console.log("Rodando!");
});
