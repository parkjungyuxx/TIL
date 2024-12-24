import {
  NaverMap,
  Marker,
  useNavermaps,
  Container as MapDiv,
} from "react-naver-maps";

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
          console.error("Error fetching location:", error);
          setLocation({ lat: 37.3595704, lng: 127.105399 }); 
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLocation({ lat: 37.3595704, lng: 127.105399 }); 
    }
  }, []);

  if (!location) {
    return <div>Loading map...</div>; 
  }

  return (
    <MapDiv style={{ width: "1200px", height: "1200px", position: "relative" }}>
      {" "}
      {/* MapDiv 스타일 필수 */}
      <NaverMap
        defaultCenter={new navermaps.LatLng(37.3595704, 127.105399)} // 지도 중심 좌표
        defaultZoom={14} // 줌 레벨
      >
        <Marker
          defaultPosition={new navermaps.LatLng(37.3595704, 127.105399)} // 마커 위치
        />
      </NaverMap>
    </MapDiv>
  );
};

export default Map;
