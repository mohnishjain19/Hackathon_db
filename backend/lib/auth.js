exports.authorizeRoles =( ...roles)=>{
   
    return (req,res,next)=>{
            if(!roles.includes(req.user.role)){
                res.status(401).json({
                    error:`Role :${req.user.role} is not allowed to access this resource`
                })
    }
    next();
};
};

exports.roles = ["Manager" , "User"];