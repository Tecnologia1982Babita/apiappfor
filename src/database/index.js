const Sequelize = require('sequelize');
const dbConfig = require('../config/database');



const vendas = require('../models/Vendas');
const estoquetotal = require('../models/Estoquetotal');
const erp_usuarios = require('../models/erp_usuario');
const erp_fornecedor_usuario = require('../models/erp_fornecedor_usuario');
const connection = new Sequelize(dbConfig);


vendas.init(connection);
estoquetotal.init(connection);
erp_usuarios.init(connection);
erp_fornecedor_usuario.init(connection);
erp_fornecedor_usuario.associate(connection.models);
erp_usuarios.associate(connection.models);



module.exports = connection;

