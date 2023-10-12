const bcrypt = require("bcrypt")
const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")


class UserController {
 async create(request, response){
    const { name, email, password, isAdmin } = request.body

    const database = await sqliteConnection()
    
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if(checkUserExists){
      throw new AppError("Este e-mail já está em uso")
    }

   
    const hashedPassword = await bcrypt.hash(password, 10)

    console.log(isAdmin)
    await database.run("INSERT INTO users(name, email, password) VALUES (?, ?, ?)",[name, email, hashedPassword])

    return response.status(201).json()
  }
}

module.exports = UserController