const { Router } = require("express")

const routes = Router()

const usersRoutes = require("./users.routes")
const adminRouter = require("./admin.routes")
const dishesRoutes = require("./dishes.routes")

routes.use("/users", usersRoutes)
routes.use("/admin", adminRouter)
routes.use("/dishes", dishesRoutes)

module.exports = routes