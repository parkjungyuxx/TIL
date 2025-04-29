import { useEffect, useState } from "react";
import axios from "axios";

interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
}

export default function ArtistSearch() {
  const [accessToken, setAccessToken] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [artistResults, setArtistResults] = useState<Artist[]>([]);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  useEffect(() => {
    const getAccessToken = async () => {
      const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
      const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
      const tokenUrl = "https://accounts.spotify.com/api/token";

      const body = new URLSearchParams();
      body.append("grant_type", "client_credentials");

      const basicToken = btoa(`${clientId}:${clientSecret}`);

      try {
        const response = await axios.post(tokenUrl, body, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${basicToken}`,
          },
        });
        setAccessToken(response.data.access_token);
      } catch (error) {
        console.error("Failed to get access token", error);
      }
    };

    getAccessToken();
  }, []);

  useEffect(() => {
    const searchArtists = async () => {
      if (!inputValue) return;

      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/search",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              q: inputValue,
              type: "artist",
              limit: 5,
            },
          }
        );
        setArtistResults(response.data.artists.items);
      } catch (error) {
        console.error("Failed to search artists", error);
      }
    };

    const timer = setTimeout(() => {
      searchArtists();
    }, 500); 

    return () => clearTimeout(timer);
  }, [inputValue, accessToken]);

  const handleSelectArtist = (artist: Artist) => {
    setSelectedArtist(artist);
    console.log("선택된 아티스트:", artist);
    setInputValue(""); 
    setArtistResults([]);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="border p-2 w-full"
        placeholder="가수 이름을 입력하세요"
      />
      {inputValue && artistResults.length > 0 && (
        <ul className="border rounded mt-2 max-h-60 overflow-y-auto bg-white">
          {artistResults.map((artist) => (
            <li
              key={artist.id}
              onClick={() => handleSelectArtist(artist)}
              className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
            >
              <img
                src={artist.images[0]?.url || "https://via.placeholder.com/40"}
                alt={artist.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span>{artist.name}</span>
            </li>
          ))}
        </ul>
      )}

      {selectedArtist && (
        <div className="mt-4">
          <h3 className="font-bold mb-2">선택한 아티스트:</h3>
          <div className="flex items-center gap-3">
            <img
              src={selectedArtist.images[0]?.url || "https://via.placeholder.com/40"}
              alt={selectedArtist.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <p className="text-lg">{selectedArtist.name}</p>
              <p className="text-sm text-gray-500">ID: {selectedArtist.id}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
