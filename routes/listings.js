const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const {isLoggedIn, isOwner, validateListing} = require("../middlewares.js");
const listingsController = require("../controllers/listings.js");
const {storage} = require("../cloudConfig.js");
const multer  = require('multer');
const upload = multer({storage});

router
.route("/")
.get(wrapAsync(listingsController.index))
.post(isLoggedIn, upload.single("listing[image]"), listingsController.createNewListing);

// * New Route
router.get("/new",isLoggedIn, listingsController.renderNew);
router.post("/category", listingsController.filter);


router
.route("/:id")
.get(wrapAsync(listingsController.showListing))
.put(isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingsController.updateListing))
.delete(isLoggedIn, isOwner, wrapAsync(listingsController.destroyListing));

// * Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingsController.editListing));

module.exports = router;