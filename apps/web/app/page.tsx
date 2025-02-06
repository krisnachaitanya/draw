"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Home = () => {
  const [slug, setSlug] = useState("");
  const router = useRouter();
  const handleRoomJoin = async () => {
    router.push(`/room/${slug}`);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Room Id"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
      />
      <button onClick={handleRoomJoin}>Join Room</button>
    </div>
  );
};

export default Home;
