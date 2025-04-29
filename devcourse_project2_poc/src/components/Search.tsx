import { useEffect, useState } from "react";
import axios from "axios";

interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
}

interface Track {
  id: string;
  name: string;
  album: { images: { url: string }[] };
  artists: { name: string }[];
}

export default function Search() {
  const [accessToken, setAccessToken] = useState("");
  const [searchType, setSearchType] = useState<"artist" | "track">("artist");
  const [inputValue, setInputValue] = useState("");
  const [artistResults, setArtistResults] = useState<Artist[]>([]);
  const [trackResults, setTrackResults] = useState<Track[]>([]);
  const [selectedItem, setSelectedItem] = useState<Artist | Track | null>(null);

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
    const searchSpotify = async () => {
      if (!inputValue) return;
      if (!accessToken) return;

      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/search",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              q: inputValue,
              type: searchType,
              limit: 5,
            },
          }
        );

        if (searchType === "artist") {
          setArtistResults(response.data.artists.items);
          setTrackResults([]);
        } else if (searchType === "track") {
          setTrackResults(response.data.tracks.items);
          setArtistResults([]);
        }
      } catch (error) {
        console.error("Failed to search Spotify", error);
      }
    };

    const timer = setTimeout(() => {
      searchSpotify();
    }, 500); 

    return () => clearTimeout(timer);
  }, [inputValue, searchType, accessToken]);

  const handleSelect = (item: Artist | Track) => {
    setSelectedItem(item);
    console.log("선택된 데이터:", item);
    setInputValue(""); 
    setArtistResults([]);
    setTrackResults([]);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="flex gap-2 mb-4">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value as "artist" | "track")}
          className="border p-2"
        >
          <option value="artist">가수 검색</option>
          <option value="track">노래 검색</option>
        </select>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border p-2 w-full"
          placeholder={searchType === "artist" ? "가수 이름 입력" : "노래 제목 입력"}
        />
      </div>

      {inputValue && (artistResults.length > 0 || trackResults.length > 0) && (
        <ul className="border rounded bg-white max-h-60 overflow-y-auto">
          {artistResults.map((artist) => (
            <li
              key={artist.id}
              onClick={() => handleSelect(artist)}
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
          {trackResults.map((track) => (
            <li
              key={track.id}
              onClick={() => handleSelect(track)}
              className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
            >
              <img
                src={track.album.images[0]?.url || "https://via.placeholder.com/40"}
                alt={track.name}
                className="w-10 h-10 rounded object-cover"
              />
              <div>
                <div className="font-medium">{track.name}</div>
                <div className="text-sm text-gray-500">{track.artists.map((a) => a.name).join(", ")}</div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {selectedItem && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <h3 className="font-bold mb-2">선택된 데이터</h3>
          <pre className="text-xs">{JSON.stringify(selectedItem, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
