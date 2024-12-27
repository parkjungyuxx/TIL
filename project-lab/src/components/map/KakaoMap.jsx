import { useEffect, useState } from "react";
import { MapMarker, Map } from "react-kakao-maps-sdk";
import map_pin from "../map/map_pin.jpg";
import dog from "../map/dog.png";
import pin from "../map/pin.png";

export default function KakaoMap() {
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [userLocation, setUserLocation] = useState(null); // 초기 위치를 null로 설정
  const [userCurrentDong, setUserCurrentDong] = useState(null);

  // 현재 위치 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(position);
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          setUserLocation({ lat: 37.566826, lng: 126.9786567 });
        }
      );
    } else {
      setUserLocation({ lat: 37.566826, lng: 126.9786567 }); // 기본 위치 설정
    }
  }, []);

  // 검색 결과로 마커 생성
  useEffect(() => {
    if (!map || !userLocation) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch("명일동 동물병원", (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        const markers = data.map((place) => {
          bounds.extend(new kakao.maps.LatLng(place.y, place.x));
          return {
            position: {
              lat: place.y,
              lng: place.x,
            },
            content: place.place_name,
          };
        });

        setMarkers(markers);
        map.setBounds(bounds); // 검색 결과에 맞게 지도 범위 설정
      }
    });
  }, [map, userLocation]);

  // 지도 렌더링
  return (
    userLocation && ( // 사용자 위치를 가져온 후에만 지도 표시
      <Map
        center={userLocation} // 사용자의 현재 위치를 지도 중심으로 설정
        style={{
          width: "800px",
          height: "1200px",
        }}
        level={2}
        onCreate={setMap}
      >
        <MapMarker
          image={{
            src: dog,
            size: { width: 64, height: 64 },
            options: { offset: { x: 32, y: 64 } },
          }}
          position={{
            // 마커가 표시될 위치입니다
            lat: userLocation.lat,
            lng: userLocation.lng,
          }}
        />
        {markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            image={{
              src: pin,
              size: { width: 24, height: 24 },
              options: { offset: { x: 32, y: 64 } },
            }}
            onClick={() => setInfo(marker)}
          >
            {info && info.content === marker.content && (
              <div style={{ color: "#000" }}>{marker.content}</div>
            )}
          </MapMarker>
        ))}
      </Map>
    )
  );
}
