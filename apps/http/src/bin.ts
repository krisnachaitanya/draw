import app from ".";
import { HTTP_PORT } from "@repo/config/config";

app.listen(HTTP_PORT, ()=>{
    console.log(`Server is running on port ${HTTP_PORT}`);
})