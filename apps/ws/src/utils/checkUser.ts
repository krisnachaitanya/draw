import { JWT_SECRET } from "@repo/config/config";
import { JwtPayload, verify } from "jsonwebtoken";

export const checkUser = (token: string)=>{
  try{
  if(!token) {
    return null;
  }
  const decoded = verify(token,JWT_SECRET);
  
  if(!decoded){
    return null;
  }
  
  return (decoded as JwtPayload).id;
  }catch(err){
    return null;
  }
}

export default checkUser;