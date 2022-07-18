const router = require("express").Router();
const User = require("../models/User");

//get a user
router.get("/:email", async (req, res) => {
  try {
    const user = await User.findOne({username: req.params.email});
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
