var express = require('express');
var router = express.Router();
const User = require("../Models/User")
/* GET users listing. */
router.get('/all', async function (req, res) {
  try {
    const users = await User.find().sort({ score: -1 })
    res.send(users)
  } catch (error) {
    res.sendStatus(400)
  }
});

router.get("/:id", async (req, res) => {

  try {
    const _id = req.params.id
    const user = await User.findOne({ _id })
    res.send(user)
  } catch (error) {
    res.sendStatus(400)
  }

})

router.put("/", async (req, res) => {

  try {
    const { user } = req.body
    const oldUser = await User.findOne({ email: user.email })
    if (oldUser && oldUser.score > user.score) {
      res.send("lower score")
      return
    }
    const updatedUser = await User.update({ email: user.email }, { ...user }, { upsert: true });
    res.json(updatedUser)
  } catch (error) {
    res.sendStatus(400)
  }
})

router.post("/", async (req, res) => {

  try {
    const { user } = req.body
    console.log(user, "user")
    const newUser = await User.create(user)
    res.json(newUser)
  } catch (error) {
    res.sendStatus(400)
  }
})





module.exports = router;
