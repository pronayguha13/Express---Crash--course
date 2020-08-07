const express = require("express");

const router = express.Router();

const members = require("../../Members");

const uuid = require("uuid");

//get all members
router.get("/", (req, res) => {
  res.json(members);
});

//get single members
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: "Member not found" });
  }
});

//create member

router.post("/", (req, res) => {
  let newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "Please include name and email" });
  } else {
    members.push(newMember);
  }
  res.json(members);
});

//update a user

router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    // res.json(members.filter((member) => member.id === parseInt(req.params.id)));
    const updatedMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updatedMember.name ? updatedMember.name : member.name;
        member.email = updatedMember.email ? updatedMember.email : member.email;
        res.json({ msg: "Member updated", member });
      }
    });
  } else {
    res.status(400).json({ msg: "Member not found" });
  }
});

//Delete a user
router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: "Member deleted",
      members: members.filter(
        (member) => member.id !== parseInt(req.params.id)
      ),
    });
  } else {
    res.status(400).json({ msg: "Member not found" });
  }
});
module.exports = router;
