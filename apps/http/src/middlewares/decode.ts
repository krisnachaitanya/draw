import { verify } from "jsonwebtoken"

const decode = (encoded: string)=>{
    return verify(encoded, process.env.JWT_SECRET || "");
}

export default decode;