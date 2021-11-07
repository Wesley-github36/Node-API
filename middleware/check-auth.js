const jwt = require("jsonwebtoken");

function checkAuth(req, res, next) {
    const token = req.header("auth-token");
    if (!token) return  res.status(401).json({
        message: "Access Denied"
    });

    try {
        req.userData = jwt.verify(token, "secret");
        // res.send(decodedToken);
        next();
    }catch (e) {
        res.status(400).json({
            message: "Invalid or expired token provided",
            error: e
        })
    }
}

module.exports = {
    checkAuth: checkAuth
}