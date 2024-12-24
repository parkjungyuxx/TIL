import React, { useState, useEffect } from "react"; // useState와 useEffect를 React에서 가져오기
import { NaverMap, Marker, useNavermaps, Container as MapDiv } from "react-naver-maps";

const Map = () => {
  const navermaps = useNavermaps();
  const [location, setLocation] = useState(null); // 초기 상태 설정

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error fetching location:", error);
          setLocation({ lat: 37.3595704, lng: 127.105399 }); // 기본 위치
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLocation({ lat: 37.3595704, lng: 127.105399 }); // 기본 위치
    }
  }, []);

  if (!location) {
    return <div>Loading map...</div>;
  }

  return (
    <MapDiv style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <NaverMap
        defaultCenter={new navermaps.LatLng(location.lat, location.lng)}
        defaultZoom={14}
        style={{ width: "100vw", height: "100vh" }}
      >
        <Marker
          position={new navermaps.LatLng(location.lat, location.lng)}
          title="My Location"
        />
      </NaverMap>
    </MapDiv>
  );
};

export default Map;
