import {
  NaverMap,
  Marker,
  useNavermaps,
  Container as MapDiv,
} from "react-naver-maps";

const Map = () => {
  const navermaps = useNavermaps();

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
