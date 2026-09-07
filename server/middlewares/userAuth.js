import jwt from 'jsonwebtoken';


// User authorization middleware
const userAuth = async (req, res, next) => {
  try {
    const  {token}  = req.headers;
    
    
    if (!token) {
      return res.status(401).json({ success: false, message: 'User not authorized' });
    }

    // Verify the token
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    

    // Attach user ID to the request body
  
    req.userId = tokenDecode.id;
   


    // Proceed to the next middleware
    next();
  } catch (error) {
    console.error(error.message);
    res.status(403).json({ success: false, message: error.message });
  }
};



export default userAuth;
