const Sequelize = require("sequelize");
const connection = require("./database");

const Ask = connection.define("ask", {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Ask.sync({force: false}).then(() => {});

module.exports = Ask;