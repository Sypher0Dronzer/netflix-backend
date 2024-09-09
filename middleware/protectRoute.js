export async function protectRoute(req,res,next) {
    console.log("User:", req.user);
  console.log("Session:", req.session);
    if(req.isAuthenticated() )
        return next()
    else 
    return res.status(400).json({success:false,message:"You are not signed in. SignIn to access the features!",user:req.user})
}