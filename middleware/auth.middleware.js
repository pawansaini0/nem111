const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, "masai");
      if (decoded) {
        req.body.user = decoded.user;
        req.body.userID = decoded.userID;
        console.log(decoded);
        next();
      } else {
        res.status(200).json({ msg: "not authorized" });
      }
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  } else {
    res.json({ msg: "please login first!" });
  }
};

module.exports = {
  auth,
};
