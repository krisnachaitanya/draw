"use client";

import { useEffect } from "react";
import { useSocket } from "../hooks/useSocket";

export function ChatRoomClient({messages, id}: {
    messages: {message: string}[];
    id: string;
}){
    const {loading,socket} = useSocket();
    useEffect(()=>{
        
    },[socket, loading])
}