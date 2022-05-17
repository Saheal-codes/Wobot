const router = require("express").Router();
const productcontroller = require("../controllers/productcontroller");
const usercontroller = require("../controllers/usercontroller");
const authmiddleware = require("../middleware/authmiddleware");


//Upload Handling
const multer = require("multer");
const csvUploader = multer({ dest: "uploads/" });

//User Routes
router.post("/signup", usercontroller.signup);
router.post("/login", usercontroller.login);
router.get("/users", authmiddleware.verifytoken, usercontroller.fetch_user_list);
router.get("/users/:id", authmiddleware.verifytoken, usercontroller.fetch_user_details);
router.get("/getallProducts/", authmiddleware.verifytoken, productcontroller.fetchproductlist);
router.post("/products/upload", csvUploader.any(), authmiddleware.verifytoken, productcontroller.upload_products);

module.exports = router;
