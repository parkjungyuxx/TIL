import fs from "fs";
import fetch from "node-fetch";

// 네이버 API 인증 정보
const CLIENT_ID = "1vj33hwfl6";
const CLIENT_SECRET = "G31hXGXj3DbkQYewkVeROugAH6vcVHgPTeHj2HYM";

// 검색어와 저장 파일 경로
const QUERY = "동물병원";
const OUTPUT_FILE = "./public/data/animal_hospitals.json"; // 지도에서 참조할 JSON 파일

// API를 호출하여 동물병원 데이터를 가져오는 함수
const fetchHospitals = async () => {
  const url = `https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(
    QUERY
  )}&display=10`;

  try {
    const response = await fetch(url, {
      headers: {
        "X-Naver-Client-Id": CLIENT_ID,
        "X-Naver-Client-Secret": CLIENT_SECRET,
      },
    });

    if (!response.ok) {
      throw new Error(`API 호출 실패: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.items && data.items.length > 0) {
      // 응답 데이터를 JSON 파일로 저장
      fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data.items, null, 2), "utf8");
      console.log(`동물병원 데이터를 ${OUTPUT_FILE} 파일에 저장했습니다.`);
    } else {
      console.log("검색 결과가 없습니다.");
    }
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error.message);
  }
};

fetchHospitals();
