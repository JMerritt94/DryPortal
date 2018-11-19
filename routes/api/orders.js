const router = require("express").Router();
const orderController = require("../../controllers/orderController");
const passport = require("passport");
require("../../config/passport")(passport);
// Matches with "/api/books"
router.get("/", passport.authenticate('jwt', { session: false }), function (req, res) {
  var token = getToken(req.headers);
  if (token) { orderController.findAll }
  else {
    return res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
})

  .post("/", passport.authenticate('jwt', { session: false }), function (req, res) {
    var token = getToken(req.headers);
    if (token) { orderController.create }
    else {
      return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
  })

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(orderController.findById)
  .put(orderController.update)

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;
