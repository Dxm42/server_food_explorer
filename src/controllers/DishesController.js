const knex = require("../database/knex")

class DishesController{
  async create(request, response){
    const { name, description, category, ingredients, price, image } = request.body

    const{ id } = request.params    
       
    
    await knex("dishes").insert({
      id_admin: id,
      name,
      description,
      category,      
      price,
      image
    })
    
    const ingredientsInsert = ingredients.map(name => {
      return {
        dishes_id: id,
        admin_id: id,
        name: name
      }
    })
   
    await knex("ingredients").insert(ingredientsInsert)
    

   response.json()
  }

  async show(request, response){
    const{ id } = request.params
    const dishes = await knex("dishes").where({id}).first()
    const ingredients = await knex("ingredients").where({dishes_id:id}).orderBy("name")
    return response.json({
      dishes,
      ingredients
    })
  }

  async delete(request, response){
    const { id } = request.params

    await knex("dishes").where({id}).delete()   
    await knex("ingredients").where({dishes_id:id}).delete()   

    return response.json()
  }
}


module.exports = DishesController