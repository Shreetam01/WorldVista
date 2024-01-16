const pool = require("../config/database");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

module.exports = {
    getPosts: callback => {
        pool.query(
            'SELECT img, description, id, location, title, postdetails.uid, username, DATE_FORMAT(postdetails.date, "%d - %M - %Y") AS date FROM postdetails INNER JOIN user ON postdetails.uid = user.uid ORDER BY id DESC',
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },


    createPost:(data, callback) => {

        const decodedToken = jwt.verify(data.token, 'my_secret_key');
        const uid = decodedToken.usr.id;
        const currentDate = new Date();
        pool.query(
            'INSERT INTO postdetails(title, description, location, tag, img, date, uid) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [
                data.title,
                data.desc,
                data.location,
                data.tag,
                data.img,
                currentDate,
                uid,
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getPostsById:(data, callback) => {
        const decodedToken = jwt.verify(data.token, 'my_secret_key');
        const uid = decodedToken.usr.id;
        
        pool.query(
            'SELECT * FROM postdetails INNER JOIN user ON postdetails.uid = user.uid And postdetails.uid =?',
            [uid],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    removePost:(data, callback) => {
        pool.query(
            'DELETE FROM postdetails WHERE postdetails.id =?',
            [data.postId],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    removeWatchListPost:(data, callback) => {
        pool.query(
            'DELETE FROM watchlist WHERE watchlist.postid =?',
            [data.postId],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getPostsByParamId:(data, callback) => {
        pool.query(
            'SELECT img, description, id, location, title, postdetails.uid, username, DATE_FORMAT(postdetails.date, "%d-%M-%Y") AS date FROM postdetails INNER JOIN user ON postdetails.uid = user.uid And postdetails.id =?',
            [data.id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
}