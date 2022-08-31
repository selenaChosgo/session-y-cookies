module.exports = (req, res, next) => {
    if(typeof req.cookies !== "undefined"){
        if (req.cookies.cookie) {
            req.session.usuario = req.cookies.cookie;
        }
        next()
    }
}