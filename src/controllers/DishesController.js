const knex = require("../database/knex")

class DishesController{
  async create(request, response){
    const {id_admin, name, description, category, ingredients, price, image } = request.body
       
    
    await knex("dishes").insert({
      id_admin,
      name,
      description,
      category,      
      price,
      image
    })

    const ingredientsInsert = ingredients.map(tag => {
      return {
        name: tag
      }
    })
    await knex("ingredients").insert(ingredientsInsert)
    

   response.json()
  }

}


module.exports = DishesController