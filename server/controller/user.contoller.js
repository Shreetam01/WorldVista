const {
  logIn,
  getUserInfo,
  fetchWatchList,
  addWatchList,
  addProfileInfo,
  availableSeller,
  insertUser,
  dltFrmWatchList,
  checkWatchListData,
  getName,
} = require("../services/user.service");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
// const cookieParser = require('cookie-parser');

function ensureToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = {
  //get user information 
  getUserProfileInfo: (req, res) => {
    const body = req.body;
    getUserInfo(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          msg: "DB CONNECTION ERROR",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  //fetch watch list information
  fetchWatchListInformation: (req, res) => {
    const body = req.body;
    fetchWatchList(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          msg: "DB CONNECTION ERROR",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

    //insert watch list information
  addWatchListInformation: (req, res) => {
    const body = req.body;
    checkWatchListData(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          msg: "DB CONNECTION ERROR",
        });
      } 
      else {
        if (results && results[0].watchListCount === 0) {  
          addWatchList(body, (insertErr, insertResults) => {
            if (insertErr) {
              console.log(insertErr + "controller");
              return res.status(500).json({
                success: 0,
                msg: "DB CONNECTION ERROR",
              });
            }
            return res.status(200).json({
              success: 1,
              msg: "Item is added to WatchList",
              data: insertResults,
            });
          });
        } 
        else {
          return res.status(401).send("EmailId already exists");
        }
      }
    });
  },




  //dlt watch list details
  dltFrmWatchListInformation: (req, res) => {
    const body = req.body;
    dltFrmWatchList(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          msg: "DB CONNECTION ERROR",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  //add User Profile Info
  addProfileInformation: (req, res) => {
    const body = req.body;
    addProfileInfo(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          msg: "DB CONNECTION ERROR",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  logInUser: (req, res) => {
    const body = req.body;
    logIn(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          msg: "DB CONNECTION ERROR",
        });
      } else {
        if (results.length != 0) {
          const user = results[0];
          // console.log(user.uid);
          bcrypt.compare(
            body.password,
            user.password,
            (bcryptErr, passwordMatch) => {
              if (bcryptErr) {
                console.error("Bcrypt error:", bcryptErr);
                return res.status(500).send("Internal server error");
              }

              if (passwordMatch) {
                const usr = { id: user.uid };
                const token = jwt.sign({ usr }, "my_secret_key");
                res.cookie("jwtoken", token, { httpOnly: true });
                res.json({
                  user: user.uid,
                  userName: user.username,
                  token: token,
                });
              } else {
                res.status(401).send(" username or password");
              }
            }
          );
        } else {
          return res.status(401).send("Invalid email or password");
        }
      }
    });
  },

  //insert user
  availableSellerById: (req, res) => {
    const body = req.body;
  
    availableSeller(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          msg: "DB CONNECTION ERROR",
        });
      } 
      else {
        if (results && results[0].sellerCount === 0) {
          insertUser(body, (insertErr, insertResults) => {
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
        } 
        else {
          return res.status(401).json({
            msg: "EmailId already exists"});
        }
      }
    });
  },
  getUserName: (req, res) => {
    const body = req.body;
    getName(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          msg: "DB CONNECTION ERROR",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
};
