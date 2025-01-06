const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middlewares");
const reviewController = require("../controllers/reviews");

//* Post Review Route
router.post("/",validateReview, isLoggedIn, wrapAsync(reviewController.createReview));

// * Delete Review Route
router.delete("/:reviewId", isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;