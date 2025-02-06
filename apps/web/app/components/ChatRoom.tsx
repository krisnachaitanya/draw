import axios from "axios"
import { BACKEND_URL } from "../config"

async function getChats(id: string){
  const res = await axios.get(`${BACKEND_URL}/${id}`)
    return res.data.messages;  
}

export default async function ChatRoom({id}: {
    id: string
}){
    const messages = await getChats(id)
}