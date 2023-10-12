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
   
    await database.run("INSERT INTO users(name, email, password) VALUES (?, ?, ?)",[name, email, hashedPassword])

    return response.status(201).json()
  }

  async update(request, response){
    const { name, email, password, old_password } = request.body
    const { id } = request.params

    const database = await sqliteConnection()

    const user  = await database.get("SELECT * FROM users WHERE id = (?)", [id])

    if(!user){
      throw new AppError("Usuário não foi encontrado")
    }

  const userUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)",[email])

  if(userUpdatedEmail && userUpdatedEmail.id !== user.id){
    throw new AppError("Este email já está em uso")
  }
  user.name = name ?? user.name;
  user.email = email ?? user.email;


  if(password && !old_password){
    throw new AppError("Você precisa  informas a  senha antiga")
  }

  if(password && old_password){
    const checkOutPassword = await bcrypt.compare(old_password, user.password)          
      
    if(!checkOutPassword){     
        throw new AppError("A senha antiga não confere")  
    }

    user.password = await bcrypt.hash(password, 8)
}


  await database.run(`
  UPDATE users SET
  name = ?,
  email = ?,
  password = ?,
  updated_at = DATETIME('now')
  WHERE  id = ?
  `,[user.name, user.email,user.password, id])

  return response.status(200).json()
  }
}

module.exports = UserController