import { useEffect, useRef, useState } from "react";

declare const tmImage: any;

export default function SoloGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modelRef = useRef<any>(null);
  const [prediction, setPrediction] = useState("");

  useEffect(() => {
    const loadModel = async () => {
      //   const URL = "https://teachablemachine.withgoogle.com/models/fng4_Zos9J/"; // 3000개 3개
      const URL = "https://teachablemachine.withgoogle.com/models/nXk43f3FS/"; // 30개 300개 
      const model = await tmImage.load(
        `${URL}model.json`,
        `${URL}metadata.json`
      );
      modelRef.current = model;
    };

    loadModel();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let drawing = false;

    const startDrawing = (e: MouseEvent) => {
      drawing = true;
      ctx.beginPath();
      ctx.moveTo(e.offsetX, e.offsetY);
    };

    const draw = (e: MouseEvent) => {
      if (!drawing) return;
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.strokeStyle = "black";
      ctx.lineWidth = 10;
      ctx.lineCap = "round";
      ctx.stroke();
    };

    const stopDrawing = () => {
      drawing = false;
      ctx.closePath();
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseleave", stopDrawing);
    };
  }, []);

  const handlePredict = async () => {
    const canvas = canvasRef.current;
    const model = modelRef.current;
    if (!canvas || !model) return;

    const image = new Image();
    image.src = canvas.toDataURL();
    await new Promise((resolve) => (image.onload = resolve));

    const predictions = await model.predict(image);
    const best = predictions.reduce((a: any, b: any) =>
      a.probability > b.probability ? a : b
    );
    setPrediction(best.className);
  };

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        className="border mb-4 bg-white"
      />
      <button
        onClick={handlePredict}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        예측하기
      </button>
      {prediction && <p className="mt-4">예측 결과: {prediction}</p>}
    </div>
  );
}
