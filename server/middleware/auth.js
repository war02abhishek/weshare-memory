import jwt from 'jsonwebtoken'

//lets say user wants to like posts he will do like request -->It will come to auth middleware It confirms the request and give permission to perform next() what ever it is
//
const secret = "test";//pata kar?????
const auth=async(req,res,next)=>{

    try {
//we have to check user whether really is he which he claim to be 

    const token = req.headers.authorization.split(" ")[1];
   
    const isCustomAuth = token.length < 500;//to check whether token is of google or not // if it is google token its length must be greater than 500

    let decodedData;

    //code to get Id if we are working on our own token
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
    }
    //code to get Id if we are working on google token
    else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;//sub is id that can differnciate every google user
      
    }

    next();

        
    } catch (error) {
        console.log(error);
    }

}
export default auth;
