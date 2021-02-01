const sha1 = require("sha1");
const dbClient = require("../utils/db");

/**
 * postNew - callback for route POST /users
 */
async function postNew(req, res) {
  const { email, password } = req.body;

  if (!email) res.status(400).json({ error: "Missing email" });
  if (!password) res.status(400).json({ error: "Missing password " });

  // check if email already exists in db
  const found = await dbClient.client
    .collection("users")
    .find({ email })
    .count();
  if (found > 0) return res.status(400).json({ error: "Already exist" });
  // encrypt password and insert user in datbase
  const user = await dbClient.client
    .collection("users")
    .insertOne({ email, password: sha1(password) });
  if (user)
    res.status(201).json({ id: user.ops[0]._id, email: user.ops[0].email });
  else res.status(500).json({ error: "Could not create user" });
}

module.exports = { postNew };
