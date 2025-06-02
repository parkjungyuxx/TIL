import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Line } from "react-konva";
import { supabase } from "../../utils/supabaseClient";

export default function Game() {
  const stageRef = useRef<any>(null);
  const [lines, setLines] = useState<any[]>([]);
  const isDrawing = useRef(false);
  const [images, setImages] = useState<string[]>([]);

  const handleMouseDown = (e: any) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing.current) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    const lastLine = lines[lines.length - 1];
    const newPoints = lastLine.points.concat([point.x, point.y]);
    const updatedLines = [
      ...lines.slice(0, -1),
      { ...lastLine, points: newPoints },
    ];
    setLines(updatedLines);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const exportToImage = async () => {
    const uri = stageRef.current.toDataURL({ pixelRatio: 2 });
    const file = dataURLtoFile(uri, `drawing-${Date.now()}.png`);

    const { data, error } = await supabase.storage
      .from("drawings")
      .upload(`drawing-${Date.now()}.png`, file, {
        contentType: "image/png",
      });

    if (error) {
      alert("업로드 실패: " + error.message);
      return;
    }

    const url = `${supabase.storageUrl}/object/public/drawings/${data.path}`;

    const { error: insertError } = await supabase
      .from("drawings")
      .insert({ image_url: url });

    if (insertError) {
      alert("DB 저장 실패: " + insertError.message);
    } else {
      alert("업로드 성공!");
    }
  };

  useEffect(() => {
    const fetchInitial = async () => {
      const { data, error } = await supabase
        .from("drawings")
        .select("image_url")
        .order("created_at", { ascending: false });
      if (data) {
        setImages(data.map((d) => d.image_url));
      }
    };

    fetchInitial();

    const channel = supabase
      .channel("realtime:drawings")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "drawings",
        },
        (payload) => {
          const newUrl = payload.new.image_url;
          setImages((prev) => [newUrl, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <Stage
        ref={stageRef}
        width={500}
        height={400}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        style={{ border: "1px solid #ccc" }}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#000"
              strokeWidth={3}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation="source-over"
            />
          ))}
        </Layer>
      </Stage>

      <button onClick={exportToImage}>이미지 업로드</button>

      <div>
        <h2>실시간 그림 목록</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {images.map((url, idx) => (
            <img key={idx} src={url} alt={`drawing-${idx}`} width={200} />
          ))}
        </div>
      </div>
    </div>
  );
}

function dataURLtoFile(dataUrl: string, filename: string) {
  const arr = dataUrl.split(",");
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new File([u8arr], filename, { type: mime });
}
