const Estoquetotal = require('../models/Estoquetotal');
const sequelize = require("sequelize");

const Op = sequelize.Op;

module.exports = {
  async index(req, res) {
   const {for_cod} = req.params;
 

  
    const view_estoque = await Estoquetotal.findAll({
     
      attributes: [
       
        [sequelize.fn('sum', sequelize.col('qtd_estoque')), 'totalpeca'],
        [sequelize.fn('sum', sequelize.col('prcvenda_x_quantidade')), 'total'],
        
    ],
   

      where: 
   
      
     sequelize.literal('codigo::integer in (select distinct for_cod from erp_fornecedores_vinculado where forvin_cod =   (select forvin_cod from erp_fornecedores_vinculado where for_cod ='+for_cod+'))'),

     
 
  


 
     
     


      
     
    });

    
 
    return res.json(view_estoque);
  },

 
  


  

};