const { Model, DataTypes } = require('sequelize');
const erp_fornecedor_usuario = require('./erp_fornecedor_usuario');
//const UsuForn = require('./erp_fornecedor_usuario');


class erp_usuario extends Model {
  static init(sequelize) {
    super.init({

   /*   bas12meses_cod: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true // Automatically gets converted to SERIAL for postgres
      },*/
      usu_cod:{
        type: DataTypes.INTEGER,
        primaryKey: true,
      },

      
      

     usu_login: DataTypes.STRING,

    usu_senha: DataTypes.STRING,
      
 
    
   
    }, 

   

  
 
    
    
    
    {
      sequelize
    })

    erp_usuario.associate = (models) => {
      erp_usuario.belongsToMany(models.erp_fornecedor_usuario, {
          through: 'erp_usuario',
          as: 'codigofab',
          foreignKey: 'usu_cod'
      });
    };
    

  }



}




module.exports = erp_usuario;