const express = require("express");
const router = express.Router();
const passport = require("passport");
const { Great } = require("./models");
const jwtAuth = passport.authenticate("jwt", { session: false });

router.get("/", jwtAuth, (req, res) => {
  let username = req.user.username;
  let findParam = {};
  findParam.userId = username;

  Great.find(findParam)
    .then(posts => {
      res.json(posts.map(post => post.serialize()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "something went terribly wrong" });
    });
});

router.get("/:id", jwtAuth, (req, res) => {
  Great.findById(req.params.id)
    .then(post => res.json(post.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "something went horribly awry" });
    });
});

router.post("/", jwtAuth, (req, res) => {
  const username = req.user.username;
  const requiredFields = ["daily", "great"];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  Great.create({
    userId: username,
    created: req.body.created,
    daily: req.body.daily,
    great: req.body.great
  })

    .then(daily => res.status(201).json(daily.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    });
});

router.delete("/:id", jwtAuth, (req, res) => {
  Journal.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).json({ message: "success" });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "something went terribly wrong" });
    });
});

router.put("/:id", (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    res.status(400).json({
      error: "Request path id and request body id values must match"
    });
  }

  const updated = {};
  const updateableFields = ["daily", "great"];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  Great.findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    .then(updatedDaily => res.status(204).end())
    .catch(err => res.status(500).json({ message: "Something went wrong" }));
});

router.delete("/:id", (req, res) => {
  Great.findByIdAndRemove(req.params.id).then(() => {
    console.log(`Deleted thankful with id \`${req.params.id}\``);
    res.status(204).end();
  });
});

router.use("*", function(req, res) {
  res.status(404).json({ message: "Not Found" });
});

module.exports = router;
