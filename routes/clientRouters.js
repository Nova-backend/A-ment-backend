const express = require("express");
// const getUser  = require('../controllers/ManageController')
// const updateUser  = require('../controllers/ManageController')
// const deleteUser=require('..//controllers/ManageController')

<<<<<<< HEAD
const { signUp, login } = require("../contollers/clientUser");
=======
const {signUp,login}=require('../contollers/clientUser')
// const {}=require('../contollers/')
>>>>>>> 7cad049 (working on controllers)

const router = express.Router();

router.post("/create", createUser);
router.get("/find", findUser);
router.get("/display/:id", getUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
router.post("/register", signUp);
router.post("/login", login);

module.exports = router;
