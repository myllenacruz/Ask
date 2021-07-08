const express = require("express");
const app = express();
const connection = require("./database/database");
const askModel = require("./database/Ask");

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

//Rotas
app.get("/", (req, res) => {
  askModel.findAll({ raw: true, order:[
    ['id', 'DESC']
  ] }).then(perguntas => {
    res.render("index", {
      perguntas: perguntas
    });
  });
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/saveask", (req, res) => {

  let titulo = req.body.titulo;
  let descricao = req.body.descricao;
  
  askModel.create({
    titulo: titulo,
    descricao: descricao
  }).then(() => {
    res.redirect("/");
  });
});

app.get("/pergunta/:id", (req, res) =>{
  let id = req.params.id;
  askModel.findOne({
    where: {id: id}
  }).then(pergunta => {
    if(pergunta != undefined) {
      res.render("pergunta", {
        pergunta: pergunta
      });
    } else {
      res.redirect("/");
    }
  });
});

app.listen(8080, () => {
  console.log("Rodando!");
});

