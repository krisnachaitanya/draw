import axios from "axios"
import { BACKEND_URL } from "../../config"

async function getRoom(slug: string) {
    const res = await axios.get(`${BACKEND_URL}/room/${slug}`)
    const roomId = res.data.id;
    return roomId;
}

export default async function Room({params}: {
    params: {
        slug: string;
    };
}){
    const slug = params.slug;
    const roomId = await getRoom(slug);

}
