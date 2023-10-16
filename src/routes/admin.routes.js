const { Router } = require("express")
const AdminController = require("../controllers/AdminController")
const adminRouter = Router()

const adminController = new AdminController()

adminRouter.post('/', adminController.create)

module.exports = adminRouter