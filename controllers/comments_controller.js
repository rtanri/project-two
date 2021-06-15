const { CommentModel } = require("../models/comment_model");
const { UserModel } = require("../models/user_model");
const { PostModel } = require("../models/post_model");

module.exports = {
  createLike: async (req, res) => {
    console.log(req.body.liked);
    // validate
    const loginUser = req.session.user;

    PostModel.findOne({ _id: req.body.liked })
      .then(postResp => {
        if (!postResp) {
          res.redirect("/beautylash/customers");
        }
        console.log("1 - finding 1 photo");
        console.log(postResp);

        return CommentModel.create({
          email: loginUser.email,
          post_id: req.body.liked,
          like: true,
        });
      })
      .then(createResp => {
        console.log(2);
        console.log(createResp);
        res.redirect("/beautylash/customers/" + req.body.liked);
        return;
      })
      .catch(err => {
        res.redirect("/beautylash/customers");
      });
  },
  createComment: async (req, res) => {
    console.log(req.body.commented);
    // validate
    const loginUser = req.session.user;

    PostModel.findOne({ _id: req.body.commented })
      .then(postResp => {
        if (!postResp) {
          res.redirect("/beautylash/customers");
        }
        console.log(1);
        console.log(postResp);

        return CommentModel.create({
          email: loginUser.email,
          post_id: req.body.commented,
          comment_content: req.body.comment,
        });
      })
      .then(createResp => {
        console.log(2);
        console.log(createResp);
        res.redirect("/beautylash/customers/" + req.body.commented);
        return;
      })
      .catch(err => {
        res.redirect("/beautylash/customers");
      });
  },
};
