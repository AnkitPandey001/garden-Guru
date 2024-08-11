const express = require('express');
const fs = require('fs');
const requireLogin = require("../middleware/requireLogin");
const router = express.Router();
const COMMUNITY = require('../models/community')
  
router.post("/createComminty",requireLogin, (req, res) => {
  const { title,desc } = req.body;
  if (!desc ||!title) {
    return res.status(422).json({ error: "Please enter all fields" });
  } else {
    req.user;
    const post = new COMMUNITY({
      title,
      desc,
      postedBy: req.user,
    });
    post
      .save()
      .then((result) => {
        return res.json({ post: result });
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

router.get('/mycommunities', requireLogin, (req, res) => {
  COMMUNITY.find({ postedBy: req.user._id })
    .populate('postedBy', '_id name')
    .then(myCommunities => {
      res.json({ myCommunities });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get('/allcommunities', (req, res) => {
  COMMUNITY.find()
    .populate('postedBy', '_id name')
    .then(allCommunities => {
      res.json({ allCommunities });
    })
    .catch(err => {
      console.log(err);
    });
});

router.post('/addpost', requireLogin, (req, res) => {
  const { title, desc,pic,communityId } = req.body;
  if (!title || !desc || !pic|| !communityId) {
    return res.status(422).json({ error: 'Please add all the fields' });
  }

  const post = {
    title,
    desc,
    image:pic,
    postedBy: {
      _id: req.user._id,
      name: req.user.name
    }
  };

  COMMUNITY.findByIdAndUpdate(
    communityId,
    { $push: { posts: post } },
    { new: true }
  )
    .populate('postedBy', '_id name')
    .then(updatedCommunity => {
      res.json({ updatedCommunity });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;


