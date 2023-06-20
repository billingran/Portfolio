const router = require("express").Router();
const homePageController = require("../controllers/home_controller");

//Home page
router.get("/", homePageController.homePage);

//Home page post
router.post("/formhandler", homePageController.homePagePost);

module.exports = router;
