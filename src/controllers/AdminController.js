const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")

class AdminController {
  async create(request, response){
    console.log("admin create")
    return response.status(200).json()
  }

  async update(request, response){

    console.log("admin update")
    return response.status(200).json()
  }
  
}

module.exports = AdminController