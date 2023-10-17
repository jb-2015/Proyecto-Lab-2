import {dev} from "./config-db"
import Sequelize from "sequelize"



const sequelize = new Sequelize(dev.database,dev.user,dev.password)


export default sequelize