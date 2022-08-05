const { Model, DataTypes } = require('sequelize');

class erp_fornecedor_usuario extends Model {
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

     //usu_login: DataTypes.STRING,

    //usu_senha: DataTypes.STRING,

    for_cod: DataTypes.INTEGER,
      
  
   
    },  {
      sequelize
    })

    erp_fornecedor_usuario.associate = (models) => {
      erp_fornecedor_usuario.belongsToMany(models.erp_usuario, {
          through: 'erp_usuario',
          as: 'teste2',
          foreignKey: 'usu_cod'
      });
    };
  }


  
}




module.exports = erp_fornecedor_usuario;