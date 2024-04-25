const express = require('express')
const userController = require("../controller/userController")
const middleware = require("../middleware/routerSpecific")

const router = new express.Router()

// get all rides

//router.get("/allrides",userController.allRides)

// get all rehome

//router.get("/allRehome",userController.allRehome)

// get user details

router.get("/userDetails",middleware.signInMiddleware,userController.userDetails)

// add rides 

router.post("/addride",middleware.signInMiddleware,userController.addRide)

// add rehome

router.post("/addRehome",middleware.signInMiddleware,userController.addRehome)

// update rehome

router.put("/updateRehome",middleware.signInMiddleware,userController.rehomeUpdate)

// update name

router.put("/updateName",middleware.signInMiddleware,userController.nameUpdate)

// update phone

router.put("/updatePhone",middleware.signInMiddleware,userController.phoneUpdate)

// update email

router.put("/updateEmail",middleware.signInMiddleware,userController.emailUpdate)

// cancel ride

router.put("/rideCancel",middleware.signInMiddleware,userController.cancelRide)

// cancel rehome

router.put("/rehomeCancel",middleware.signInMiddleware,userController.cancelRide)

// sign up

router.post("/signup",userController.signup)

// sign in

router.post("/signin",userController.signin)

module.exports = router