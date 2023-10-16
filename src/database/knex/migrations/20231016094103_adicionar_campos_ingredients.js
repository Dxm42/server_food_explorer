exports.up = knex => knex.schema.createTable("ingredients", table =>{ 
  table.increments('id').primary() 
  table.string('name').notNullable();  

  table.integer("dishes_id").references("id").inTable("dishes").onDelete("CASCADE")
  table.integer("admin_id").references("id").inTable("admin")
})

exports.down = knex => knex.schema.dropTable("ingredients")
