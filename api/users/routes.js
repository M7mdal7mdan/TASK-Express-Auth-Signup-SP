const express = require("express");
const router = express.Router();
const {
     signUp
} = require("./controllers")

//param meddileware




// create user
router.post("/signup", signUp);




module.exports = router