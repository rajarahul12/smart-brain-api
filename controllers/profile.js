const handleProfileGet = (req, res, db) => {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where({
      id: id
    })
    .then(user => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("not found");
      }
    })
    .catch(err => {
      res.status(400).json("error getting user");
    });
};

const handleProfileUpdate = (req, res, db) => {
  // console.log(req.body.formInput);
  const { id } = req.params;
  const { name } = req.body.formInput;
  db("users")
    .where({ id })
    .update({ name })
    .then(resp => {
      if (resp) {
        res.json("success");
      } else {
        res.status(400).json("unable to update");
      }
    })
    .catch(err => res.status(400).json("Error updating user"));
};

module.exports = {
  handleProfileGet: handleProfileGet,
  handleProfileUpdate: handleProfileUpdate
};
