import { useState, useEffect } from "react";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

// 요청 간격을 관리하기 위한 마지막 요청 시간 저장
let lastRequestTime = 0;

export default function Translator() {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastTranslated, setLastTranslated] = useState("");
  
  // 로컬 스토리지에서 이전 번역 결과 불러오기
  useEffect(() => {
    const savedTranslations = localStorage.getItem("translations");
    if (savedTranslations) {
      try {
        const translations = JSON.parse(savedTranslations);
        setLastTranslated(translations[0]?.text || "");
      } catch (e) {
        console.error("저장된 번역 결과를 불러오는데 실패했습니다.");
      }
    }
  }, []);

  // 지수 백오프를 포함한 대기 함수
  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  
  // 번역 캐시 확인
  const checkTranslationCache = (text: string): string | null => {
    try {
      const cacheStr = localStorage.getItem("translationCache");
      if (cacheStr) {
        const cache = JSON.parse(cacheStr);
        return cache[text] || null;
      }
    } catch (e) {
      console.error("캐시 확인 실패:", e);
    }
    return null;
  };
  
  // 번역 결과 캐시에 저장
  const saveToCache = (text: string, translation: string) => {
    try {
      const cacheStr = localStorage.getItem("translationCache");
      const cache = cacheStr ? JSON.parse(cacheStr) : {};
      cache[text] = translation;
      localStorage.setItem("translationCache", JSON.stringify(cache));
      
      // 최근 번역 기록 저장
      const translations = JSON.parse(localStorage.getItem("translations") || "[]");
      translations.unshift({ text, translation, date: new Date().toISOString() });
      if (translations.length > 10) translations.pop(); // 최대 10개만 저장
      localStorage.setItem("translations", JSON.stringify(translations));
    } catch (e) {
      console.error("캐시 저장 실패:", e);
    }
  };

  const translateText = async (text: string, retries = 3): Promise<string> => {
    // 캐시 확인
    const cachedTranslation = checkTranslationCache(text);
    if (cachedTranslation) {
      console.log("캐시에서 번역 결과를 찾았습니다.");
      return cachedTranslation;
    }
    
    // 너무 빠른 요청을 방지하기 위한 조절
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    const minWaitTime = 10000; // 최소 10초 간격
    
    if (timeSinceLastRequest < minWaitTime) {
      const waitTime = minWaitTime - timeSinceLastRequest;
      console.log(`API 요청 간격 유지를 위해 ${waitTime/1000}초 대기 중...`);
      await sleep(waitTime);
    }
    
    // 재시도 시 지수 백오프 적용
    const backoffTime = retries < 3 ? Math.pow(2, 3 - retries) * 5000 : 5000;
    
    // 최소 대기 시간
    await sleep(3000); 
    
    try {
      lastRequestTime = Date.now();
      
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Translate the given text naturally between Korean and English depending on the input language. Only return the translated text without any explanations or additional comments.",
          },
          {
            role: "user",
            content: text,
          },
        ],
        temperature: 0.2,
      });
      
      const translatedResult = response.choices[0].message.content?.trim() || "";
      
      // 번역 결과 캐시에 저장
      saveToCache(text, translatedResult);
      
      return translatedResult;
    } catch (error: any) {
      console.error("번역 오류:", error);
      
      if ((error.status === 429 || error.message?.includes("rate limit")) && retries > 0) {
        console.warn(`API 요청 제한 도달, ${backoffTime/1000}초 후 재시도... (남은 시도: ${retries-1})`);
        await sleep(backoffTime);
        return await translateText(text, retries - 1);
      } else {
        throw new Error("번역 실패: " + (error.message || "알 수 없는 오류"));
      }
    }
  };

  const handleTranslate = async () => {
    if (!inputText.trim() || loading) return;
    
    // 입력 텍스트가 너무 길면 분할 처리
    if (inputText.length > 500) {
      alert("텍스트가 너무 깁니다. 500자 이하로 나누어 번역해주세요.");
      return;
    }
    
    setLoading(true);
    try {
      const result = await translateText(inputText);
      setTranslatedText(result);
      setLastTranslated(result);
    } catch (error) {
      console.error("최종 번역 실패:", error);
      alert("번역에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Korean ↔ English Translator</h1>
      <textarea
        className="w-full max-w-2xl h-32 p-4 mb-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring focus:border-blue-300"
        placeholder="번역할 텍스트를 입력하세요... (최대 500자)"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        maxLength={500}
      />
      <div className="w-full max-w-2xl mb-4 flex justify-between">
        <span className="text-sm text-gray-500">{inputText.length}/500자</span>
        <button
          className="text-sm text-blue-500 hover:text-blue-700"
          onClick={() => setInputText("")}
          disabled={!inputText}
        >
          지우기
        </button>
      </div>
      <button
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 mb-8"
        onClick={handleTranslate}
        disabled={loading || !inputText.trim()}
      >
        {loading ? "번역 중..." : "번역하기"}
      </button>
      {translatedText && (
        <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow border mb-4">
          <h2 className="text-lg font-semibold mb-2">번역 결과</h2>
          <p className="text-gray-700 whitespace-pre-line">{translatedText}</p>
          <div className="mt-4 flex justify-end">
            <button
              className="text-sm text-blue-500 hover:text-blue-700"
              onClick={() => {
                navigator.clipboard.writeText(translatedText);
                alert("클립보드에 복사되었습니다.");
              }}
            >
              복사하기
            </button>
          </div>
        </div>
      )}
      {lastTranslated && !translatedText && (
        <div className="w-full max-w-2xl p-6 bg-gray-100 rounded-lg border mb-4">
          <h2 className="text-lg font-semibold mb-2">최근 번역</h2>
          <p className="text-gray-600 whitespace-pre-line">{lastTranslated}</p>
        </div>
      )}
    </div>
  );
}