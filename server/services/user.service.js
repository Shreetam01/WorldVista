const pool = require("../config/database");

const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");


module.exports = {
   //get user info
    getUserInfo:(data, callback) =>{
        const decodedToken = jwt.verify(data.token, 'my_secret_key');
        const userId = decodedToken.usr.id;
        pool.query(
            'SELECT username ,headline ,address ,about FROM user INNER JOIN userdetails ON user.uid = userdetails.uid AND userdetails.uid = ?',
            [userId],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    //fetch WatchList
    fetchWatchList:(data, callback) => {
        const decodedToken = jwt.verify(data.token, 'my_secret_key');
        const userId = decodedToken.usr.id;
        pool.query(
            'SELECT postdetails.id as id, title, description, location, img, DATE_FORMAT(postdetails.date, "%d - %M - %Y") AS date FROM watchlist INNER JOIN postdetails ON watchlist.postid = postdetails.id AND watchlist.uid = ?',
            [
                userId
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    //check watchlist data
    checkWatchListData: (data, callback) => {
        const decodedToken = jwt.verify(data.token, 'my_secret_key');
        const userId = decodedToken.usr.id;
        pool.query(
          "SELECT COUNT(*) AS watchListCount FROM watchlist  WHERE uid=(?) AND postid =(?)",
          [userId, data.postId],
          (error, results, fields) => {
            if (error) {
              return callback(error);
            }
            return callback(null, results);
          }
        );
      },

    //add in watchList
    addWatchList:(data, callback) => {
        const decodedToken = jwt.verify(data.token, 'my_secret_key');
        const userId = decodedToken.usr.id;
        pool.query(
            'INSERT INTO watchlist (uid, postid ) VALUES (?, ?)',
            [
                userId,
                data.postId
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    //delete from watchList
    dltFrmWatchList:(data, callback) => {
        const decodedToken = jwt.verify(data.token, 'my_secret_key');
        const userId = decodedToken.usr.id;
        pool.query(
            'DELETE FROM watchlist WHERE watchlist.uid=(?) AND watchlist.postid =(?)',
            [
                userId,
                data.postId
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

     //add User Profile Info
     addProfileInfo:(data, callback) => {
        const decodedToken = jwt.verify(data.token, 'my_secret_key');
        const userId = decodedToken.usr.id;
        pool.query(
            'INSERT INTO userdetails (headline, address, about, uid) VALUES (?, ?, ?, ?)',
            [
                data.headline,
                data.address,
                data.about,
                userId,
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    //logIn
    logIn:(data, callback) => {
        pool.query(
            'SELECT * FROM user WHERE email = ?',
            [
                data.email
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
      },

      //inser User
      insertUser: (data, callback) => {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(data.password, salt);
        pool.query(
          "INSERT INTO user (username, email, originalPassword	, password, profile_img) VALUES( ?, ?, ?, ?, ?)",
          [
            data.username,
            data.email,
            data.password,
            hashPassword,
            data.profile_img
          ],
          (error, results, fields) => {
            if (error) {
              return callback(error);
            }
            return callback(null, results);
          }
        );
      },

      //check user
      availableSeller: (data, callback) => {
        pool.query(
          "SELECT COUNT(*) AS sellerCount FROM user WHERE email = ?",
          [data.email],
          (error, results, fields) => {
            if (error) {
              return callback(error);
            }
            return callback(null, results);
          }
        );
      },

      //get User Name 
      getName:(data, callback) => {
        const decodedToken = jwt.verify(data.token, 'my_secret_key');
        const userId = decodedToken.usr.id;
        pool.query(
            'SELECT username FROM user WHERE uid =(?)',
            [
                userId,
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
};
