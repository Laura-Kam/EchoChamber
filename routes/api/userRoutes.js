// /api/users

const { User } = require("../../models");

// GET all users

app.get("/all-users", (req, res) => {
  User.find({}, (err, result) => {
    if (err) {
      res.status(500).send({ message: "Internal Server Error" });
    } else {
      res.status(200).json(result);
    }
  });
});

// GET a single user by its _id and populated thought and friend data

app.get("/find-user/:id", (req, res) => {
  User.findOne(
    {
      user: req.params.user_id, //correct syntax?
    },
    (err, result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        console.log("Uh Oh, something went wrong");
        res.status(500).json({ message: "something went wrong" });
      }
    }
  );
});

// POST/Create a new user:

app.post("/create", (req, res) => {
  db.collection("Echo-ChamberDB").insertOne(
    { username: req.body.username, email: req.body.email },
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});
