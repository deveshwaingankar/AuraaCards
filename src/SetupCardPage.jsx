import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function SetupCardPage() {
  const { userId } = useParams();
  const navigate   = useNavigate();
  const [uid, setUid]         = useState("");
  const [cardData, setCardData] = useState({ nickname: "", color: "" });
  const [linked, setLinked]     = useState(false);

  const handleLink = e => {
    e.preventDefault();
    // TODO: verify `uid` belongs to userId via API
    setLinked(true);
  };

  const handleSave = e => {
    e.preventDefault();
    // TODO: save cardData for this uid
    navigate("/dashboard"); // or wherever
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      {!linked ? (
        <form onSubmit={handleLink} className="w-full max-w-sm bg-white/10 backdrop-blur-md rounded-xl p-6 space-y-4">
          <h2 className="text-2xl font-bold text-center">Link Your Card</h2>
          <p className="text-sm text-gray-300">User ID: {userId}</p>

          <label className="block">
            <span className="text-sm">Card UID</span>
            <input
              value={uid}
              onChange={e => setUid(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-transparent border border-zinc-600 rounded focus:outline-none"
            />
          </label>

          <button
            type="submit"
            className="w-full py-2 bg-orange-500 text-black font-semibold rounded hover:bg-orange-600 transition"
          >
            Link Card
          </button>
        </form>
      ) : (
        <form onSubmit={handleSave} className="w-full max-w-sm bg-white/10 backdrop-blur-md rounded-xl p-6 space-y-4">
          <h2 className="text-2xl font-bold text-center">Setup Card Details</h2>
          <p className="text-sm text-gray-300">Card UID: {uid}</p>

          <label className="block">
            <span className="text-sm">Card Nickname</span>
            <input
              name="nickname"
              value={cardData.nickname}
              onChange={e => setCardData(d => ({ ...d, nickname: e.target.value }))}
              required
              className="mt-1 block w-full px-3 py-2 bg-transparent border border-zinc-600 rounded focus:outline-none"
            />
          </label>

          <label className="block">
            <span className="text-sm">Favorite Color</span>
            <input
              name="color"
              value={cardData.color}
              onChange={e => setCardData(d => ({ ...d, color: e.target.value }))}
              required
              className="mt-1 block w-full px-3 py-2 bg-transparent border border-zinc-600 rounded focus:outline-none"
            />
          </label>

          <button
            type="submit"
            className="w-full py-2 bg-orange-500 text-black font-semibold rounded hover:bg-orange-600 transition"
          >
            Save Card
          </button>
        </form>
      )}
    </div>
  );
}
