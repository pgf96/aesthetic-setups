function requireAdmin(req,res,next) {
    const user = req.user
    if (user && user.roles.includes('admin')) {
        return next()
    } else {
        return res.status(401).json({message: 'unauthorized access'})
    }
}

function requireUser(req, res, next) {
    const user = req.user
    if (user.roles.includes('admin') || user.roles.includes('user')) {
        return next()
    } else {
        return res.status(401).json({message: 'unauthorized access'})
    }
}


module.exports = {
    requireAdmin, 
    requireUser,
}