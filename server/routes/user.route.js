const {
  logInUser,
  getUserProfileInfo,
  fetchWatchListInformation,
  addWatchListInformation,
  addProfileInformation,
  availableSellerById,
  dltFrmWatchListInformation,
  getUserName,
} = require("../controller/user.contoller");
const router = require("express").Router();
var jwt = require("jsonwebtoken");

router.post("/", availableSellerById);
router.post("/login",logInUser);
router.post("/getUserName",getUserName);
router.post("/profileInfo", getUserProfileInfo);
router.post("/fetchWatchListInformation", fetchWatchListInformation);
router.post("/addWatchListInformation", addWatchListInformation);
router.post("/dltFrmWatchListInformation", dltFrmWatchListInformation);
router.post("/addProfileInformation", addProfileInformation);

module.exports = router;
