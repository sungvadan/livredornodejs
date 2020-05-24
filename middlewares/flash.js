let flash = function (req, res, next) {
    if (req.session.flash === undefined) {
        req.session.flash = {}
    }
    if (req.session.flash.error !== undefined && req.session.flash.error !== '') {
        res.locals.error = req.session.flash.error
        req.session.flash.error = undefined
    }
    next()
}

module.exports = flash