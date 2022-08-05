const erp_usuarios = require('../models/erp_usuario');
//const UsuForn = require('../models/erp_fornecedor_usuario');
const sequelize = require("sequelize");
const erp_fornecedor_usuario = require('../models/erp_fornecedor_usuario');

const md5 = require('md5');

const Op = sequelize.Op;

module.exports = {
  async index(req, res) {


    const usu_login = req.params.usu_login;
    const usu_senha = req.params.usu_senha;

    const ausu_login = usu_login.toUpperCase() 

 

  
    const erp_usuario = await erp_usuarios.findAll({

       
            include: [ {
                model: erp_fornecedor_usuario,
                as: 'codigofab',
                through: {attributes:[]},
            
            }],

            where:[{usu_login: ausu_login, usu_senha: md5(usu_senha)}] 

      
    });
     
   
    
 
    return res.json(erp_usuario);
  },

 
  


  

};