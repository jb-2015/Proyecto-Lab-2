//config/database.js

const { Sequelize } = require('sequelize');



    const sequelize = new Sequelize('bd_sistlab', 'rootear', 'hola123', {
      host: 'localhost',
      dialect: 'mysql',
    },{
        define: {
            scopes:{
                excludeCreatedAtUpdateAt:{
                    attributes:{
                    exclude:['createdAt','updatedAt']
                },
                },
            },
            timestamps: false,
        }
    });
    

    
   module.exports= sequelize