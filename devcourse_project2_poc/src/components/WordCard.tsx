import { useState } from "react";

interface WordCardProps {
  word: string;
  meaning: string;
  example: string;
}

export default function WordCard({
  word,
  meaning,
  example,
}: WordCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div
        className="w-[400px] h-[220px] relative cursor-pointer"
        style={{ perspective: "1000px" }}
        onClick={() => setFlipped(!flipped)}
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
            flipped ? "rotate-y-180" : ""
          }`}
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front */}
          <div
            className="absolute w-full h-full bg-white rounded-xl shadow-md flex flex-col justify-center items-center p-6"
            style={{
              backfaceVisibility: "hidden",
            }}
          >
            <h2 className="text-2xl font-bold">{word}</h2>
          </div>

          {/* Back */}
          <div
            className="absolute w-full h-full bg-gray-100 rounded-xl shadow-md flex flex-col justify-center items-center p-6"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <p className="text-center text-lg font-medium">{meaning}</p>
            <p className="text-gray-600 text-sm mt-4 italic">"{example}"</p>
          </div>
        </div>
      </div>
    </div>
  );
}
