import {app} from "./index";
import { HTTP_PORT } from "@repo/config/config";

console.log(HTTP_PORT)

app.listen(HTTP_PORT, ()=>{
    console.log(`Server is running on port ${HTTP_PORT}`);
})