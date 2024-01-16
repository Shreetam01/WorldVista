const { getPosts ,createPost ,getPostsById ,removePost ,removeWatchListPost ,getPostsByParamId } = require("../services/post.service");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

module.exports = {
  getPostsDetails: (req, res) => {
    const body = req.body;
    getPosts((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  createNewPost: (req,res)=>{
    const body = req.body;
    createPost(body, (err,results) => {
        if(err){
            console.log(err);
            return res.status(500).json({
                success:0,
                msg:"DB CONNECTION ERROR"
            })
        }
        return res.status(200).json({
            success:1,
            data: results
        })
    })
},
getPostsByUserId: (req,res)=>{
  const body = req.body;
  getPostsById(body, (err,results) => {
      if(err){
          console.log(err);
          return res.status(500).json({
              success:0,
              msg:"DB CONNECTION ERROR"
          })
      }
      return res.status(200).json({
          success:1,
          data: results
      })
  })
},
removePostDetails: (req,res)=>{
  const body = req.body;
  removePost(body, (err,results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        msg: "DB CONNECTION ERROR",
      });
    } else {
      if (results.affectedRows === 1) {
        removeWatchListPost(body, (insertErr, insertResults) => {
          if (insertErr) {
            console.log(insertErr + "controller");
            return res.status(500).json({
              success: 0,
              msg: "DB CONNECTION ERROR",
            });
          }
          return res.status(200).json({
            success: 1,
            msg: "You are now Registered",
            data: insertResults,
          });
        });
      } else {
        return res.status(401).send("Invalid Post Id");
      }
    }
  })
},
getPostDetailssByParamId: (req,res)=>{
  const body = req.body;
  getPostsByParamId(body, (err,results) => {
      if(err){
          console.log(err);
          return res.status(500).json({
              success:0,
              msg:"DB CONNECTION ERROR"
          })
      }
      return res.status(200).json({
          success:1,
          data: results
      })
  })
},
};
