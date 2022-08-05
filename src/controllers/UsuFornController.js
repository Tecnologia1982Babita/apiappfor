//const erp_usuarios = require('../models/erp_usuario');
const erp_fornecedor_usuarios = require('../models/erp_fornecedor_usuario');
//const sequelize = require("sequelize");

//const Op = sequelize.Op;

module.exports = {
  async index(req, res) {
    //const { usu_cod } = req.params;

 

  
    const erp_fornecedor_usuario = await erp_fornecedor_usuarios.findAll();

    
 
    return res.json(erp_fornecedor_usuario);
  },

 
  


  

};