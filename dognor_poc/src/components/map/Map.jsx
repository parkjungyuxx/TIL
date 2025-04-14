import React, { useState, useEffect } from "react";
import {
  NaverMap,
  Marker,
  useNavermaps,
  Container as MapDiv,
} from "react-naver-maps";
import map_pin from "../map/map_pin.jpg";

const Map = () => {
  const navermaps = useNavermaps();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("위치 가져올수 없삼:", error);
          setLocation({ lat: 37.3595704, lng: 127.105399 }); // 네이버 본사 위치
        }
      );
    } else {
      console.error("현재 위치를 가져올수 없삼.");
      setLocation({ lat: 37.3595704, lng: 127.105399 }); // 네이버 본사 위치
    }
  }, []);

  if (!location) {
    return <div>Loading map...</div>;
  }

  return (
    <MapDiv style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <NaverMap
        defaultCenter={new navermaps.LatLng(location.lat, location.lng)}
        defaultZoom={18}
        style={{ width: "100vw", height: "100vh" }}
      >
        <Marker
          position={new navermaps.LatLng(location.lat, location.lng)}
          title="My Location"
          icon={map_pin}
        />
      </NaverMap>
    </MapDiv>
  );
};

export default Map;
