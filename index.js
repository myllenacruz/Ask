const express = require("express");
const app = express();
const connection = require("./database/database");
const askModel = require("./database/Ask");
const Resposta = require("./database/Resposta");

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

app.get("/pergunta/:id", (req, res) => {
  let id = req.params.id;
  askModel.findOne({
    where: {id: id}
  }).then(pergunta => {
    if(pergunta != undefined) {

      Resposta.findAll({
        where: {perguntaId: pergunta.id},
        order: [ 
          ['id', 'DESC']
        ]
      }).then(respostas => {
        res.render("pergunta", {
          pergunta: pergunta,
          respostas: respostas
        });
      }); 
      
    } else {
      res.redirect("/");
    }
  });
});

app.post("/responder", (req, res) => {
  let corpo = req.body.corpo;
  let perguntaId = req.body.pergunta;
  Resposta.create({
    corpo: corpo,
    perguntaId: perguntaId
  }).then(() =>{
    res.redirect("/pergunta/"+perguntaId);
  });
});

app.listen(8080, () => {
  console.log("Rodando!");
});
