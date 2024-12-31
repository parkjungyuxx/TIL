import { useEffect, useState } from "react";
import { MapMarker, Map } from "react-kakao-maps-sdk";
import dog from "../map/dog.png";
import pin from "../map/pin.svg";
import pin2 from "../map/pin2.svg";
import pin3 from "../map/pin3.svg";

export default function KakaoMap() {
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [userLocation, setUserLocation] = useState(null);
  const [roadName, setRoadName] = useState(null);

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

  useEffect(() => {
    if (!userLocation) return;

    const geocoder = new kakao.maps.services.Geocoder();
    const coord = new kakao.maps.LatLng(userLocation.lat, userLocation.lng);

    geocoder.coord2Address(coord.getLng(), coord.getLat(), (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const roadAddress = result[0].road_address
          ? result[0].road_address.address_name
          : "";
        // 도로명 주소
        setRoadName(roadAddress || "");
        console.log(roadName);
      } else {
        setRoadName("");
      }
    });
  }, [userLocation]);

  // 검색 결과로 마커 생성
  useEffect(() => {
    if (!map || !userLocation) return;
    const ps = new kakao.maps.services.Places();

    // `roadName`이 없으면 기본 검색어로 "동물병원"만 사용
    const searchKeyword = roadName ? `${roadName} 동물병원` : "고덕역 동물병원";

    ps.keywordSearch(searchKeyword, (data, status) => {
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
        // map.setBounds(bounds); // 검색 결과에 맞게 지도 범위 설정
        map.setLevel(3);
        console.log("검색 결과 마커:", markers);
      } else {
        console.error("검색 결과 없음");
        setMarkers([]); // 검색 실패 시 마커 초기화
      }
    });
  }, [map, userLocation, roadName]);

  return (
    userLocation && ( // 사용자 위치를 가져온 후에만 지도 표시
      <Map
        center={userLocation} // 사용자의 현재 위치를 지도 중심으로 설정
        style={{
          width: "800px",
          height: "1200px",
        }}
        level={1}
        onCreate={setMap}
      >
        <MapMarker
          image={{
            src: pin2, // pin3은 알아보기 힘듬
            size: { width: 32, height: 32 },
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
              size: { width: 64, height: 64 }, //
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
