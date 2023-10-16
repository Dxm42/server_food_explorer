const knex = require("../database/knex")

class DishesController{
  async create(request, response){
    const { id_admin, name, description, category, ingredients, price, image } = request.body

    const{ id } = request.params    
       
    
    await knex("dishes").insert({
      id_admin,
      name,
      description,
      category,      
      price,
      image
    })

    console.log(id)
    const ingredientsInsert = ingredients.map(name => {
      return {
        dishes_id: id,
        admin_id: id_admin,
        name: name
      }
    })

    console.log(id)
    await knex("ingredients").insert(ingredientsInsert)
    

   response.json()
  }

  async show(request, response){
    const{ id } = request.params
    const dishes = await knex("dishes").where({id}).first()
    const ingredients = await knex("ingredients").where({id}).orderBy("name")
    return response.json({
      dishes,
      ingredients
    })
  }

  async delete(request, response){
    const { id } = request.params

    await knex("dishes").where({id}).delete()   

    return response.json()
  }
}


module.exports = DishesController