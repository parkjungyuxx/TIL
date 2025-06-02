import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";

export function useRealtimeDrawing() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    const channel = supabase
      .channel("realtime drawings")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "storage",
          table: "objects",
          filter: "bucket_id=eq.drawings", 
        },
        async (payload) => {
          console.log("실시간 이미지 업로드 감지됨:", payload);

          const filePath = payload.new.name;
          const { data } = supabase.storage.from("drawings").getPublicUrl(filePath);

          console.log("🧩 public URL:", data.publicUrl);

          setImageUrls((prev) => [...prev, data.publicUrl]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return imageUrls;
}
